import axios from "axios";

const apiProjeto = axios.create({
    baseURL : 'http://localhost:3333/',
})

export default apiProjeto