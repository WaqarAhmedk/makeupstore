import React, { useState, useEffect } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { BoxSeam, Chat, Cash, } from 'react-bootstrap-icons';
import "./css/slider.css"
import "./css/homepage.css"
import { newproductsslider, categories } from '../models';
import Footer from '../components/footer';
import Smallnavbar from '../components/smallnavbar';
import Mainnavbar from '../components/mainnavbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'react-bootstrap';




export default function Homepage() {
    const [categorydata, setCategorydata] = useState([]);
    const [topproducts1, setTopproducts1] = useState([
        {
            img: "bronzer.jpg",
            name: "title",
            desc: "its the description for the prodct a very niceproduct",
            price: "34"

        },
        {
            img: "bronzer.jpg",
            name: "title",
            desc: "its the description for the prodct a very niceproduct",
            price: "34"

        },
        {
            img: "bronzer.jpg",
            name: "title",
            desc: "its the description for the prodct a very niceproduct",
            price: "34"

        },
    ]);

    const [topproducts, setTopproducts] = useState([]);
    const [slider1, setslider1] = useState([]);
    const [cookies, setCookies] = useCookies("");
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();


    const openmodal = () => {
        setShow(true);
    }
    const closemodal = () => {
        setShow(false);
    }



    const getAllcategories = () => {
        axios
            .get("/get-all-categories")
            .then((res) => {

                setCategorydata(res.data);
            })
            .catch(err => console.error(err));
    }


    const getAllProducts = () => {


        axios
            .get("/get-all-topproducts")
            .then((res) => {
                setTopproducts(res.data);
            })
            .catch(err => console.error(err));
    }




    useEffect(() => {
        getAllcategories();
        getAllProducts();
    }, [])

    return (
        <div>
            {/* small nav bar */}
            <Smallnavbar />

            {/* Main Nav bar */}
            <Mainnavbar />

            {/* Slider  main */}

            <Carousel>
                {
                    newproductsslider.map((item, index) => {

                        return <CarouselItem key={index}>
                            <img src={require("../images/" + item.img)} className="slider-img" />
                            <div className='slider-details'>
                                <h3 className='slider-details-title'>{item.title}</h3>
                                <p className='slider-details-desc'>{item.desc}</p>
                                <span className='btn btn-primary'>Explore more</span>
                            </div>
                        </CarouselItem>
                    })

                }


            </Carousel>
            {/* Services div css in  */}
            <div className='services-div d-flex'>
                <div className='services-div-inner'>
                    <BoxSeam className='services-icon' />
                    <span>FREE SHIPPING</span>
                </div>
                <div className='services-div-inner'>
                    <Chat className='services-icon' />
                    <span>24/7 SUPPORT</span>
                </div>
                <div className='services-div-inner'>
                    <Cash className='services-icon' />
                    <span>CASH ON DELEIVERY</span>
                </div>
            </div>


            {/* Categories */}

            <div className='d-flex flex-wrap ms-5 me-5 homepage-categories-main-div'>

                {
                    categorydata.map((item, index) => {
                        return <div className='ms-3 me-2 homepage-categories-content-div' key={index} onClick={() => {
                            navigate("/category-products", { state: { catid: item._id, catname: item.name } })
                        }}>
                            <img src={require("../../images/" + item.img)} className="homepage-categories-img" />
                            <h3 className='homepage-categories-title'>{item.name}</h3>
                        </div>
                    })
                }





            </div>



            {/* new papoular  */}



            <div className='homepage-products'>

                <h1>TOP PRODUCTS</h1>
                <Carousel>
                    <CarouselItem >

                        <div className='d-flex homepage-product-slider-item'>

                            {topproducts.length >= 3 ? topproducts.map((item, index) => {
                                return <div className="card homepage-product-card-div" >
                                    <img className="card-img-top top-p-img" src={require("../../images/" + item.img)} alt="Card image cap" />
                                    <div className="card-body  homepage-product-card-body">
                                        <h3>{item.name}</h3>
                                        <p>{item.desc}</p>
                                        <span>{item.price}$</span>
                                    </div>
                                    <div className='mainpage-product-addcart-hide'>

                                        <span className='btn mainpage-product-react-btn' onClick={() => {

                                            if (cookies.auth) {
                                             console.log(item._id);
                                                axios
                                                    .get("/add-to-cart/"+ item.productid, {
                                                        headers: {
                                                            "auth-token": cookies.auth
                                                        }
                                                    })
                                                    .then((res) => {
                                                      
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
                            }) : topproducts1.map((item, index) => {
                                return <div className="card homepage-product-card-div" >
                                    <img className="card-img-top" src={require("../images/bg.webp")} alt="Card image cap" />
                                    <div className="card-body  homepage-product-card-body">
                                        <h3>product title</h3>
                                        <p>its the description for the prodct a very niceproduct</p>
                                        <span>Price 40$</span>
                                    </div>
                                    <div className='mainpage-product-addcart-hide'>

                                        <span className='btn mainpage-product-react-btn'>Add to Cart</span>

                                    </div>
                                </div>
                            })
                            }

                        </div>


                    </CarouselItem>

                   

                </Carousel>

            </div>

            <span className='btn  homepage-viewall' onClick={() => {
                navigate('/all-products');
            }}>ALL PRODUCTS</span>


            {/* Footer */}

            <Footer />

            <Modal show={show} >

                <ModalHeader className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">{msg}</h5>
                </ModalHeader>

                <ModalFooter>
                    <button className="btn btn-success" data-dismiss="modal" onClick={closemodal}>Ok</button>


                </ModalFooter>
            </Modal>



        </div >);

}
