import React, { useEffect } from 'react'
import { useState } from 'react'
import { getVuln, saveVuln, updateVuln } from '../services/VulnService'
import { useNavigate, useParams } from 'react-router-dom'

const VulnComponent = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()

    function saveOrUpdatevuln(e) {
        e.preventDefault()

        const vuln = { title, description, completed }
        console.log(vuln);

        if (id) {

            updateVuln(id, vuln).then((response) => {
                navigate('/vulns')
            }).catch(error => {
                console.error(error);
            })

        } else {
            saveVuln(vuln).then((response) => {
                console.log(response.data)
                navigate('/vulns')
            }).catch(error => {
                console.error(error);
            })
        }
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Vulnerability</h2>
        } else {
            return <h2 className='text-center'>Add Vulnerability</h2>
        }
    }

    useEffect(() => {

        if (id) {
            getVuln(id).then((response) => {
                console.log(response.data)
                setTitle(response.data.title)
                setDescription(response.data.description)
                setCompleted(response.data.completed)
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Vulnerability Title:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter Vuln Title'
                                    name='title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Vulnerability Description:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter vuln Description'
                                    name='description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Status</label>
                                <select
                                    className='form-control'
                                    value={completed}
                                    onChange={(e) => setCompleted(e.target.value)}
                                >
                                    <option value="false">In Process</option>
                                    <option value="true">Done</option>

                                </select>
                            </div>

                            <button className='btn btn-success' onClick={(e) => saveOrUpdatevuln(e)}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VulnComponent