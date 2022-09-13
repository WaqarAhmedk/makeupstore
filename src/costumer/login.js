import React, { useState } from 'react'
import axios from "axios";
import "./login.css";
import { Cookies, useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { EmojiExpressionless } from 'react-bootstrap-icons';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies,setCookies]=useCookies("coustmer");
    const navigate=useNavigate();
    const [msg,setMsg]=useState("");
    const [show,setShow]=useState(false);



    const openmodal=()=>{
        setShow(true);
    }
    const closemodal=()=>{
        setShow(false);
    }


    return (
        <>
            <div className='form'>

                <h2 className='mt-5 mb-5 '>LOGIN</h2>
                <form>
                    <div className="form-group form-div">
                        <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                    </div>
                    <div className="form-group form-div">

                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                    </div>

                    <div className="form-group form-div">
                        <button type="submit" className="btn btn-primary"  onClick={(e)=>{
                            e.preventDefault();
                            if(email =="" || password ==""){
                                setMsg("please fill all the fields before submitting");
                                openmodal();
                            } else{
                                e.preventDefault();
                                axios
                                  .post("/login",{
                                    email:email,
                                    password:password
                                  })
                                  .then((res)=>{
                                    if(res.data.success==true){
                                        setCookies("auth" ,res.data.data ,{path:'/',expires:0});
                                        navigate("/cart")
                                        
                                    } else if(res.data.success==false){
                                        setMsg(res.data.msg);
                                        openmodal();
                                    }
                                    console.log(res.data);
                                  } )
                                  .catch(err => console.error(err));
    
                            }

                           
                        }}>Submit</button>

                    </div>
                </form>

            </div>


<Modal show={show}>
    
    <ModalBody className='mt-3 mb-3'> 
        <EmojiExpressionless className='error-emoji me-3'/>

        {
            msg
        }
    </ModalBody>
    <ModalFooter>
        <span className='btn btn-primary' onClick={()=>{
            closemodal();
        }}>OK</span>
    </ModalFooter>
</Modal>

        </>
    )
}
