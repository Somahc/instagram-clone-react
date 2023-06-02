import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post'
import { db } from './firebase'

function App() {
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="App">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
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
