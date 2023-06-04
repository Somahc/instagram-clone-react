import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post'
import { db, auth } from './firebase'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input'


function App() {
  const [posts, setPosts] = useState([]);

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((authUser) => { //ユーザーがログイン、ログアウト、登録などユーザーに関するものに更新があるたびに発火
    if (authUser) {
      //ユーザーがログイン
      console.log(authUser);
      setUser(authUser);

    } else {
      //ユーザーがログアウト
      setUser(null);
    }
  })

  return () => {
    //cleanupを実行
    unsubscribe();
  }
}, [user, username]);

//useEffectは特定の変数に変更が加えられる度に実行する処理
useEffect(() => {
  db.collection('posts').onSnapshot(snapshot => {
    // onSnapshotにより投稿が追加される度、以下の処理が実行される
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id, //投稿一つ一つにつけられるIDを取得（IDはFirebase上でみれる）
      post: doc.data() //投稿一つ一つのデータ（今回はusername, caption, imageUrl）を取得
    })));
  })
}, []);

const signUp = (event) => {
  event.preventDefault();
  
  auth
  .createUserWithEmailAndPassword(email, password)
  .then((authUser) => {
    return authUser.user.updateProfile({
      displayName: username
    })
  })
  .catch((error) => alert(error.message))
}
  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>SIGN UP</Button>
          </form>
        </Box>
      </Modal>
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
      {user ? (
        <Button onClick={() => auth.signOut()}>LOG OUT</Button>
      ) : (
        <Button onClick={() => setOpen(true)}>SIGN UP</Button>
      )}
    <h1>HELLO WORLD</h1>

    {
      posts.map(({id, post}) => (
        <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} /> //isをKeyとして用いることでPostsが更新されたときにすべてをレンダリングし直すのではなく、荒棚に追加されたものだけレンダリングするようになる
      ))
    }
    </div>
  );
}

export default App;
