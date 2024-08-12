# CHAT client

This is a training project to implement a real-time communication program.

## Technologies

axios
emoji-picker-react
npm
react
react-dom
react-hook-form
react-redux
react-router-dom
react-scripts
redux
redux-thunk
reselect
sass
socket.io-client
web-vitals

## main

first of all, on the main page the data collection component NAME ROOM is created

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

# communication socket.io front-end & back-end
    
updating data, receiving and creating messages, updating and output


    const socket = io.connect('https://server-chat-3b6n.onrender.com');

 

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

display messages if there are any

      const Messages = ({ messages = [], name }) => {

    return (
        <div className={chat.messageContainer}>
            {messages && messages.length > 0 && messages.map(({ user, message }, i) => {
                const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase();
                const className = itsMe ? chat.me : chat.user;
                console.log(className);
                return (
                    <div key={i} className={`${chat.messageItem} ${className}`}>
                        <span>{user.name}</span>
                        <p className={chat.text}>{message}</p>
                    </div>
                );
            })}
        </div>
    );
      }

    export default Messages;

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.



### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

ool wouldn't be useful if you couldn't customize it when you are ready for it.
