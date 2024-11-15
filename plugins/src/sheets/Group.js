import React, { useEffect, useState } from 'react'
import GroupTabCard from '../components/GroupTabCard';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Group = () => {
    const groupID=useParams().id;
    const navigate = useNavigate();
    const [tabs, setTabs] = useState([]);
    const [groups, setGroups] = useState([]);
    const port = chrome.runtime.connect({ name: "popup" });
    const [search,setSearch]=useState('')
    const [activeGroup,setActiveGroup]=useState([])
    const [searchTabs, setSearchTabs] = useState([])

    console.log(activeGroup);
    

    const getAllGroups = async () => {
        const authToken = localStorage.getItem('authToken');
        const res = await fetch('https://tabster.onrender.com/api/group', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
        });
        const response = await res.json();
        setGroups(response.groups);


        const currGroup=response.groups.find((group)=>group._id===groupID);
        setActiveGroup(currGroup)
        setTabs(currGroup.tabs);        

    }
    
    useEffect(() => {
        handleSearch();
    }, [search])

    const handleSearch = async () => {
        if (search.length > 0) {
            const filteredTabs = tabs.filter(
                (tab) =>
                    tab.title.toLowerCase().includes(search.toLowerCase()) ||
                    tab.url.toLowerCase().includes(search.toLowerCase())
            );
            setSearchTabs(filteredTabs);
        } else {
            setSearchTabs([])
        }
    }

    useEffect(() => {
        getAllGroups();
        // to prevent the port becoming inactive after some time
        const interval = setInterval(() => {
            port.postMessage({ action: "ping" });
        }, 10000);

        return () => clearInterval(interval);
    }, [])


    // useEffect(() => {
    //     port.onMessage.addListener((res) => {
    //         const action = res.action;
    //         if (action == 0) {
    //             setTabs(res.data);
    //         }
    //     });

    //     return () => port.onMessage.removeListener();
    // }, [port])

    // // request to background.js for tabs
    // const getAllTabs = () => {
    //     const msg = {
    //         action: 0
    //     }
    //     port.postMessage(msg);
    // }

    const handleCopy = () => {
        navigator.clipboard.writeText(activeGroup.groupCode)
            .then(() => toast.success("Text copied to clipboard!"))
            .catch((err) => toast.error("Failed to copy text: ", err));
    };

    const handleUngroup = async () => {
        const authToken = localStorage.getItem('authToken');
        const res = await fetch('https://tabster.onrender.com/api/group', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupId: groupID
            })
        });
        const response = await res.json();
        console.log(response);
        if(response.success){
            navigate("/");
        }
        else{
            console.log('error removing group');
        }
    }


    return (
        <div className='home w-100'>
            <div className='home-content w-100'>
                <div className='mt-2 mb-5'>
                    <div className="box">
                        <form name="search">
                            <input type="text" className="input" name="txt"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>
                        <i className="fas fa-search"></i>
                    </div>
                </div>
               
                <div className='w-100 d-flex align-items-center p-2' style={{justifyContent:"space-between"}}>
                <button className="button-85" role="button" onClick={() => window.history.back()}>Back</button>
                    <button className="button-85 bg-warning" style={{ cursor: "pointer" }} role="button" onClick={handleCopy}>
                    <div className='d-flex flex-column'>
                    <div>{activeGroup?.name} </div>
                            <div>{activeGroup.groupCode} <span><i className="fa-solid fa-copy"></i></span></div>
                    </div>
                    </button>
                <button className="button-85 bg-danger" role="button" onClick={handleUngroup} >Ungroup</button>

                </div>
                <div>
                    <div className='d-flex flex-row align-items-center justify-content-center flex-wrap'>
                        {search.length===0 && tabs.map((tab) => (
                            (tab.title != 'tabster') &&
                            <GroupTabCard
                                key={tab.id}
                                tab={tab}
                                port={port}
                                groups={groups}
                                refreshTabs={getAllGroups}
                                groupID={groupID}
                            />
                        ))}
                        {search.length>0 && searchTabs.map((tab) => (
                            (tab.title != 'tabster') &&
                            <GroupTabCard
                                key={tab.id}
                                tab={tab}
                                port={port}
                                groups={groups}
                                refreshTabs={getAllGroups}
                                groupID={groupID}
                            />
                        ))}
                    </div>
                </div>
                {/* <div className='mt-2'>
                    <button className="button-85" role="button" onClick={createNewTab}><i className='fa-sharp-duotone fa-solid fa-plus'></i></button>
                    <button className="button-85" role="button" onClick={createIncognitoTab} style={{ marginLeft: "6px" }}><i className='fa fa-user-secret' aria-hidden="true"></i></button>
                </div> */}
            </div>
        </div>)
}

