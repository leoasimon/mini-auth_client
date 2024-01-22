import axios from "axios";

const baseURL = "http://localhost:3000"

export const instance = axios.create({
    baseURL
})

export const loggedInInstance = axios.create({
    baseURL,
    headers: {
       auth_token: localStorage.getItem("auth_token") 
    }
})


export const  { post, get, delete: del, put } = instance;

export const loggedCall = () => {
    return axios.create({
        baseURL,
        headers: {
           auth_token: localStorage.getItem("auth_token") 
        }
    })  
}