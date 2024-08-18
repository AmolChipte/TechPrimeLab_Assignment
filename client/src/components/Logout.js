import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


function Logout(){

    const navigate = useNavigate()
    const LoadData = async () => {
        try{
            await axios.get("http://localhost:8000/logout")
              .then((result) => {
                if(result.data === "Success"){
                    navigate("/login")
                }
              })
        }catch(error){
            console.log(error)
    }}
    LoadData()

    return(
        <div>
            <h1>Logout Successfully</h1>
        </div>
    )
}

export default Logout