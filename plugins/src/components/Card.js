import React from 'react'

const Card = ({ tab, port }) => {

    const [showMenu, setShowMenu] = React.useState(false);
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

    const createBookmark = (tab) => {
        const msg = {
            action: 8,
            tab: tab
        }
        port.postMessage(msg);
    }

    return (

        <div className="card m-2  d-flex justify-content-center" style={{ width: "180px", height: "180px" }}>
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
            
                <i className="fas fa-arrows-alt icon" style={{
                    // position: "absolute",
                    // top: "5px",
                    // left: "5px",
                    cursor: "pointer",
                    color: "#555"
                }}></i>

                <div className=" d-flex justify-content-center" >
                    <div className="dropdown dropdown-hover">
                        <button data-mdb-button-init data-mdb-ripple-init data-mdb-dropdown-init
                            className="border-0 dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-mdb-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-layer-group icon" ></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-hover" aria-labelledby="dropdownMenuButton">
                            <li>
                                <div className="dropdown-item " style={{cursor:"pointer"}} >New group</div>
                            </li>
                            <li>
                                <div className="dropdown-item " style={{ cursor: "pointer" }}>Add to a group</div>
                            </li>
                            
                        </ul>
                    </div>
                </div>


        
                
                <i className="fa-solid fa-clone icon" onClick={() => {duplicateTab(tab?.id) }} 
                style={{
                    // position: "absolute",
                    // top: "5px",
                    // right: "48px",
                    cursor: "pointer",
                    color: "#555"
                }}></i>
                {tab?.pinned ? <i className="fa-solid fa-thumbtack-slash icon" onClick={() => {unPinTab(tab?.id) }}
                style={{
                    // position: "absolute",
                    // top: "5px",
                    // right: "23px",
                    cursor: "pointer",
                    color: "#555"
                }}></i> : 
                    <i className="fa-solid fa-thumbtack icon" onClick={() => {pinTab(tab?.id) }}
                style={{
                    // position: "absolute",
                    // top: "5px",
                    // right: "23px",
                    cursor: "pointer",
                    color: "#555"
                }}></i>
                }
                <i className="fas fa-times icon-red" onClick={() => {closeTab(tab?.id) }} 
                style={{
                    // position: "absolute",
                    // top: "5px",
                    // right: "5px",
                    cursor: "pointer",
                    color: "#555"
                }}></i>
            </div>
            <div className='cardFooter'>
                <div style={{
                    position:"absolute",
                    top:"30px",
                    right:"-20px",
                    height: "30px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "flex-end",
                    padding: "8px 8px",
                }}>

                    {/* <i class="fa-solid fa-bookmark"></i>   if bookmarked */}
                </div>
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
                }} src={(!tab.favIconUrl || tab.favIconUrl === "") ? "https://cdn-icons-png.flaticon.com/512/152/152759.png" : tab.favIconUrl}
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
            
            </div>
            <i className="fa-regular fa-bookmark icon-red" 
                onClick={() => {
                    // createBookmark(tab)
                    console.log('creating bookmark');
                }}
                style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                color: "#007bff",
                fontSize: "16px",
                cursor: "pointer"
            }}></i>

        </div>
    )
}

export default Card