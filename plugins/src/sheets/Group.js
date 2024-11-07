import React, { useEffect, useState } from 'react'
import GroupTabCard from '../components/GroupTabCard';
import { useParams } from 'react-router-dom';

export const Group = () => {
    const groupID=useParams().id;

    const [tabs, setTabs] = useState([]);
    const [groups, setGroups] = useState([]);
    const port = chrome.runtime.connect({ name: "popup" });

    const getAllGroups = async () => {
        const authToken = localStorage.getItem('authToken');
        const res = await fetch('http://localhost:4000/api/group', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
        });
        const response = await res.json();
        setGroups(response.groups);


        const currGroup=response.groups.find((group)=>group._id===groupID);
        setTabs(currGroup.tabs);        

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



    return (
        <div className='home w-100'>
            <div className='home-content w-100'>
                <div className='mt-2 mb-5'>
                    <div className="box">
                        <form name="search">
                            <input type="text" className="input" name="txt"
                                onMouseOut={(e) => {
                                    e.target.value = ''
                                    e.target.blur()
                                }}
                            />
                        </form>
                        <i className="fas fa-search"></i>
                    </div>
                </div>
               
                <div className='w-100 d-flex align-items-center p-2' style={{justifyContent:"space-between"}}>
                <button className="button-85" role="button" onClick={() => window.history.back()}>Back</button>
                <button className="button-85 bg-danger" role="button" >Ungroup</button>
                </div>
                <div>
                    <div className='d-flex flex-row align-items-center justify-content-center flex-wrap'>
                        {tabs.map((tab) => (
                            (tab.title != 'tabster') &&
                            <GroupTabCard
                                key={tab.id}
                                tab={tab}
                                port={port}
                                groups={groups}
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

