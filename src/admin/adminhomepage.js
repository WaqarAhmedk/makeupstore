import React, { useEffect, useState } from 'react';
import "./sidebar.css";
import { Grid3x3GapFill, X } from 'react-bootstrap-icons';
import Storedeatils from './components/storedetails';
import ProductsCategories from './components/Productscategories';
import ProductsDeatails from './components/productdetails';
import Userdetails from './components/userdetails';
import Pendingusers from './components/pendinguserrequests';
import { useCookies } from 'react-cookie';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import PendingOrders from './components/pendingorders';
import ApprovedOrders from './components/approveorder';
export default function Adminhomepage() {

    const navigate = useNavigate();

    const [sidebar, setSidebar] = useState("sidebar-close");
    const [sidebaropen, setSidebaropen] = useState("sidebar-close-content-div");
    const [sidebarstate, setSidebarstate] = useState(false);
    const [cookies, setCookies] = useCookies();
    const [admin, setadmin] = useState({});
    const [loadpage, setLoadpage] = useState(<Storedeatils />);
    const HandleSidebar = () => {
        if (sidebarstate) {
            setSidebar("sidebar-close");
            setSidebaropen("sidebar-close-content-div");
            setSidebarstate(false);


        } else {
            setSidebar("sidebaropen");
            setSidebaropen("sidebar-open-content-div");
            setSidebarstate(true);

        }

    }



    const getAdmin = () => {

        axios
            .get("/getadmin", {
                headers: {
                    "admin-auth-token": cookies.adminAuth

                }
            })
            .then((res) => {
                setadmin(res.data);

            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        if (cookies.adminAuth) {

        } else {
            navigate('/admin/login')
        }
        getAdmin();
    }, [])


    return (

        <>
            {/* Sidebar  */}


            <div className='d-flex'>
                <div id="mySidenav" className={sidebar}>
                    <div className='header'>
                        <img src={require("../constimages/download.png")} />
                        <div>
                            <span>{admin.name}</span>
                            <p>{admin.email}</p>
                        </div>
                    </div>


                    <div className='sidebar-options'>

                        <li className='sidebar-li' onClick={() => {
                            setLoadpage(<Storedeatils />);
                        }}>Store</li>
                        <li className='sidebar-li' onClick={() => {
                            setLoadpage(<ProductsCategories />)
                        }}>Categories</li>
                        <li className='sidebar-li' onClick={() => {
                            setLoadpage(<ProductsDeatails />)
                        }}>Products</li>
                        <li className='sidebar-li' onClick={() => {
                            setLoadpage(<Userdetails />)
                        }}>USERS</li>
                        <li className='sidebar-li' onClick={() => {
                            setLoadpage(<Pendingusers />)
                        }}>Pending Users</li>
                        <li className='sidebar-li' onClick={() => {
                            setLoadpage(<PendingOrders />)
                        }}>Pending Orders</li>
                        <li className='sidebar-li' onClick={() => {
                            setLoadpage(<ApprovedOrders />)

                        }}>Approved Orders</li>


                    </div>
                </div>

                <div className={sidebaropen}>

                    <div className='top-btn-div'>
                        <Grid3x3GapFill className='open-btn' onClick={HandleSidebar} />

                    </div>
                    <div>
                        {
                            loadpage
                        }
                    </div>
                </div>
            </div>

        </>
    )
}
