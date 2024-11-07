import React from 'react'

export default function RecentTabs() {
  return (
      <li>
          <a className="dropdown-item" href="#">
              <div className='d-flex flex-row w-100' style={{ width: "100%", height: "50px" }}>
                  <div style={{ width: "50px", height: "50px" }}>
                      <img src='https://workona.com/_next/static/media/tab-manager-hero.f3b46089.png' style={{ width: "50px", height: "50px" }}></img>
                  </div>
                  <div className='d-flex flex-column p-2'>
                      <div className='text-start' style={{ width: "100%" }}>Tab 1</div>
                      <p className='text-primary' style={{ fontSize: "10px" }}>www.google.com</p>
                  </div>
              </div>
          </a>
      </li>
  )
}
