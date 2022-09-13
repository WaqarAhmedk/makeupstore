import React from 'react';
import "../pages/css/smallnavbar.css";
import { Facebook, Twitter, Linkedin, Google, Clock, Phone, Envelope , } from 'react-bootstrap-icons';


export default function Smallnavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light ps-5 small-navbar" >
    <div className="container-fluid">
      
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 me-5">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                        <Facebook className='small-nav-icon' />
                    </a>
                </li>

                <li className="nav-item">

                    <a className="nav-link active" aria-current="page" href="#"><Twitter className='small-nav-icon' /></a>
                </li>

                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#"><Linkedin className='small-nav-icon' /></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#"><Google className='small-nav-icon' /></a>
                </li>
            </ul>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-1-ul-2 ms-5">
                <li className="nav-item ms-4 ">
                    <Phone className='d-inline' />
                    <span className=" nav-1-link ms-3" aria-current="page" >0344323232</span>
                </li>

                <li className="nav-item ms-4">
                    <Envelope className='d-inline' />
                    <span className="nav-1-link ms-3" aria-current="page" >Info@domain.co</span>
                </li>
                <li className="nav-item ms-4">
                    <Clock className='d-inline ' />
                    <span className="nav-1-link ms-3" aria-current="page">Mon-7 matrch 2021</span>
                </li>

            </ul>


   
    </div>
</nav>
  )
}
