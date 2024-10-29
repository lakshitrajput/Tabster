import React from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'

const App = () => {

    return (<div>
        Hello World
    </div>)
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
