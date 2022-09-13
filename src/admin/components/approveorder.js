import React from 'react';
import "../approveuser.css";
import { Trash, PencilSquare } from 'react-bootstrap-icons';
import { useCookies } from 'react-cookie';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
import { Modal, ModalBody, ModalFooter } from 'react-bootstrap';

export default function ApprovedOrders() {
    const [cookies, setCookies] = useCookies();
    const [orders, setOrders] = useState([]);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({
        name: "r",
        email: "sss",
        img: "1659280969823foundation.webp"
    });
    const [daa, setDaa] = useState([]);
    let arr = [];

    const openproductdialog = () => {
        setShow(true);
    }
    const closeproductdialog = () => {
        setShow(false)
    }







    const getAllApprovedorders = () => {
        axios
            .get("/get-all-approved-orders", {
                headers: {
                    "admin-auth-token": cookies.adminAuth
                }
            })
            .then((res) => {

                setOrders(res.data);
            })
            .catch(err => console.error(err));
    }
    useEffect(() => {
        getAllApprovedorders();
    }, []);


    return (
        <div>
            <h1>Approved Orders</h1>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th className='align-middle'>Coutmer Name</th>
                        <th className='align-middle'>Contact</th>
                        <th className='align-middle'>Address</th>
                        <th className='align-middle'>Order Details</th>
                        <th className='align-middle'>Costumer</th>
                        <th className='align-middle'>Grand Total</th>
                        <th className='align-middle'>Status</th>

                    </tr>
                </thead>
                <tbody>

                    {
                        orders.map((item, index) => {
                            return <tr key={index}>
                                <td className='align-middle'>
                                    {item.name}
                                </td>
                                <td className='align-middle'>{item.contact}</td>
                                <td className='align-middle'>{item.address}</td>
                                <td className='align-middle'>

                                    <span className='btn btn-info btn-sm d-block' onClick={() => {


                                    }}>{item.products.length}</span>



                                </td>
                                <td className='align-middle'>

                                    <span className='btn btn-info btn-sm d-block' onClick={() => {
                                        axios
                                            .get("/getcoustmer/" + item.userid, {
                                                headers: {
                                                    "admin-auth-token": cookies.adminAuth
                                                }
                                            })
                                            .then((res) => {
                                                setUser(res.data);
                                                openproductdialog();
                                            })
                                            .catch(err => console.error(err));
                                    }}>see details</span>
                                </td>
                                <td className='align-middle ps-5'>{item.grandtotal}</td>
                                <td>Approved</td>

                            </tr>
                        })
                    }





                </tbody>
            </table>

            <Modal show={show}>
                <ModalBody>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th className='align-middle'>Image</th>
                                <th className='align-middle'>Name</th>
                                <th className='align-middle'>Email</th>


                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>
                                    <img className='approve-user-img' src={require("../../constimages/download.png")} />
                                </td>
                                <td>
                                    {user.name}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </ModalBody>
                <ModalFooter>
                    <span className="btn btn-success" onClick={() => {
                        closeproductdialog();
                    }}>close</span>
                </ModalFooter>
            </Modal>

        </div>
    )
}
