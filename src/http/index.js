import axios from 'axios'

const http = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    headers: {
        'Accept': 'application/json',
        'Content': 'application/json'
    }
})

http.interceptors.request.use(function(config) {
    const access_token = localStorage.getItem('access_token')
    if(access_token) {
        config.headers.Authorization = `Bearer ${access_token}`
    }
    return config
}, function(error) {
    return Promise.reject(error)
})

export default http