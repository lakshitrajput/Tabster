import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Histogram from './Histogram';
import PieChart from './PieChart';

export default function Chart() {

    const [data,setData]=useState([]);

 
    const fetchData = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            const res = await fetch('https://tabster.onrender.com/api/tab/usage', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
            });
            const response = await res.json();
            setData(response.data);

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    },[])

  return (
      <div >
          <div >
              <div style={{ position: "absolute", top: "10px", right: "10px" ,border:"1px solid black",padding:"5px"}}>
                  <Link to="/" ><i className="fa-solid fa-square-xmark text-danger"></i></Link>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center">
                  <h1 className='text-warning'>Tabster</h1>
                  <p className="lead fw-normal mb-0 me-3 text-secondary">Where Tabs Meet Innovation</p>
              </div>
              <div>
               <Histogram data={data}/>
               <PieChart data={data}/>
              </div>
          </div>
      </div>
  )
}
