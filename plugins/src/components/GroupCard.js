import React from 'react'

export default function GroupCard({color,name}) {



  return (
      <div className="card m-2  d-flex justify-content-center align-items-center text-light" style={{ width: "180px", height: "180px",backgroundColor:color }}>
          <div style={{
              backgroundColor: "#f0f0f0",
              height: "30px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 8px",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1
          }}>
              <i className="fas fa-times icon-red" onClick={() => { closeTab(tab?.id) }}
                  style={{
                      // position: "absolute",
                      // top: "5px",
                      // right: "5px",
                      cursor: "pointer",
                      color: "#555"
                  }}></i>
          </div>
          <h1>{name}</h1>
          </div>
  )
}
