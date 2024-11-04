import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import GroupCard from '../components/GroupCard';

export const Home = () => {
    const [tabs, setTabs] = useState([]);
    const [groups, setGroups] = useState([]);
    const port = chrome.runtime.connect({ name: "popup" });

    const getAllGroups = async() => {
        const authToken = localStorage.getItem('authToken');
        const res = await fetch('http://localhost:4000/api/group', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
        });
       const response=await res.json();
      setGroups(response.groups);        
    }


    useEffect(() => {
        getAllTabs();
        getAllGroups();

        // to prevent the port becoming inactive after some time
        const interval = setInterval(() => {
            port.postMessage({ action: "ping" });
        }, 10000); 

        return () => clearInterval(interval);
    }, [])

    
    useEffect(() => {
        port.onMessage.addListener((res) => {
            const action = res.action;
            if(action == 0){
                setTabs(res.data);
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


    return (
    <div className='home'>
        <div className='home-content'>
                {/* <div className="d-flex flex-column align-items-center justify-content-center">
                    <h1 className='text-warning'>Tabster</h1>
                    <p className="lead fw-normal mb-0 me-3 text-secondary">Where Tabs Meet Innovation</p>
                </div> */}
            <div className='mt-2 mb-5'>
                    <div className="box">
                        <form name="search">
                            <input type="text" className="input" name="txt"
                            onMouseOut={(e) => {
                                e.target.value=''
                                e.target.blur()
                            }}
                            />
                        </form>
                        <i className="fas fa-search"></i>
                    </div>
            </div>
            <div>
            <div className='d-flex flex-row align-items-center justify-content-center flex-wrap'>
            {groups.map((group) => (
                <GroupCard color={group.colour} name={group.name} key={group._id} id={group._id}/>
            ))}
            </div>
                <div className='d-flex flex-row align-items-center justify-content-center flex-wrap'>
                    {tabs.map((tab) => (
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
                    <button className="button-85" role="button" onClick={createIncognitoTab} style={{marginLeft: "6px"}}><i className='fa fa-user-secret' aria-hidden="true"></i></button>
            </div>
        </div>
    </div>)
}

