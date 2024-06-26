import React from 'react'
import app from './components/styles/App.module.scss'
import AppRoutes from './components/routers/AppRoutes'
import './null.css'

const App = () => {
    return (
        <div>
            <div className={app.container}>
                <AppRoutes />
            </div>

        </div>
    )
}

export default App;
