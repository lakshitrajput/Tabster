import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './options.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Auth from '../sheets/Auth';
import Success from '../sheets/Success';


const App = () => (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
