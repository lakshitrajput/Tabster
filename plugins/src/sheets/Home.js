import React from 'react'
import Card from '../components/Card'

export const Home = () => {

    return (
    <div className='home'>
        <div className='home-content'>
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <h1 className='text-warning'>Tabster</h1>
                    <p className="lead fw-normal mb-0 me-3 text-secondary">Where Tabs Meet Innovation</p>
                </div>
            <div className='mt-2 mb-5'>
                    <div class="box">
                        <form name="search">
                            <input type="text" class="input" name="txt" onmouseout="this.value = ''; this.blur();" />
                        </form>
                        <i class="fas fa-search"></i>
                    </div>
            </div>
            <div>
                <div className='d-flex flex-row align-items-center justify-content-center flex-wrap'>
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                </div>
            </div>
            <div className='mt-2'>
                    <button class="button-85" role="button">Add Tab</button>
            </div>
        </div>
    </div>)
}

