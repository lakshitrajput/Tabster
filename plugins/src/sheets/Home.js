import React, { useEffect, useState } from 'react'
import Card from '../components/Card'

export const Home = () => {
    const [tabs, setTabs] = useState([]);

    useEffect(() => {
        chrome.tabs.query({}, (tabs) => {
            setTabs(tabs);
            // console.log(tabs)
        })

    }, [])


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
                    {tabs.map((tab) => (
                        (tab.title != 'tabster') &&
                            <Card 
                                key={tab.id}
                                tab={tab}
                            />
                    ))}
                </div>
            </div>
            <div className='mt-2'>
                    <button className="button-85" role="button">Add Tab</button>
            </div>
        </div>
    </div>)
}

