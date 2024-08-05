// since this is a small project so we are going to keep all apis in this same file 
import { apiUrl } from '@/utils/helper';
import axios from 'axios' ;

const setAuth = () => ({Authorization: localStorage.getItem("jwt")?.toString()})
export const register = async(details:{password:string, username:string, email:string})=>{
  const {data}  = await axios.post(apiUrl+"auth/local/register", details) ;
  
  localStorage.setItem("jwt", data.jwt);
  localStorage.setItem("username", data.user.username);
  localStorage.setItem("userId", data.user.id);
  return data ;

};
export const login = async(details:{password:string, identifier:string})=>{
  const {data}  = await axios.post(apiUrl+"auth/local", details) ;
  localStorage.setItem("jwt", data.jwt);
  localStorage.setItem("username", data.user.username);
  localStorage.setItem("userId", data.user.id);
  return data ;
};

export const createRoom = async(details:{name:string})=>{
  const {data} = await axios.post(apiUrl+"rooms", details, {
    headers:{
      ...setAuth(),
      "Content-Type": "application/json",
    }
  })

  console.log(data);
  return data ;
}