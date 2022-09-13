import React, { useState, useEffect } from 'react'
import Footer from '../components/footer';
import Mainnavbar from '../components/mainnavbar';
import "./product.css";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Products() {
    const data = useLocation();
    const categoryid = data.state.catid;
    const categoryname = data.state.catname;
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate=useNavigate();


    const getAllcategories = () => {
        axios
            .get("/get-all-categories")
            .then((res) => {

                setCategories(res.data);
            })
            .catch(err => console.error(err));
    }
    const getCategoryProducts = () => {
        axios
            .get("/get-all-products-bycat/" + categoryid)
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {


        getCategoryProducts();
        getAllcategories();


    }, [getCategoryProducts])





    return (
        <>
            <Mainnavbar />


            <div className='page-header'>
                <h1>{categoryname}</h1>
            </div>



            <div className='d-flex'>
                <div className='products-page-category-div'>
                    <h2 className='ms-4'>CATEGORIES</h2>
                    <ul className='products-page-category-list'>


                        {
                            categories.map((item, index) => {
                                return <li key={index} onClick={() => {
                                    navigate("/category-products", { state: { catid: item._id, catname: item.name } });
                                    getCategoryProducts();

                                }}>{item.name}</li>
                            })
                        }


                    </ul>


                </div>
                <div className='products-page-products-div'>{

                    products.length <= 0 ? <div className='no-data'>Nothing to show </div> :
                        products.map((item, index) => {
                            return <div className='d-flex productspage-product-item' key={index}>
                                <div className="card productspage-product-card-div" >
                                    <img className="card-img-top card-img" src={require("../../images/" + item.img)} alt="Card image cap" />
                                    <div className="card-body  productspage-product-card-body">
                                        <h3>{item.name}</h3>
                                        <p>{item.desc}</p>
                                        <span>Price :{item.price}$</span>
                                    </div>
                                    <div className='productspage-product-addcart-hide'>

                                        <span className='btn productspage-product-react-btn'>Add to Cart</span>

                                    </div>
                                </div>
                            </div>
                        })
                }



                </div>
            </div>
            {/* footer */}

            <Footer />

        </>
    )
}
