import React, { useState, useEffect } from 'react';
import "../approveuser.css";
import { Trash, PencilSquare } from 'react-bootstrap-icons';
import { useCookies } from 'react-cookie';
import axios from 'axios';


export default function Userdetails() {



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
    const getallusers = () => {
        axios
            .get("/get-all-coustmers", {
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
    useEffect(() => {
        getallusers();
    }, []);

    return (
        <div>

            <table className="table table-striped">
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

                                    <Trash />
                                </td>

                            </tr>
                        })
                    }


                </tbody>
            </table>
            <h2>total users :{users.length}</h2>
        </div>
    )
}
