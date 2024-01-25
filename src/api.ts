import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_URL

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