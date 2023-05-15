import axios from "axios";
import axiosClient from "./axiosClient";

const userApi = {

    authenticate: (body)=>{
        const url = '/Users/authenticate';
        return axiosClient.post(url,body)
    },
    register(data){
        const url = '/Users/register';
        return axiosClient.post(url,data)
    },
    getAll: (params)=>{
        const url = '/Users';
        return axiosClient.get(url,params)
    }

}
export default userApi;