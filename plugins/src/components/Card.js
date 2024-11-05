import React from 'react'

const Card = ({ tab, port ,groups}) => {

    const [showMenu, setShowMenu] = React.useState(false);
    const [color,setColor] = React.useState("#f0f0f0");
    const [groupName, setGroupName] = React.useState('');

    
    const filteredGroups = groups.filter(group =>!group.tabs.some(ele => ele.id === tab.id));
    

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

    const handleSave = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                console.error('Auth token not found');
                return;
            }

            const res = await fetch('http://localhost:4000/api/group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    name: groupName,
                    color: color,
                    tab: tab
                }),
            });
            const response = await res.json();

            // console.log(response);
            

            if (response.success) {
                window.location.reload();
            } else {
                throw new Error(`${response.msg}`);
            }
            setShowMenu(false);

        } catch (error) {
            // toast.error('Failed to save group', { position: toast.POSITION.TOP_LEFT });
            console.log(error);
            setShowMenu(false);
        }
    }

    const handleAddGroup = async(group) => {
        try{
            const authToken = localStorage.getItem('authToken');
            const res = await fetch('http://localhost:4000/api/group', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    tab: tab,
                    group: group
                }),
            });
            const response = await res.json();

            if (response.success) {
                console.log('added to group');
            } else {
                throw new Error(`${response.msg}`);
            }
        } catch(error){
            console.log(error);
        }
    }

    return (
        <>
            {showMenu ? 
            <div className="card m-2 d-flex justify-content-center" style={{ width: "180px", height: "180px" }}>
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
                        zIndex: 5
                    }}>
                        <p style={{ fontSize: "10px" ,position:"absolute",top:"5px",left:"5px"}}>{tab.title}</p>
                        <i className="fas fa-times icon-red" onClick={() =>setShowMenu(false)}
                            style={{
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                                cursor: "pointer",
                                color: "#555"
                            }}></i>
                    </div>
                    <div className='w-100 d-flex flex-column justify-content-center align-items-center p-3' style={{marginTop:"28px"}}>
        
                    <input type="text" className="form-control" placeholder="Name this group" aria-label="Username" aria-describedby="basic-addon1" 
                    onChange={(e) => setGroupName(e.target.value)}
                    />
                    <input type="color" className="m-auto  
            form-control form-control-color"
                        id="GFG_Color" value={color} onChange={(e) => setColor(e.target.value)}></input>
                        <button type='submit' className='button-85 mt-2' style={{width:"100px",height:"10px"}} onClick={() => handleSave()} >Save</button>
                    </div>
            </div>: 
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
                zIndex: 5
            }}>

                <i className="fas fa-arrows-alt icon" data-toggle="tooltip" data-placement="top" title="Drag" style={{
                    // position: "absolute",
                    // top: "5px",
                    // left: "5px",
                    cursor: "pointer",
                    color: "#555"
                }}></i>

                <div className="card-menu d-flex justify-content-center" style={{zIndex:2}}>
                    <div className="dropdown dropdown-hover">
                        <button data-mdb-button-init data-mdb-ripple-init data-mdb-dropdown-init
                            className="border-0 dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-mdb-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-layer-group icon" ></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-hover" aria-labelledby="dropdownMenuButton">
                            <li>
                                <div className="dropdown-item " style={{ cursor: "pointer" }} onClick={()=>setShowMenu(true)}>New group</div>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    Add to a group &raquo;
                                </a>
                                <ul className="dropdown-menu dropdown-submenu" style={{zIndex:400}}>
                                {filteredGroups.map((group) => (<li key={group._id}><a className="dropdown-item" href="#" onClick={() => handleAddGroup(group)} >{group.name}</a></li>))}                                    
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>




                <i className="fa-solid fa-clone icon" onClick={() => { duplicateTab(tab?.id) }}
                    style={{
                        // position: "absolute",
                        // top: "5px",
                        // right: "48px",
                        cursor: "pointer",
                        color: "#555"
                    }}></i>
                {tab?.pinned ? <i className="fa-solid fa-thumbtack-slash icon" onClick={() => { unPinTab(tab?.id) }}
                    style={{
                        // position: "absolute",
                        // top: "5px",
                        // right: "23px",
                        cursor: "pointer",
                        color: "#555"
                    }}></i> :
                    <i className="fa-solid fa-thumbtack icon" onClick={() => { pinTab(tab?.id) }}
                        style={{
                            // position: "absolute",
                            // top: "5px",
                            // right: "23px",
                            cursor: "pointer",
                            color: "#555"
                        }}></i>
                }
                <i className="fas fa-times icon-red" onClick={() => { closeTab(tab?.id) }}
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
                    position: "absolute",
                    top: "30px",
                    right: "-20px",
                    height: "30px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "flex-end",
                    padding: "8px 8px",
                }}>

                    {/* <i className="fa-solid fa-bookmark"></i>   if bookmarked */}
                </div>
            </div>
            {/* <div className='card-hover'> */}
            <img onClick={() => {
                setActiveTab(tab?.id)
            }}
                style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "fit",
                    alignItems: "center", position: "relative", top: "15px", left: "40px",
                    marginTop: "30px", backgroundColor: "", cursor: "pointer"
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
        }
        </>
    )
}

export default Card