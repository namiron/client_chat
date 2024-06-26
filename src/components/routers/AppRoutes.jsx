import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from './Routes'
import Main from '../Main/Main'
import Chat from './../Chat/Chat'



const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path={ROUTES.start} element={<Main />}></Route>
                <Route path={ROUTES.chat} element={<Chat />}></Route>
            </Routes>

        </>
    )
}

export default AppRoutes
