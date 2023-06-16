import axios from "axios";

const apiProjeto = axios.create({
    baseURL : 'http://127.0.0.1:3333/',
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTY1MjcyNjExOX0.nvSG1FtwV7A0wjj16fgBnWWkgY45m32uK6dKzgvD8Ik',
        
    }
})



export default apiProjeto