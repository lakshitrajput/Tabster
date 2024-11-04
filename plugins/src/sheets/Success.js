import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

function Success() {
    const navigate = useNavigate();


   const handleLogout=()=>{
    localStorage.removeItem('authToken');
    navigate('/');
   }
    
    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            navigate("/")
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
                
                <div>

                    <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                    <h5 className=''>You are all set to go</h5>
                    <p className="lead fw-normal mb-0 me-3 text-secondary">You can use Tabster by going to the chrome extension and clicking on "Tabster"</p>
                    <div className='button-85 mt-5' onClick={handleLogout}>Logout</div>
                    </div>
                </div>

                </MDBCol>

            </MDBRow>
        </MDBContainer>
    );
}

export default Success;