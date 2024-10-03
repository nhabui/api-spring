import React, { useEffect, useState } from 'react'
import { DoneVuln, deleteVuln, getAllVulns, inProcessVuln } from '../services/VulnService'
import { useNavigate } from 'react-router-dom'
import { isAdminUser } from '../services/AuthService'

const ListVulnComponent = () => {

    const [vulns, setVulns] = useState([])

    const navigate = useNavigate()

    const isAdmin = isAdminUser();

    useEffect(() => {
        listVulns();
    }, [])

    function listVulns() {
        getAllVulns().then((response) => {
            setVulns(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewVuln() {
        navigate('/add-vuln')

    }

    function updateVuln(id) {
        console.log(id)
        navigate(`/update-vuln/${id}`)
    }

    function removeVuln(id) {
        deleteVuln(id).then((response) => {
            listVulns();
        }).catch(error => {
            console.error(error)
        })
    }

    function markCompleteVuln(id) {
        DoneVuln(id).then((response) => {
            listVulns()
        }).catch(error => {
            console.error(error)
        })
    }

    function markInCompleteVuln(id) {
        inProcessVuln(id).then((response) => {
            listVulns();
        }).catch(error => {
            console.error(error)
        })
    }

    return (
        <div className='container'>
            <h2 className='text-center'>Patching Management</h2>
            {
                isAdmin &&
                <button className='btn btn-primary mb-2' onClick={addNewVuln}>Add Vulnerability Data</button>
            }

            <div>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Vulnerability Title</th>
                            <th>Vulnerability Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vulns.map(vuln =>
                                <tr key={vuln.id}>
                                    <td>{vuln.title}</td>
                                    <td>{vuln.description}</td>
                                    <td>{vuln.completed ? 'Done' : 'In Process'}</td>
                                    <td>
                                        {
                                            isAdmin &&
                                            <button className='btn btn-info' onClick={() => updateVuln(vuln.id)}>Update Vuln</button>
                                        }
                                        {
                                            isAdmin &&
                                            <button className='btn btn-danger' onClick={() => removeVuln(vuln.id)} style={{ marginLeft: "10px" }} >Delete</button>
                                        }
                                        <button className='btn btn-success' onClick={() => markCompleteVuln(vuln.id)} style={{ marginLeft: "10px" }} >Done</button>
                                        <button className='btn btn-info' onClick={() => markInCompleteVuln(vuln.id)} style={{ marginLeft: "10px" }} >In Process</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListVulnComponent