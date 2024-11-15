import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import GroupCard from '../components/GroupCard';
import RecentTabs from '../components/RecentTabs';
import { Loader } from '../components/Loader';
import JoinGroupModal from '../components/JoinGroupModal';
import { Link } from 'react-router-dom';

export const Home = () => {
    const [tabs, setTabs] = useState([]);
    const [searchTabs,setSearchTabs]=useState([])
    const [groups, setGroups] = useState([]);
    const [recentTabs, setRecentTabs] = useState([]);
    const port = chrome.runtime.connect({ name: "popup" });
    const [search,setSearch]=useState('')
    const [loading,setLoading]=useState(false)
    const [showJoinGroup, setShowJoinGroup] = useState(false);
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

   
    useEffect(()=>{
      getAllGroups();
    },[showJoinGroup])



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

    useEffect(()=>{
        if(localStorage.getItem("authToken")){
            chrome.storage.local.set({ authToken: localStorage.getItem("authToken") }, function () {
                console.log("authToken is saved.");
            });
        }
    },[localStorage.getItem("authToken")])
  
    return (
        <>
            {localStorage.getItem('authToken') ?
                <div>
                {showJoinGroup ? <JoinGroupModal setShowJoinGroup={setShowJoinGroup}/> :
                <div className='home'>
                    <div className='home-content'>
                        <div style={{position:"absolute" , right:"10px", top:"10px"}}>
                        <Link className='button-85' to="/chart"><i className="fa-solid fa-chart-line"></i></Link>
                        </div>
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
                                            tab.title !== 'tabster' && <RecentTabs key={index} tab={tab} port={port} />
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

                                {groups.length > 0 && groups.map((group) => (
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
                                        refreshGroup={getAllGroups}
                                    />
                                ))}
                                {searchTabs.length>0 && searchTabs.map((tab) => (
                                    (tab.title != 'tabster') &&
                                    <Card
                                        key={tab.id}
                                        tab={tab}
                                        port={port}
                                        groups={groups}
                                        refreshGroup={getAllGroups}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='mt-2'>
                            <button className="button-85" role="button" onClick={createNewTab}><i className='fa-sharp-duotone fa-solid fa-plus'></i></button>
                            <button className="button-85" role="button" onClick={createIncognitoTab} style={{ marginLeft: "6px" }}><i className='fa fa-user-secret' aria-hidden="true"></i></button>
                            <button className="button-85" role="button" onClick={()=>setShowJoinGroup(true)} style={{ marginLeft: "6px" }}><i className="fa-solid fa-user-group"></i></button>
                        </div>
                    </div>
                    </div>}
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

