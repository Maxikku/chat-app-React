import React, {useEffect, useState} from "react";
import "./Chat.css"
import Avatar from "@material-ui/core/Avatar";
import {IconButton} from "@material-ui/core";
import {AttachFile, MoreVert, SearchOutlined} from "@material-ui/icons";
import db from "../../firebase";
import {useParams} from "react-router-dom";
import {useStateValue} from "../../StateProvider";
import firebase from "firebase";


function Chat() {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("")
    const {userId} = useParams();
    const [userName, setUserName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    const [error, setError] = useState(undefined)
    const [data, setData] = useState(undefined)

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
        if (userId) {
            db.collection("users").doc(userId).onSnapshot(snapshot => (
                setUserName(snapshot.data().name)
            ))
            db.collection('users').doc(userId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot =>
                setMessages(snapshot.docs.map((doc) => doc.data()))
            )
        }
    }, [userId])


    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const getJoke = async () => {
        const response = await fetch('https://api.chucknorris.io/jokes/random')
        const {value} = await response.json().catch(error => setError(error));
        db.collection('users').doc(userId).collection('messages').add({
            message: value,
            name: userName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        console.log("You typed >>>", input);
        db.collection('users').doc(userId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
        sleep(3000).then(value => getJoke());
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat_headerInfo">
                    <h3>{userName}</h3>
                    <p>Last seen {" "}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map((message) => (
                    <p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>
                        <span className='chat_name'>

                        </span>
                        {message.message}
                        <span className="chat_time">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}

            </div>
            <div className="chat_footer">
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message"
                           type="text"/>
                    <button onClick={sendMessage} type="submit">Send message</button>
                </form>
            </div>
        </div>
    );
}

export default Chat
