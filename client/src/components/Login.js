import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Logo from '../assets/Logo.svg'
import hidePassword from '../assets/hide-password.svg'
import '../css/Login.css'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [emptyEmailPara, setEmptyEmailPara] = useState('loginpara')
  const [emptyEmailBox, setEmptyEmailBox] = useState('logininputBox')
  const [emptyEmailLabel, setEmptyEmailLabel] = useState('loginlabel')
  const [emptyPassPara, setEmptyPassPara] = useState('loginpara')
  const [emptyPassBox, setEmptyPassBox] = useState('logininputBox')
  const [emptyPassLabel, setEmptyPassLabel] = useState('loginlabel')
  const [invalid, setInvalid] = useState('loginpara')
  const [visibility, setVisibility] = useState('password')


  // Sending Data to Server
  const submit = async (e) => {
    e.preventDefault()
    if(email === '' && password ===''){
      setEmptyEmailPara('loginalertText')
      setEmptyEmailBox('loginalertBox')
      setEmptyEmailLabel('loginalert')
      setEmptyPassPara('loginalertText')
      setEmptyPassBox('loginalertBox')
      setEmptyPassLabel('loginalert')
    }else if(email === ''){
      setEmptyEmailPara('loginalertText')
      setEmptyEmailBox('loginalertBox')
      setEmptyEmailLabel('loginalert')
    }else if(password === ''){
      setEmptyPassPara('loginalertText')
      setEmptyPassBox('loginalertBox')
      setEmptyPassLabel('loginalert')
    }else{
    try{
      await axios.post("http://localhost:8000/login", {email, password},{withCredentials : true})
        .then((result) => {
          if(result.data.status === "Success"){
            navigate("/dashboard")
          }else{
            setInvalid('loginalertInvalid')
          }
        })
    }catch(error){
      console.log(error)
    }}
  }

  //Password Visibility
  const makeVisible = () => {
    if(visibility === 'password'){
      setVisibility('text')
    }else{
      setVisibility('password')
    }
  }

  // Return Statement
  return (
    <div className='loginBody'>
    <div className="logincontainer">
        <img className="logincontainerlogo" src={Logo} alt="logo"/>
        <p className="logintitle">Online Project Management</p>
        <form action='POST' className="loginformContainer">
            <p className="loginformHeading">Login to get started</p>
            <div className="loginformInput">
                <label className={emptyEmailLabel}>Email</label>
                <input type="email" className={emptyEmailBox} name="email" onChange={(e) => {
                                                                                      setEmail(e.target.value)
                                                                                      setEmptyEmailBox('logininputBox')
                                                                                      setEmptyEmailLabel('loginlabel')
                                                                                      setEmptyEmailPara('loginpara')
                                                                                      setInvalid('loginpara')
                                                                                      }} required/>
                <p className={emptyEmailPara}>Email is required</p>
            </div>
            <div className="loginformInput">
                <label className={emptyPassLabel}>Password</label>
                <input type={visibility} className={emptyPassBox} name="password" onChange={(e) => {
                                                                                      setPassword(e.target.value)
                                                                                      setEmptyPassBox('logininputBox')
                                                                                      setEmptyPassLabel('loginlabel')
                                                                                      setEmptyPassPara('loginpara')
                                                                                      setInvalid('loginpara')
                                                                                      }} required/>
                <img className="loginhideIcon" alt="hide" src={hidePassword} onClick={makeVisible}/>
                <p className={emptyPassPara}>Password is required</p>
            </div>
            <p className="loginforgetPass">Forgot password?</p>
            <input type="submit" value="Login" className="loginButton" onClick={submit} />
        </form>
        <p className={invalid}>Invalid credentials</p>
    </div>
  </div>
  );
}

export default Login;
