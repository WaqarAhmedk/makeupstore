import React, { useState, useEffect } from 'react';
import { categories } from '../../costumer/models';
import "../productscategories.css";
import { Trash, PencilSquare, Plus } from 'react-bootstrap-icons';
import axios from "axios";
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';

export default function ProductsCategories() {
  const [opencreate, setOpencreate] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [name, setname] = useState("");
  const [imgfile, setImgfile] = useState("");
  const [categorydata, setCategorydata] = useState([]);
  const [updatename, setUpdatename] = useState("");
  const [updateimage, setUpdateimage] = useState("");
  const [id, setId] = useState("");



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

        setCategorydata(res.data);
      })
      .catch(err => console.error(err));
  }



  useEffect(() => {
    getAllcategories();
  }, [])

  return (
    <div className='categories-page-main-div '>

      <div className='d-flex justify-content-between admin-categories-header-div ' >
        <h3 >Categories</h3>
        <Plus className='add-new-category-icon' onClick={opencreatedialog} />

      </div>

      <div className='d-flex flex-wrap ms-5 me-5 admin-categories-main-div'>


        {
          categorydata.map((item, index) => {
            console.log(index);
            return <div className='categories-content-main-div' key={index} >
              <div className='ms-2 me-2 admin-categories-content-div' onClick={() => {
                console.log("clicekd");
              }}>
                <img src={require("../../images/" + item.img)} className="admin-categories-img" />
              </div>

              <div className='admin-categories-title'>
                <h3 >{item.name}</h3>
                <PencilSquare className='btn-success ms-3 icon' onClick={() => {
                  console.log(item._id);
                  axios
                    .get("/get-category/" + item._id)
                    .then((res) => {
                      setUpdatename(res.data.data.name);
                      setUpdateimage(res.data.data.img);
                      setId(res.data.data._id);


                    })
                    .catch(err => console.error(err));
                  openupdatedialog();

                }} />
                <Trash className='btn-danger ms-3 icon' onClick={() => {
                  axios
                    .delete("/delete-category/" + item._id)
                    .then((res) => {
                      console.log(res.data);
                      getAllcategories();
                    })
                    .catch(err => console.error(err));
                }} />
                <span className=' btn btn-danger ms-3' onClick={()=>{
                                    axios
                                      .get("/create-top-categories/"+item._id)
                                      .then((res)=>{console.log(res.data);} )
                                      .catch(err => console.error(err));
                                }}>Make top product</span>
              </div>
              
            </div>
          })
        }

        {/* add categories form */}
        <Modal show={opencreate} >
          <ModalHeader closeButton onClick={closecreatedialog}>
            Create New Category
          </ModalHeader>
          <ModalBody>
            <form encType='multipart/form-data'>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Category Name</label>
                <input type="text" className="form-control" value={name} onChange={(event) => {
                  setname(event.target.value);
                }} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Image</label>
                <input type="file" className="form-control" onChange={(event) => {
                  setImgfile(event.target.files[0]);
                }} />
              </div>


              <button className="btn btn-primary" type="submit" onClick={(e) => {
                e.preventDefault();

                const formdata = new FormData();
                formdata.append("img", imgfile);
                formdata.append("name", name)
                axios
                  .post("/create-category", formdata, {
                    headers: {
                      "admin-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjYyZTRjYWNjNWRmNTk5M2Q4NjM0ZmY3YiJ9LCJpYXQiOjE2NTkxNjE4NjF9.VuSAGmSfl9-i0eT8-GPrNuOE5C7cfdZgDT7SRXlFI64"
                    }
                  })
                  .then((res) => {

                    console.log(res);
                    closecreatedialog();
                    window.location.preventDefault();

                    getAllcategories();

                  })
                  .catch(err => console.error(err));
              }}>CREATE</button>
            </form>
          </ModalBody>
        </Modal>

        {/* Updae category form */}
        <Modal show={openupdate} >
          <ModalHeader closeButton onClick={closeupdatedialog}>
            Udpdate Category
          </ModalHeader>
          <ModalBody>
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Category Name</label>
                <input type="text" className="form-control" value={updatename} onChange={(e) => {
                  setUpdatename(e.target.value);
                }} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Category Image</label>
                <input type="file" className="form-control" onChange={(e) => {
                  setUpdateimage(e.target.files[0]);
                  console.log(updateimage);
                }} />
              </div>


              <button type="submit" className="btn btn-primary" onClick={(e) => {
                e.preventDefault();
                console.log(id);
                const formdata=new FormData();
                formdata.append("img",updateimage);
                formdata.append("name",updatename);
                axios
                  .post("/update-category/" + id,formdata)
                  .then(res => console.log(res))
                  .catch(err => console.error(err));
              }}>CREATE</button>
            </form>
          </ModalBody>
        </Modal>







      </div>
    </div>
  )
}
