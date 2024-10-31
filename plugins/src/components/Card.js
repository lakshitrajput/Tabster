import React from 'react'

const Card = ({ tab }) => {
  return (

      <div className="card m-2 overflow-hidden d-flex justify-content-center" style={{ width: "180px",height: "180px" }}>
          <img style={{width: "100px", height: "100px", objectFit: "fit",alignItems: "center" ,position: "relative", top: "20px", left: "40px"}} src={(tab.favIconUrl) === "" ? "https://www.scwitservices.com/images/easyblog_shared/February_2021/2-17-21/b2ap3_thumbnail_131006821_multiple_tabs_400.jpg" : tab.favIconUrl}
              className="card-img-top" alt="..." />
          <div className="card-body text-center">
              <h5 className="card-title" style={{fontSize: "15px"}} >{tab.title}</h5>
          </div>
      </div>
  )
}

export default Card