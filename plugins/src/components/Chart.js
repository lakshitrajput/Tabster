import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Chart() {

 
    const fetchData = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            const res = await fetch('http://localhost:4000/api/tab/usage', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
            });
            const response = await res.json();
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    },[])

  return (
      <div className='home'>
          <div className='home-content'>
              <div style={{ position: "absolute", top: "10px", right: "10px" ,border:"1px solid black",padding:"5px"}}>
                  <Link to="/" ><i class="fa-solid fa-square-xmark text-danger"></i></Link>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center">
                  <h1 className='text-warning'>Tabster</h1>
                  <p className="lead fw-normal mb-0 me-3 text-secondary">Where Tabs Meet Innovation</p>
              </div>
              <div>

              </div>
          </div>
      </div>
  )
}
