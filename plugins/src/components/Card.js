import React from 'react'

const Card = ({ tab, port }) => {
    // req to bg to close tab with id: id
    const closeTab = (id) => {
        const msg = {
            action: 1,
            id: id
        }
        port.postMessage(msg);
    }


    return (

        <div className="card m-2 overflow-hidden d-flex justify-content-center" style={{ width: "180px", height: "180px" }}>
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
                <i className="fas fa-arrows-alt" style={{
                    position: "absolute",
                    top: "5px",
                    left: "5px",
                    cursor: "pointer",
                    color: "#555"
                }}></i>

                <i className="fas fa-times" onClick={() => {closeTab(tab.id) }} 
                style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    cursor: "pointer",
                    color: "#555"
                }}></i>
            </div>

            <img style={{ width: "90px", height: "90px", objectFit: "fit", alignItems: "center", position: "relative", top: "15px", left: "40px", marginTop: "30px", backgroundColor:"" }} src={(tab.favIconUrl) === "" ? "https://www.scwitservices.com/images/easyblog_shared/February_2021/2-17-21/b2ap3_thumbnail_131006821_multiple_tabs_400.jpg" : tab.favIconUrl}
                className="card-img-top" alt="..." />
            <div className="card-body text-center">
                <h5 className="card-title" style={{
                    fontSize: "15px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "150px"
                }} >{tab.title}</h5>
            </div>
        </div>
    )
}

export default Card