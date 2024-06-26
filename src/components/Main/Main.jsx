import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form'
import main from './Main.scss'
import { NavLink } from 'react-router-dom'


//---------------------data
const FIELDS = {
    NAME: "name",
    ROOM: "room"
}
//---------------------data



const Main = () => {
    //---------------------------------------

    const { NAME, ROOM } = FIELDS

    const [values, setValue] = useState({ [NAME]: '', [ROOM]: '' })
    console.log(values);
    //----------------handle
    const handleClick = (e) => {
        const isDisabled = Object.values(values).some(value => !value)
        if (isDisabled) e.preventDefault()
    }

    const handleChange = ({ target: { value, name } }) => {
        setValue({ ...values, [name]: value })
    }
    //----------------handle

    //---------------------------------------

    return (
        <>
            <section className="loaginPage">
                <div className="loaginPageContainer">
                    <div className="loaginHeading">
                        <h1 className="loaginTitle">Join Chat</h1>

                    </div>
                    {/* ----------------------------- form*/}
                    <form className='form' >
                        <div className="BoxInputName">
                            <p className="TextInputName">Name</p>
                            <input type="text" name='name' value={values[NAME]} placeholder='name' onChange={handleChange} required />
                        </div>
                        <div className="BlockInputRoot">
                            <p className="TextInputPassword">Password</p>
                            <input type="text" name='room' value={values[ROOM]} placeholder='room' onChange={handleChange} required />
                        </div>

                        <NavLink to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`} onClick={handleClick} >
                            <button className='btnForm' type='submit'>Join</button>
                        </NavLink>
                    </form>
                    {/* ----------------------------- form*/}

                </div>
            </section>
        </>
    )
}

export default Main;