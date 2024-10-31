import React from 'react'

const Card = ({ tab }) => {
  return (
      <div className="card m-2" style={{ width: "10rem" }}>
          <img src={tab.favIconUrl}
              className="card-img-top" alt="..." />
          <div className="card-body text-center">
              <h5 className="card-title">{tab.title}</h5>
          </div>
      </div>
  )
}

export default Card