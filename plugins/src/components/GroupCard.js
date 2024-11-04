import React from 'react'

export default function GroupCard({color,name}) {

   const modifiedName=name.substring(0,Math.min(name.length,10))+(name.length>10?"...":"")
   

  return (
      <div className="card m-2 d-flex justify-content-center align-items-center text-light group-hover" style={{ width: "70px", height: "20px",backgroundColor:color,cursor:"pointer" }}>
          <p style={{ fontSize: "10px" ,marginTop:"10px",fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"}}>{modifiedName}</p>
          </div>
  )
}
