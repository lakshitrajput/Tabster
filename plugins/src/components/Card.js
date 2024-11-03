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

    const pinTab = (id) => {
        const msg = {
            action: 2,
            id: id
        }
        port.postMessage(msg);
    }
    const unPinTab = (id) => {
        const msg = {
            action: 3,
            id: id
        }
        port.postMessage(msg);
    }

    const duplicateTab = (id) => {
        const msg = {
            action: 4,
            id: id
        }
        port.postMessage(msg);
    }

    const setActiveTab = (id) => {
        const msg = {
            action: 6,
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

                
                <i className="fa-solid fa-clone" onClick={() => {duplicateTab(tab?.id) }} 
                style={{
                    position: "absolute",
                    top: "5px",
                    right: "48px",
                    cursor: "pointer",
                    color: "#555"
                }}></i>
                {tab?.pinned ? <i className="fa-solid fa-thumbtack-slash" onClick={() => {unPinTab(tab?.id) }}
                style={{
                    position: "absolute",
                    top: "5px",
                    right: "23px",
                    cursor: "pointer",
                    color: "#555"
                }}></i> : 
                <i className="fa-solid fa-thumbtack" onClick={() => {pinTab(tab?.id) }}
                style={{
                    position: "absolute",
                    top: "5px",
                    right: "23px",
                    cursor: "pointer",
                    color: "#555"
                }}></i>
                }
                <i className="fas fa-times" onClick={() => {closeTab(tab?.id) }} 
                style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    cursor: "pointer",
                    color: "#555"
                }}></i>
            </div>
            {/* <div className='card-hover'> */}
            <img onClick={() => {
                setActiveTab(tab?.id)
            }}
                style={{ width: "90px", 
                height: "90px", 
                objectFit: "fit", 
                alignItems: "center", position: "relative", top: "15px", left: "40px", 
                marginTop: "30px", backgroundColor:"", cursor: "pointer"
                }} src={(tab.favIconUrl) === "" ? "https://cdn-icons-png.flaticon.com/512/152/152759.png" : tab.favIconUrl}
                className="card-img-top" alt="..." />
            <div className="card-body text-center">
                <h5 className="card-title" style={{
                    fontSize: "15px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "150px"
                }} >{tab.title}</h5>
            {/* </div> */}
            {/* <div className='cardFooter'>
                    <div style={{
                        backgroundColor: "#f0f0f0",
                        height: "90px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        padding: "8px 8px",
                    }}>
                       
                        <div className="fas fa-times" onClick={() => { closeTab(tab?.id) }}
                            style={{
                                cursor: "pointer",
                                width: "30px",
                                height: "20px",
                                color: "#555"
                            }}></div>
                        <div className="fas fa-times" onClick={() => { closeTab(tab?.id) }}
                            style={{
                                cursor: "pointer",
                                width: "30px",
                                height: "20px",
                                color: "#555"
                            }}></div>
                        <div className="fas fa-times" onClick={() => { closeTab(tab?.id) }}
                            style={{
                                cursor: "pointer",
                                width: "30px",
                                height: "20px",
                                color: "#555"
                            }}></div>
                        <div className="fas fa-times" onClick={() => { closeTab(tab?.id) }}
                            style={{
                                cursor: "pointer",
                                width: "30px",
                                height: "20px",
                                color: "#555"
                            }}></div>
                        <div className="fas fa-times" onClick={() => { closeTab(tab?.id) }}
                            style={{
                                cursor: "pointer",
                                width: "30px",
                                height: "20px",
                                color: "#555"
                            }}></div>
                        <div className="fas fa-times" onClick={() => { closeTab(tab?.id) }}
                            style={{
                                cursor: "pointer",
                                width: "30px",
                                height: "20px",
                                color: "#555"
                            }}></div>
                        <div className="fas fa-times" onClick={() => { closeTab(tab?.id) }}
                            style={{
                                cursor: "pointer",
                                width: "30px",
                                height: "20px",
                                color: "#555"
                            }}></div>
                        <div className="fas fa-times" onClick={() => { closeTab(tab?.id) }}
                            style={{
                                cursor: "pointer",
                                width: "30px",
                                height: "20px",
                                color: "#555"
                            }}></div>
                        <div className="fas fa-times" onClick={() => { closeTab(tab?.id) }}
                            style={{
                                cursor: "pointer",
                                width: "30px",
                                height: "20px",
                                color: "#555"
                            }}></div>
                        <div className="fas fa-times" onClick={() => { closeTab(tab?.id) }}
                            style={{
                                cursor: "pointer",
                                width: "30px",
                                height: "20px",
                                color: "#555"
                            }}></div>
                    </div>
            </div> */}
            </div>
        </div>
    )
}

export default Card