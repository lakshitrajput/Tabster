import React from 'react'

const Card = ({ tab }) => {
  return (

      <div className="card m-2" style={{ width: "10rem" }}>
        {console.log(tab.favIconUrl === "")}
          <img src={(tab.favIconUrl) === "" ? "https://www.scwitservices.com/images/easyblog_shared/February_2021/2-17-21/b2ap3_thumbnail_131006821_multiple_tabs_400.jpg" : tab.favIconUrl}
              className="card-img-top" alt="..." />
          <div className="card-body text-center">
              <h5 className="card-title">{tab.title}</h5>
          </div>
      </div>
  )
}

export default Card