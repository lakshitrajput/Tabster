import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Auth() {
    const navigate = useNavigate();
    const port = chrome.runtime.connect({ name: "auth" });
    const [user, setUser] = useState({
        email: "",
        password: "",
        name: ""
    })
    const [login, setLogin] = useState(true);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }





    async function handleSubmit(e) {
        e.preventDefault();
        if (login === true && user.email.length > 4 && user.password.length > 5) {
            const request = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: user.email,
                    password: user.password
                })
            });

            const response = await request.json();
             

            if (response.success) {
                toast.success(response.message);
                localStorage.setItem("authToken", response.token);
                navigate("/success");
            }else{
                toast.error(response.message);
            }
        }
        else if (login === false && user.name.length > 4 && user.email.length > 4 && user.password.length > 4) {
            const request = await fetch("http://localhost:4000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    password: user.password
                })
            })
            const response = await request.json();


            if (response.success) {
                toast.success(response.message);
                setLogin(true);
            }else{
                toast.error(response.message);
            }

        }
        else {
            toast.error("Please fill all the fields");
        }

    }

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            navigate("/success")
        }
    }, [])

    return (
        <MDBContainer fluid className="p-3 my-5 h-custom">

            <MDBRow>

                <MDBCol col='10' md='6'>
                    <img src="https://workona.com/_next/static/media/tab-manager-hero.f3b46089.png" className="img-fluid" alt="Sample image" />
                </MDBCol>

                <MDBCol col='4' md='6'>

                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <h1 className='text-warning'>Tabster</h1>
                        <p className="lead fw-normal mb-0 me-3 text-secondary">Where Tabs Meet Innovation</p>
                    </div>
                    {
                        !login && <MDBInput label='Name (min: 5 words)' id='formControlLg' name="name" value={user.name} type='name' size="lg" className='mb-3 mt-2' onChange={(e) => handleChange(e)} />
                    }

                    <MDBInput label='Email address' id='formControlLg' name='email' type='email' value={user.email} size="lg" className='mb-3 mt-2' onChange={(e) => handleChange(e)} />
                    <MDBInput label='Password (min: 5 words)' id='formControlLg' name='password' type='password' value={user.password} size="lg" onChange={(e) => handleChange(e)} />



                    <div className='text-center text-md-start mt-4 pt-2'>
                        <MDBBtn className="mb-0 px-5" size='lg' onClick={handleSubmit}>{login ? "Login" : "Sign up"}</MDBBtn>
                        <p className="small fw-bold mt-2 pt-1 mb-2">{login ? "Don't have an account?" : "Already have account?"} <button onClick={() => setLogin((prev) => !prev)} className="text-danger border-0 bg-none">{login ? " Register" : " Login"}</button></p>
                    </div>

                </MDBCol>

            </MDBRow>
            <ToastContainer />
        </MDBContainer>
    );
}

export default Auth;