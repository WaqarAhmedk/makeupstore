
import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import AccordionBody from 'react-bootstrap/esm/AccordionBody'
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader'
import axios from "axios";
import { Trash } from 'react-bootstrap-icons';

export default function Storedeatils() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);



  const getAllProducts = () => {


    axios
      .get("/get-all-topproducts")
      .then((res) => {
        console.log(res.data)
        setProducts(res.data);
      })
      .catch(err => console.error(err));
  }


  const getAllcategories=()=>{
    axios
      .get("/get-top-categories")
      .then((res) =>{
        console.log(res.data);
      setCategories(res.data)})
      .catch(err => console.error(err));

  }

  useEffect(() => {
    getAllProducts();
    getAllcategories();
  }, [])
  return (
    <>

      <Accordion>
        <AccordionHeader>TOP PRODUCTS</AccordionHeader>
        <AccordionBody>

          {
            products.map((item, index) => {
              return <div className='d-flex justify-content-between mt-3 mb-2'>
                
                <div className='h-50 w-50 d-flex'>
                <img src={require("../../images/"+item.img)} className="h-25 w-25 d-block" />
                  <span className='ms-5 pt-4'>{item.name}</span>
                </div>
                <div className='pt-4'>
                <p >{item.desc}</p>
                </div>
                
                <div className='pt-4'>
                  <span className='me-4'>{item.price}</span>
                  <Trash className='me-5 ms-3 btn-danger icon' onClick={()=>{
                    axios
                      .delete("/delete-top-product/"+item._id)
                      .then((res)=>{
                        console.log(res);
                        getAllProducts();

                      } )
                      .catch(err => console.error(err));
                  }}/>
                </div>
              </div>
            })
          }



        </AccordionBody>
      </Accordion>
      <Accordion>
        <AccordionHeader>TOP CATEGORIES</AccordionHeader>
        <AccordionBody>

          {
            categories.map((item, index) => {
              return <div className='d-flex justify-content-between mt-3 mb-2'>
                
                <div className='h-50 w-50 d-flex'>
                <img src={require("../../images/"+item.img)} className="h-25 w-25 d-block" />
                  <span className='ms-5 pt-4'>{item.name}</span>
                </div>
                <div className='pt-4'>
                
                </div>
                
                <div className='pt-4'>
                  <Trash className='me-5' />
                </div>
              </div>
            })
          }



        </AccordionBody>
      </Accordion>

    </>
  )
}
