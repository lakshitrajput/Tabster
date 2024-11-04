import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './popup.css'
import { Home } from '../sheets/Home'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Group } from '../sheets/Group';


const App = () => (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      <Route path="/group/:id" element={<Group/>} />
      </Routes>
    </Router>
  );
  

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
