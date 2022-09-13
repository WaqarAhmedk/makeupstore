import "../pages/css/mainnavbar.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Cart, Person, Search } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from "react";
import axios from "axios";


export default function Mainnavbar() {
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookie] = useCookies("");
    const [topcategories, setTopCategories] = useState([]);
    const [categories, setCategories] = useState([]);




    const getAlltopcategories = () => {
        axios
            .get("/get-top-categories")
            .then((res) => {
                console.log(res.data);
                setTopCategories(res.data)
            })
            .catch(err => console.error(err));

    }
    const getAllcategories = () => {
        axios
            .get("/get-all-categories")
            .then((res) => {

                setCategories(res.data);
            })
            .catch(err => console.error(err));
    }
    useEffect(() => {
        getAlltopcategories();
        getAllcategories();
    }, [])
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>

                <img src={require("../images/lushlogo.png")} className="nav-logo" />

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 main-nav"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <div className='main-nav-dropdown'>
                            <Nav.Link className='nav-items-link ' onClick={() => {
                                navigate("/")
                            }}>Home</Nav.Link>
                            <div className='main-nav-dropdown-content'>
                                <span>Top Categories</span>

                                <div className='d-flex'>

                                    {
                                        topcategories.map((item, index) => {
                                            return <div className='main-nav-dropdown-div' key={index}>
                                                <img src={require("../../images/" + item.img)} className="main-nav-img" />
                                                <span>{item.name}</span>
                                            </div>


                                        })
                                    }
                                </div>




                            </div>
                        </div>


                        <div className='main-nav-dropdown'>
                            <Nav.Link className='nav-items-link ' onClick={() => {
                                navigate("/")
                            }}>Categories</Nav.Link>
                            <div className='main-nav-dropdown-content'>
                                <span>All Categories</span>

                                <div className='d-flex'>

                                    {

                                        <ul className='navbar-product-list'>

                                            {
                                                categories.slice(0, 7).map((item, index) => {
                                                    return <li key={index} onClick={() => {
                                                        navigate("/category-products", { state: { catid: item._id, catname: item.name } });


                                                    }}>{item.name}</li>
                                                })
                                            }


                                        </ul>
                                    }

                                </div>

                            </div>
                        </div>


                        <Nav.Link href="#action1" className='nav-items-link' >Headers</Nav.Link>

                        <Nav.Link href="#action1" className='nav-items-link'>Blog</Nav.Link>

                        <Nav.Link href="#action1" className='nav-items-link'>Pages</Nav.Link>

                        <Nav.Link href="#action2" className='nav-items-link'>About us</Nav.Link>


                    </Nav>




                    {
                        cookies.auth ? <div className="d-flex">
                            <Cart className='ms-5 nav-icon cart-icon mt-3 me-5' onClick={() => {

                                navigate("/cart");

                            }
                            } />
                            <div className='profile-dropdown'>
                                <img className="profile-pic" src={require("../images/bronzer.jpg")} />
                                <div className='profile-dropdown-content'>
                                    <span onClick={() => {
                                        removeCookie("auth");
                                      

                                    }} >Logout</span>

                                </div>
                            </div>

                        </div> : <div className='d-flex me-5'>
                            <Search className='ms-5 nav-icon' />
                            <Person className='ms-5 nav-icon' onClick={() => {
                                navigate("/autnticate");
                            }} />

                        </div>
                    }

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
