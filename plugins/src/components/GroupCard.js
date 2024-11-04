import React from 'react'
import { Link } from 'react-router-dom'

export default function GroupCard({color,name,id}) {


   const modifiedName=name.substring(0,Math.min(name.length,10))+(name.length>10?"...":"")
   
   


  return (
    <>
      <Link to={`/group/${id}`} className="card m-2 d-flex justify-content-center align-items-center group-hover text-dark" style={{ width: "70px", height: "20px",backgroundColor:color,cursor:"pointer" ,border:"1px solid black"}}>
          <p style={{ fontSize: "10px" ,marginTop:"15px",fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}>{modifiedName}</p>
          </Link>
      </>
  )
}
