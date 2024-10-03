import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = 'http://localhost:8080/api/patching';

// export function getAllTodos(){
//     return axios.get(BASE_REST_API_URL);
// }

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  
export const getAllVulns = () => axios.get(BASE_REST_API_URL)

export const saveVuln = (vuln) => axios.post(BASE_REST_API_URL, vuln)

export const getVuln = (id) => axios.get(BASE_REST_API_URL + '/' + id)

export const updateVuln = (id, vuln) => axios.put(BASE_REST_API_URL + '/' + id, vuln)

export const deleteVuln = (id) => axios.delete(BASE_REST_API_URL + '/' + id)

export const DoneVuln = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/done')

export const inProcessVuln = (id) => axios.patch(BASE_REST_API_URL + '/' + id + '/in-process')