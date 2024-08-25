import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, } from 'react-router-dom';
import io from 'socket.io-client';
import smile from './../../img/smile.svg'
import chat from './Chat.module.scss'
import EmojiPicker from 'emoji-picker-react'
import Messages from './Messages';

const socket = io.connect('https://server-chat-beta-one.vercel.app/');

const Chat = () => {

    //-------------------------------------------
    const { search } = useLocation();
    const [params, setParams] = useState({ room: '', user: '' });
    const [state, setState] = useState([]);
    const [message, setMessage] = useState('')
    const [isOpen, setOpen] = useState(false)
    const [users, setUsers] = useState(0)
    const navigate = useNavigate()
    //----------------------------------------------  
    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search));
        setParams(searchParams);

        socket.emit('join', searchParams);
    }, [search]);

    useEffect(() => {
        socket.on('message', ({ data }) => {
            setState((_state) => ([..._state, data]));
            console.log('data:', data);
        });

    }, []);

    useEffect(() => {
        socket.on('joinRoom', ({ data: { users } }) => {
            setUsers(users.length);
        });
    }, []);
    console.log('state:', state);
    //--------------------------------------------------

    const leftThisRoom = () => {
        socket.emit('leftRoom', { params })
        navigate('/')
    }
    const onEmojiClick = ({ emoji }) => setMessage(prevMessage => prevMessage + emoji);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!message) return;
        socket.emit('sendMessage', { message, params })
        setMessage('')
    }
    //--------------------------------------------------



    return (
        <>
            <div className={chat.wrapper}>
                <div className={chat.bodyChat}>
                    <header className={chat.header}>
                        <div className={chat.headerContainer}>
                            <h1 className={chat.headerTitle}>{params.room}</h1>
                            <p className={chat.headerUsers}>
                                {users} users in this room
                            </p>
                            <button className={chat.leftRoom} onClick={leftThisRoom}>left this room</button>
                        </div>
                    </header>
                    <div className={chat.chatBody}>
                        <Messages messages={state} name={params.name} />
                    </div>
                    {/* ----------------------------- form*/}
                    <form className={chat.form} onSubmit={handleSubmit} >
                        <div className={chat.BoxInputMessage}>
                            <input
                                className={chat.ChatInput}
                                type="text"
                                name="message"
                                placeholder="your message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />

                        </div>
                        <div className={chat.ChatEmojies}>
                            <div className={chat.boxImage}>
                                <img src={smile} alt="smile" onClick={() => setOpen(!isOpen)} />
                            </div>
                            {isOpen && (
                                <div className={chat.emojiBlock}>
                                    <EmojiPicker onEmojiClick={onEmojiClick} />
                                </div>
                            )}
                        </div>
                        <button className={chat.btnFormChat} onSubmit={handleSubmit} type='submit'>Send a message</button>

                    </form>
                    {/* ----------------------------- form*/}
                </div>
            </div>

        </>
    );
};

export default Chat;
