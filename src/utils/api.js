import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1'
})

const token = localStorage.getItem("token")

if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
}

export default api