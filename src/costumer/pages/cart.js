import React, { useEffect, useState } from 'react'
import { Cookies, useCookies } from 'react-cookie';
import Footer from '../components/footer';
import Mainnavbar from '../components/mainnavbar';
import "./cart.css"
import axios from 'axios';
import { Trash } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
const { Modal, ModalHeader, ModalFooter, ModalBody } = require("react-bootstrap");



export default function Cart() {
    const [cookies, setCookies] = useCookies();
    const [data, setData] = useState([]);
    const [grandtotal, setGrandtotal] = useState(0);
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("");
    const [ferrors, setFerrors] = useState({});

    const navigate = useNavigate();


    const openmodal = () => {
        setShow(true);
    }
    const closemodal = () => {
        setShow(false);
    }



    const getALlcartItems = () => {
        axios
            .get("/get-cart-items", {
                headers: {

                    "auth-token": cookies.auth

                }
            })
            .then((res) => {
                console.log(res.data);
                setData(res.data.cartitems);
                setGrandtotal(res.data.grandtotal);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => { getALlcartItems() }, [])

    return (
        <>
            <Mainnavbar />
            <div className='page-header'>
                <h1>YOUR CART</h1>
            </div>
            <div className='cart-main-div'>
                <div className='cart-div-1'>
                    <div className='d-flex justify-content-between'>
                        <span>PRODUCT</span>
                        <div className='d-flex justify-content-between'>
                            <span className='me-1'>Quantity</span>
                            <span className='ms-5'>SubTotal</span>
                            <span className='ms-3'>Action</span>

                        </div>
                    </div>
                    {
                        data.map((item, index) => {
                            return <div key={index} className='d-flex justify-content-between cart-details'>
                                <div>
                                    <div className='d-flex'>
                                        <img src={require("../../images/" + item.img)} className="itemin-cart-img" />
                                        <div className='cart-name-price-div'>
                                            <h4>{item.name}</h4>
                                            <span>{item.price}$</span>
                                        </div>
                                    </div>

                                </div>
                                <div className='d-flex justify-content-between item-count'>
                                    <span className='me-4'>{item.quantity}Items</span>
                                    <span className='ms-5'>{item.totalprice} $</span>
                                    <Trash className='ms-5 cart-action-icon' />

                                </div>
                            </div>
                        })
                    }
                </div>
                <div className='cart-div-2'>
                    <div className='d-flex justify-content-between total-price'>
                        <span>GRAND TOTAL</span>
                        <span>{grandtotal} $</span>
                    </div>
                    <div className='costumer-details'>
                        <h2>Shipping</h2>
                        <form>
                            <input type="text" placeholder='Your FULL NAME' value={name} onChange={(e) => {
                                setName(e.target.value);
                            }} className='input-field' />
                            <input type="number" placeholder='Your CONATCT NO' value={contact} onChange={(e) => {
                                setContact(e.target.value);
                            }} className='input-field' />
                            <textarea placeholder='your full postal address' cols={23} value={address} onChange={(e) => {
                                setAddress(e.target.value);
                            }} className='input-field'></textarea>

                        </form>
                    </div>
                    <div className='checkout-div' >

                        <button className='btn btn-dark d-block' onClick={(e) => {
                            e.preventDefault();
                            if (name=="" || contact =="" ||address=="")  {
                                setMsg("PLease fil all the fields");
                                openmodal();
                                
                            }

                            axios
                                .post("/create-pending", {
                                    name: name,
                                    contact: contact,
                                    address: address,
                                    grandtotal: grandtotal,
                                }, {
                                    headers: {
                                        "auth-token": cookies.auth
                                    }
                                })
                                .then((res) => {
                                    if (res.data.success == true) {
                                        setMsg(res.data.msg);
                                        openmodal();
                                        getALlcartItems();
                                        setAddress("");
                                        setName("");
                                        setContact("");

                                    }
                                    else if (res.data.success == false) {

                                        setMsg(res.data.msg);
                                        openmodal();
                                        getALlcartItems();
                                        setAddress("");
                                        setName("");
                                        setContact("");
                                    }
                                    else{
                                        console.log(res.data);
                                    }


                                })
                                .catch(err => console.error(err));
                        }}>CHECKOUT</button>
                    </div>
                </div>
            </div>
            <Modal show={show} >

                <ModalHeader className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">{msg}</h5>
                </ModalHeader>

                <ModalFooter>
                    <button className="btn btn-success" data-dismiss="modal" onClick={closemodal}>Ok</button>


                </ModalFooter>
            </Modal>
            <Footer />
        </>
    )
}
