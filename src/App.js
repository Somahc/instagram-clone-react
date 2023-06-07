import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post'
import { db, auth } from './firebase'
import ImageUpload from './ImageUpload';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input'


function App() {
  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false);
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
  db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
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

  setOpen(false);//入力後モーダルを閉じる
}

const signIn = (event) => {
  event.preventDefault();

  auth
  .signInWithEmailAndPassword(email, password)
  .catch((error) => alert(error.message))

  setOpenSignIn(false);//入力後モーダルを閉じる
}
  return (
    <div className="App">

      <Modal //sign up用モーダル。ユーザネーム、メアド、パスワードを要求
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

      <Modal //sign in用モーダル（メアド、パスワードを要求）
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
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
            <Button type="submit" onClick={signIn}>SIGN IN</Button>
          </form>
        </Box>
      </Modal>
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        {user ? (
          <Button onClick={() => auth.signOut()}>LOG OUT</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>SIGN IN</Button>
            <Button onClick={() => setOpen(true)}>SIGN UP</Button>
        </div>
      )}
      </div>
    <h1>HELLO WORLD</h1>
    <div className="app__posts">
      {
        posts.map(({id, post}) => (
          <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} /> //idをKeyとして用いることでPostsが更新されたときにすべてをレンダリングし直すのではなく、荒棚に追加されたものだけレンダリングするようになる
        ))
      }
    </div>

    {user?.displayName ? ( //user.displayNameと書くとログインしてない際userがnullでエラーになってしまうので、user?とすることでuserが設定されていればdisplayNameを取得することができる
        <ImageUpload username={user.displayName}/>
      ): (
        <h3>投稿するにはログインする必要があります！</h3>
      )}
    </div>
  );
}

export default App;
