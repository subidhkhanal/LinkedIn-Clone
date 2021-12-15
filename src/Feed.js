import React, {useEffect, useState} from "react";
import "./Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import "./InputOption.css";
import InputOption from "./InputOption";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import Post from "./Post";
import firebase from "./firebase";
import {db} from "./firebase";

function Feed() {
    const [input, setInput] = useState("");
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        db.collection("posts").orderBy('timestamp', "desc").onSnapshot(snapshot => (
            setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }
            )))
        ));
    }, []);
    const sendPost = (e) => {
        e.preventDefault();

        db.collection('posts').add({
            name: 'subidh khanal',
            description: 'this is a test',
            message: input,
            photoURL: '',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
    };
    return (
        <div className="feed">
            <div className="feed_inputContainer">
                <div className="feed_input">
                    <CreateIcon/>
                    <form>
                        <input value={input} onChange={e => setInput(e.target.value)} type="text"/>
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>
                <div className="feed_inputOptions">
                    <InputOption Icon={ImageIcon} title='Photo' color="#70B5F9"/>
                    <InputOption Icon={SubscriptionsIcon} title='Video' color="#E7A33E"/>
                    <InputOption Icon={EventNoteIcon} title='Event' color="#C0CBCD"/>
                    <InputOption Icon={CalendarViewDayIcon} title='Write article' color="#7FC15E"/>
                </div>
            </div>
            {/* Posts */}
            {posts.map(({id, data: {name, description, message, photourl}}) => (
                <Post
                    key={id}
                    name={name}
                    description={description}
                    message={message}
                    photourl={photourl}
                />
            ))}


        </div>
    )
}

export default Feed;