import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import GroupCard from '../components/GroupCard';
import RecentTabs from '../components/RecentTabs';
import { Loader } from '../components/Loader';

export const Home = () => {
    const [tabs, setTabs] = useState([]);
    const [searchTabs,setSearchTabs]=useState([])
    const [groups, setGroups] = useState([]);
    const [recentTabs, setRecentTabs] = useState([]);
    const port = chrome.runtime.connect({ name: "popup" });
    const [search,setSearch]=useState('')
    const [loading,setLoading]=useState(false)
    const getAllGroups = async () => {
        setLoading(true)
        const authToken = localStorage.getItem('authToken');
        const res = await fetch('http://localhost:4000/api/group', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
        });
        const response = await res.json();
        setGroups(response.groups);
        setLoading(false)
    }


    useEffect(()=>{
        handleSearch();
    },[search])
    
    const handleSearch=async()=>{
        if(search.length>0){
            const filteredTabs = tabs.filter(
                (tab) =>
                    tab.title.toLowerCase().includes(search.toLowerCase()) ||
                    tab.url.toLowerCase().includes(search.toLowerCase())
            );
            setSearchTabs(filteredTabs);
        }else{
            setSearchTabs([])
        }
    }
   



    useEffect(() => {
        getAllTabs();
        getAllGroups();
        getClosedTabs();

        // to prevent the port becoming inactive after some time
        const interval = setInterval(() => {
            port.postMessage({ action: "ping" });
        }, 10000);

        return () => clearInterval(interval);
    }, [])


    useEffect(() => {
        port.onMessage.addListener((res) => {
            const action = res.action;
            if (action == 0) {
                setTabs(res.data);
            }
            else if (action == 11) {
                setRecentTabs(res.tabs);
            }
        });

        return () => port.onMessage.removeListener();
    }, [port])

    // request to background.js for tabs
    const getAllTabs = () => {
        const msg = {
            action: 0
        }
        port.postMessage(msg);
    }

    const createNewTab = () => {
        const msg = {
            action: 5
        }
        port.postMessage(msg);
    }

    const createIncognitoTab = () => {
        const msg = {
            action: 7
        }
        port.postMessage(msg);
    }

    const getClosedTabs = () => {
        const msg = {
            action: 11
        }
        port.postMessage(msg);
    }

    return (
        <>
            {localStorage.getItem('authToken') ?

                <div className='home'>
                    <div className='home-content'>

                        <div className='mt-2 mb-5' >
                            <div className="box">
                                {/* <form name="search"> */}
                                    <input type="text" className="input" name="txt"
                                        // onMouseOut={(e) => {
                                        //     e.target.value = ''
                                        //     e.target.blur()
                                        // }}
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value)
                                        }}
                                    />
                                {/* </form> */}
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                        <div style={{ position: "absolute", left: "10px", top: "10px" }}>
                            <div className="dropdown dropdown-hover">
                                <button data-mdb-button-init data-mdb-ripple-init data-mdb-dropdown-init
                                    className="border-0 dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-mdb-toggle="dropdown" aria-expanded="false">
                                    Recent Tabs
                                </button>
                                <ul className="dropdown-menu dropdown-menu-hover" aria-labelledby="dropdownMenuButton" style={{ width: "300px" }}>
                                    {recentTabs.length > 0 ? (
                                        recentTabs.map((tab, index) => (
                                            <RecentTabs key={index} tab={tab} port={port} />
                                        ))
                                    ) : (
                                        <li>No recent tabs</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className='d-flex flex-row align-items-center justify-content-center flex-wrap' >
                            {loading && <div className='bg-dark text-light p-2 mb-3'>
                                    Connecting Server   <Loader />
                            </div>}

                                {groups.map((group) => (
                                    <GroupCard color={group.colour} name={group.name} key={group._id} id={group._id} />
                                ))}
                            </div>
                            <div className='d-flex flex-row align-items-center justify-content-center flex-wrap' >
                                {search.length==0 && tabs.map((tab) => (
                                    (tab.title != 'tabster') &&
                                    <Card
                                        key={tab.id}
                                        tab={tab}
                                        port={port}
                                        groups={groups}
                                    />
                                ))}
                                {searchTabs.length>0 && searchTabs.map((tab) => (
                                    (tab.title != 'tabster') &&
                                    <Card
                                        key={tab.id}
                                        tab={tab}
                                        port={port}
                                        groups={groups}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='mt-2'>
                            <button className="button-85" role="button" onClick={createNewTab}><i className='fa-sharp-duotone fa-solid fa-plus'></i></button>
                            <button className="button-85" role="button" onClick={createIncognitoTab} style={{ marginLeft: "6px" }}><i className='fa fa-user-secret' aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div> :
                <div className='home'>
                    <div className='home-content'>
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <h1 className='text-warning'>Tabster</h1>
                            <p className="lead fw-normal mb-0 me-3 text-secondary">Where Tabs Meet Innovation</p>
                            <p className="lead fw-normal mb-0 me-3 text-primary">Please Register/Login to continue...</p>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

