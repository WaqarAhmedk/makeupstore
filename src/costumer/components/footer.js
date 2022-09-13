import React from 'react';
import { BoxSeam, Chat, Cash, Phone, Envelope, Clock } from 'react-bootstrap-icons';
import "../pages/css/footer.css"

export default function Footer() {
  return (
   <>
      <div className='footer-main-div'>
                <div className='footer-inner-div'>
                   
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-1-ul-2 ms-5">
                    <h2 className='footer-title'>Contact us</h2>
                        <li className="footer-nav-item ms-4 ">
                            <Phone className='d-inline' />
                            <span className=" nav-1-link ms-3" aria-current="page" >0344323232</span>
                        </li>

                        <li className="footer-nav-item ms-4">
                            <Envelope className='d-inline' />
                            <span className="nav-1-link ms-3" aria-current="page" >Info@domain.co</span>
                        </li>
                        <li className="footer-nav-item ms-4">
                            <Clock className='d-inline ' />
                            <span className="nav-1-link ms-3" aria-current="page">Mon-7 matrch 2021</span>
                        </li>
                        <li className='propt'>
                        © 2020  All rights reserved.
                        </li>
                    </ul>

                </div>
                <div className='footer-inner-div'>
                    <img src={require("../images/lushlogo.png")} className="footer-logo" />
                    <Phone />
                    <Phone />
                    <Phone />

                </div>
                <div className='footer-inner-div'>
                <h2 className='footer-title'>QUOTE</h2>

                    <p className='footer-p'>
                        Style too own civil out along. Perfectly offending attempted add arranging age gentleman.
                         Get who uncommonly our expression ten increasing considered.

                    </p>
                    <span className='footer-readmore'>Read More..</span>
                </div>
            </div>
   </>
  )
}
