import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Footer from './components/footer'
import Mainnavbar from './components/mainnavbar';
import Login from './login';
import "./login.css"
import Signup from './signup';


export default function AuthCoustmer() {
    const [component, setComponent] = useState(<Login />);
    const [checklogin, setChecklogin] = useState(true);
  
    const data = useLocation();
    let msg;
   
    if (data.state !=null) {
       msg=  data.state.msg;

    } 
    return (
        <>
            <Mainnavbar />

            <div className='page-header mb-3'>
                <h1>ACCOUNT</h1>
            </div>



            {
                data.state != null ? <><span className='auth-msg alert alert-danger '>{msg}</span>{component}</> : component


            }
            <div className='d-flex justify-content-between form-help'>
                <span>Lost Your password ?</span>
                <span onClick={() => {
                    checklogin ? <>{setChecklogin(false)}{setComponent(<Signup />)}</> : <>{setChecklogin(true)}{setComponent(<Login />)}</>;
                }}>{checklogin ? "Register" : "Login"} {">"}</span>
            </div>
            <Footer />


        </>
    )
}
