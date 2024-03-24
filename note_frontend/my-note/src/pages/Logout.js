import React, { useEffect } from "react";
import authStore from "../stores/authStore";
//import { useNavigate } from "react-router-dom";
export default function Logout()
{
    const store = authStore()
    //const navigate = useNavigate()
    useEffect(async ()=>
    {
       await store.LogOut();
        //navigate("/login")
    },[])
    return (
        <div>Logging out</div>
    )
}