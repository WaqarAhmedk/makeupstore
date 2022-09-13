import React, { useEffect, useState } from 'react';
import "../approveuser.css";
import { Trash, PencilSquare } from 'react-bootstrap-icons';

import axios from "axios";
import { useCookies } from 'react-cookie';
import { Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader } from 'react-bootstrap';


export default function Pendingusers() {
    const [users, setUsers] = useState([]);
    const [cookies, setCookies] = useCookies();
    const [idtodel, setIdtodel] = useState("");
    const [show, setShow] = useState(false);

    const openmodal = () => {
        setShow(true);
    }
    const closemodal = () => {
        setShow(false);
    }
    const allPendingusers = () => {
        axios
            .get("/get-all-pending-coustmers", {
                headers: {
                    "admin-auth-token": cookies.adminAuth
                }
            })
            .then((res) => {
                setUsers(res.data);
                console.log(res.data);
            })
            .catch(err => console.error(err));
    }

    const rejectuser = () => {

    }


    useEffect(() => {
        allPendingusers();
    }, []);
    return (
        <div>
{
    users.length<=0 ? <div className='no-data'>Nothing to show</div>:<table className="table table-striped">
    <thead>
        <tr>
            <th>PROFILE PIC</th>
            <th>USER NAME</th>
            <th>USER EMAIL</th>
            <th>USER MOBILE</th>

            <th>Actions</th>

        </tr>
    </thead>
    <tbody>
        {
            users.map((item, index) => {
                return <tr key={index}>
                    <td>
                        <img src={require("../../costumer/images/facepowderthumb.jpg")} className="approve-user-img" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phno}</td>

                    <td>
                        <span className='btn btn-success' onClick={() => {

                            axios
                                .get("/approve-coustmer/" + item._id, {
                                    headers: {
                                        "admin-auth-token": cookies.adminAuth
                                    }
                                })
                                .then((res) => {
                                    console.log(res.data);
                                    allPendingusers();
                                })
                                .catch(err => console.error(err));
                        }}>Approve</span>
                        <span className='btn btn-danger ms-3' onClick={() => {
                            setIdtodel(item._id);
                            openmodal();


                        }} >Reject</span>
                    </td>

                </tr>
            })
        }



        <Modal show={show} >

            <ModalHeader className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Raject User</h5>
            </ModalHeader>
            <ModalBody>
                Are you sure you wnat to reject coustmer account request ?
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-secondary" data-dismiss="modal" onClick={closemodal}>Cancel</button>
                <button className="btn btn-primary" onClick={() => {
                    console.log(idtodel);

                    axios
                        .delete("/reject-coustmer/" + idtodel, {
                            headers: {
                                "admin-auth-token": cookies.adminAuth
                            }
                        })
                        .then((res) => {
                            console.log(res.data);
                            closemodal();
                            allPendingusers();
                        })
                        .catch(err => console.error(err));
                }}>Confirm</button>

            </ModalFooter>
        </Modal>





    </tbody>
</table>
}
            

        </div>
    )
}
