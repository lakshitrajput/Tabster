import React from 'react';

export default function RecentTabs({ tab, port }) {
  const restoreTab = () => {
    const msg = {
      action: 12,
      tab: tab
    }
    port.postMessage(msg);
    window.close();
  }


  return (
    <li>
      <a className="dropdown-item" href="#">
        <div className="d-flex flex-row align-items-center w-100" style={{ width: "100%", height: "50px" }} onClick={restoreTab} >
          {/* Uncomment this div to include the favicon */}
          {/* <div style={{ width: "50px", height: "50px", flexShrink: 0 }}>
            <img src={tab.favIconUrl} alt="favicon" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div> */}
          <div className="d-flex flex-column p-2" style={{ overflow: "hidden", width: "calc(100% - 50px)" }}>
            <div className="text-start" style={{
              width: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "14px" // Optional: adjust font size as needed
            }}>
              {tab.title}
            </div>
            <p className="text-primary" style={{
              fontSize: "10px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              margin: 0
            }}>
              {tab.url}
            </p>
          </div>
        </div>
      </a>
    </li>
  );
}
