import React, { useState, useEffect } from 'react';
import { categories } from '../../costumer/models';
import "../productscategories.css";
import { Trash, PencilSquare, Plus } from 'react-bootstrap-icons';
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import axios from 'axios';

export default function ProductsDeatails() {
    const [opencreate, setOpencreate] = useState(false);
    const [openupdate, setOpenupdate] = useState(false);
    const [catoption, setCatoption] = useState([]);
    const [catid, setCatid] = useState("");
    const [pname, setPname] = useState("");
    const [pprice, setPprice] = useState("");
    const [pdesc, setPdesc] = useState("");
    const [pavailable, setPavailable] = useState(0);
    const [products, setProducts] = useState([]);
    const [singlerecord, setSinglerecord] = useState({});
    const [pimg, setPimg] = useState("");
    const [uname, setUname] = useState("");
    const [uprice, setUprice] = useState("");
    const [utotal, setUtotal] = useState(0);
    const [uimg, setUimg] = useState("");
    const [upid, setUpid] = useState("");
    const [udesc, setUdesc] = useState("");







    const opencreatedialog = () => {
        setOpencreate(true);
    }
    const closecreatedialog = () => {
        setOpencreate(false)
    }

    const openupdatedialog = () => {
        setOpenupdate(true);
    }
    const closeupdatedialog = () => {
        setOpenupdate(false)
    }
    const getAllcategories = () => {
        axios
            .get("/get-all-categories")
            .then((res) => {

                setCatoption(res.data)

            })
            .catch(err => console.error(err));
    }
    const getAllProducts = () => {
        axios
            .get("/get-all-products")
            .then((res) => {

                setProducts(res.data);


            })
            .catch(err => console.error(err));
    }


    useEffect(() => {
        getAllProducts();
        getAllcategories();
    }, [])


    return (
        <div className='categories-page-main-div '>

            <div className='d-flex justify-content-between admin-categories-header-div ' >
                <h3>Products</h3>
                <Plus className='add-new-category-icon' onClick={opencreatedialog} />

            </div>

            <div className='d-flex flex-wrap ms-5 me-5 admin-categories-main-div'>

                {
                    products.map((item, index) => {
                        return <div className='categories-content-main-div' key={index} >
                            <div className='ms-2 me-2 admin-categories-content-div' onClick={() => {
                                console.log("clicekd");
                            }}>
                                <img src={require("../../images/" + item.img)} className="admin-categories-img" />
                            </div>

                            <div className='admin-categories-title'>
                                <h3 >{item.name}</h3>
                                <div className='d-flex justify-content-between'>
                                    <span >category</span>
                                    <span className='me-2'>{item.categoryid.name}</span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span >price</span>
                                    <span className='me-2'>{item.price}</span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span >total</span>
                                    <span className='me-2'>{item.total}</span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span >Available</span>
                                    <span className='me-2'>{item.available}</span>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <span >sold</span>
                                    <span className='me-2'>{item.sold}</span>
                                </div>

                                <PencilSquare className='btn-success ms-3 icon' onClick={(e) => {
                                    e.preventDefault();
                                    axios
                                        .get("/get-product/" + item._id)
                                        .then((res) => {
                                            if (res.data.success === true) {
                                                console.log(res.data.data);
                                                setUpid(res.data.data._id);
                                                setUname(res.data.data.name);
                                                setUtotal(res.data.data.total);
                                                setUprice(res.data.data.price);
                                                setUdesc(res.data.data.desc);

                                                openupdatedialog();

                                            } else {

                                            }

                                        })
                                        .catch(err => console.error(err));
                                }} />
                                <Trash className='btn-danger ms-3 icon' onClick={(e) => {
                                    axios
                                        .delete("/delete-product/" + item._id)
                                        .then(res => {
                                            console.log(res.data);
                                            getAllProducts();
                                        })
                                        .catch(err => console.error(err));
                                }} />
                                <span className=' btn btn-danger ms-3' onClick={()=>{
                                    axios
                                      .get("/create-top-product/"+item._id)
                                      .then((res)=>{console.log(res.data);} )
                                      .catch(err => console.error(err));
                                }}>Make top product</span>

                            </div>
                        </div>
                    })
                }


                {/* add product form */}
                <Modal show={opencreate} >
                    <ModalHeader closeButton onClick={closecreatedialog}>
                        Add New Product
                    </ModalHeader>
                    <ModalBody>

                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Product Name</label>
                                <input type="text" className="form-control" value={pname} onChange={(e) => {
                                    setPname(e.target.value);
                                }} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Select Category</label>
                                <select className="form-control" id="exampleFormControlSelect1" value={catid} onChange={(e) => {
                                    setCatid(e.target.value);
                                }}>
                                    <option>Select Ctegory </option>
                                    {
                                        catoption.map((item, index) => {
                                            return <option key={index} value={item._id}>{item.name}</option>

                                        })
                                    }

                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Product Price</label>
                                <input type="number" className="form-control" val={pprice} onChange={(e) => {
                                    setPprice(e.target.value);
                                }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Total Quantity</label>
                                <input type="number" className="form-control" val={pavailable} onChange={(e) => {

                                    setPavailable(e.target.value);
                                }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Product Pic</label>
                                <input type="file" className="form-control" onChange={(e) => {
                                    setPimg(e.target.files[0])
                                }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Product Description</label>
                                <textarea type="text" className="form-control" value={pdesc} onChange={(e) => {
                                    setPdesc(e.target.value);
                                }} />
                            </div>

                            <button type="submit" className="btn btn-primary" onClick={(e) => {
                                e.preventDefault();

                                const formdata = new FormData();
                                formdata.append("name", pname);
                                formdata.append("catid", catid);
                                formdata.append("total", pavailable);
                                formdata.append("price", pprice);
                                formdata.append("img", pimg);
                                formdata.append("desc", pdesc);

                                axios
                                    .post("/create-product", formdata)
                                    .then()
                                    .catch(err => console.error(err));
                                closecreatedialog();
                                getAllProducts();
                            }}>CREATE</button>
                        </form>
                    </ModalBody>
                </Modal>

                {/* Updae category form */}
                <Modal show={openupdate} >

                    <ModalHeader closeButton onClick={closeupdatedialog}>
                        Udpdate Product
                    </ModalHeader>
                    <ModalBody>

                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Product Name</label>
                                <input type="text" className="form-control" value={uname} onChange={(e) => {
                                    setUname(e.target.value);

                                }} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Product Price</label>
                                <input type="number" className="form-control" value={uprice} onChange={(e) => {
                                    setUprice(e.target.value);
                                }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Total product</label>
                                <input type="number" className="form-control" value={utotal} onChange={(e) => {
                                    setUtotal(e.target.value);
                                }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Product Pic</label>
                                <input type="file" className="form-control" onChange={(e) => {
                                    setUimg(e.target.files[0]);
                                }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Product Description</label>
                                <textarea type="text" className="form-control" value={udesc} onChange={(e) => {
                                    setUdesc(e.target.value);
                                }} />
                            </div>

                            <button className="btn btn-primary" onClick={(e) => {
                                e.preventDefault();

                                const formdata = new FormData();
                                formdata.append("name", uname);
                                formdata.append("price", uprice);
                                formdata.append("total", utotal);
                                formdata.append("img", uimg);
                                formdata.append("desc",udesc);

                                axios
                                    .post("/update-product/" + upid, formdata)
                                    .then(res => {
                                        console.log(res.data);
                                        getAllProducts();
                                    })
                                    .catch(err => console.error(err));
                                closeupdatedialog();
                            }}>CREATE</button>
                        </form>
                    </ModalBody>
                </Modal>







            </div>
        </div>
    )
}
