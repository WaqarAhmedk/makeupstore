import axios from 'axios';
import React, { useState } from 'react'
import Footer from './components/footer'
import Mainnavbar from './components/mainnavbar';
import "./login.css";
import { useNavigate } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import { Windows } from 'react-bootstrap-icons';



export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phno, setPhno] = useState("");
    const navigate = useNavigate();
    const [show ,setShow]=useState(false);


    const handleOpen=()=>{
        setShow(true);
    }
    const handleClose=()=>{
        setShow(false);
    }



    return (
        <>
            <div className='form'>

                <h2 className='mt-5 mb-5 '>Signup</h2>
                <form>
                    <div className="form-group form-div">
                        <input type="email" className="form-control" placeholder="Enter Name" value={name} onChange={(e) => {
                            setName(e.target.value);
                        }} />
                    </div>
                    <div className="form-group form-div">
                        <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                    </div>
                    <div className="form-group form-div">
                        <input type="Number" className="form-control" placeholder="Enter Phone Number" value={phno} onChange={(e) => {
                            setPhno(e.target.value);
                        }} />
                    </div>
                    <div className="form-group form-div">

                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    </div>

                    <div className="form-group form-div">
                        <button type="submit" className="btn btn-primary" onClick={(e) => {
                            e.preventDefault();
                            axios
                                .post("/signup", {
                                    name: name,
                                    email: email,
                                    phno: phno,
                                    password: password,
                                })
                                .then((res) => {
                                    if (res.data.success === true) {
                                    handleOpen();
                                    }
                                    console.log(res.data);
                                })
                                .catch(err => console.error(err));
                        }}>Submit</button>

                    </div>
                </form>

                <Modal show={show} >
                    <ModalHeader closeButton onClick={handleClose}>
                        Success
                    </ModalHeader>
                    <ModalBody>
                        <p>Account Created Succesfully</p>
                        <button className='btn btn-primary' onClick={()=>{
                        window.location.reload()
                        }}>Login</button>

                        
                    </ModalBody>
                    
                </Modal>
            </div>




        </>
    )
}
