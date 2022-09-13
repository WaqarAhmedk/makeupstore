import React, { useState, useEffect } from 'react'
import Footer from '../components/footer';
import Mainnavbar from '../components/mainnavbar';
import { categories } from '../models';
import "./product.css";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Modal ,ModalBody,ModalHeader ,ModalFooter} from 'react-bootstrap';


export default function Allproducts() {
    const data = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cookies, setCookies] = useCookies("");
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("");


    const openmodal = () => {
        setShow(true);
    }
    const closemodal = () => {
        setShow(false);
    }

    const getAllProducts = () => {
        axios
            .get("/get-all-products")
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {


        getAllProducts();



    }, [])





    return (
        <>
            <Mainnavbar />


            <div className='page-header'>
                <h1>ALL PRODUCTS</h1>
            </div>



            <div className='d-flex'>
                <div className='products-page-category-div'>
                    <h2>CATEGORIES</h2>
                    <ul className='products-page-category-list'>


                        {
                            categories.map((item, index) => {
                                return <li key={index}>{item.title}</li>
                            })
                        }


                    </ul>


                </div>
                <div className='products-page-products-div'>{

                    products.length <= 0 ? <div className='no-data'>Nothing to show </div> :
                        products.map((item, index) => {
                            return <div className='d-flex productspage-product-item' key={index}>
                                <div className="card productspage-product-card-div " >
                                    <img className="card-img-top card-img" src={require("../../images/" + item.img)} alt="Card image cap" />
                                    <div className="card-body  productspage-product-card-body">
                                        <h3>{item.name}</h3>
                                        <p className='d-block'>{item.desc}</p>
                                        <span className='d-block'>Price :{item.price}$</span>
                                        <span className='btn productspage-product-react-btn' onClick={() => {

                                            if (cookies.auth) {
                                                console.log(cookies.auth);
                                                axios
                                                    .get("/add-to-cart/" + item._id, {
                                                        headers: {
                                                            "auth-token": cookies.auth
                                                        }
                                                    })
                                                    .then((res) => {
                                                        console.log("here");
                                                        console.log(res.data);
                                                        if (res.data.success == true) {
                                                            openmodal();
                                                            setMsg(res.data.msg);

                                                        } else if (res.data.success == false) {
                                                            openmodal();
                                                            setMsg(res.data.msg);
                                                        }
                                                    })
                                                    .catch(err => console.error(err));


                                            } else {
                                                navigate("/autnticate", { state: { msg: "Login Required" } })
                                            }

                                        }}>Add to Cart</span>
                                    </div>

                                </div>
                            </div>
                        })
                }

                    <Modal show={show} >

                        <ModalHeader className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{msg}</h5>
                        </ModalHeader>

                        <ModalFooter>
                            <button className="btn btn-success" data-dismiss="modal" onClick={closemodal}>Ok</button>


                        </ModalFooter>
                    </Modal>
                </div>
            </div>
            {/* footer */}

            <Footer />

        </>
    )
}
