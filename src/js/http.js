import axios from 'axios'

let baseURL = '/backend/api'

const http = axios.create({ baseURL })

export default http
