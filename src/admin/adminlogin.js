import React, { useState } from 'react'
import axios from "axios";
import { Cookies, useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookies] = useCookies("admin");
    const navigate = useNavigate();


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
                    <div className="form-group form-div d-flex justify-content-between">
                        <span>Lost Your password ?</span>
                        <span>Signup</span>
                    </div>
                    <div className="form-group form-div">
                        <button type="submit" className="btn btn-primary" onClick={(e) => {
                            e.preventDefault();
                            axios
                                .post("/admin/login", {
                                    email: email,
                                    password: password
                                })
                                .then((res) => {
                                    if (res.data.success === true) {
                                        setCookies("adminAuth", res.data.data, { path: '/' });
                                        if (cookies) {
                                            navigate("/admin")
                                        }


                                    }
                                   
                                })
                                .catch(err => console.error(err));

                        }}>Submit</button>

                    </div>
                </form>

            </div>




        </>
    )
}
