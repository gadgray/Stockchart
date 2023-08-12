import axios from "axios"; 

const TOKEN = "ch15inhr01qhadkonli0ch15inhr01qhadkonlig"
export default axios.create({
    baseURL: 'https://finnhub.io/api/v1',
    params:{
        token: TOKEN
    }
})