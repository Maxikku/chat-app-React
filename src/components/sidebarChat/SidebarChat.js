import React, {useEffect, useState} from "react";
import './SidebarChat.css'
import {Avatar} from "@material-ui/core";
import db from "../../firebase";
import {Link} from "react-router-dom";
import firebase from "firebase";


function SidebarChat({id, name, addNewChat }) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if (id) {
            db.collection("users")
                .doc(id)
                .collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                );
        }
    }, []);

    useEffect(()=> {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = (e) => {
        e.preventDefault();
        const newChat = prompt("Please enter name for chat room");

        if (newChat) {
            db.collection('users').add({
                name: newChat,
            });
        }
    };

    return !addNewChat ? (
        <Link to={`/users/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat-info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>

    ): (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new Chat</h2>

        </div>
    );
}

export default SidebarChat
