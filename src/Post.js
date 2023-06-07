import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import './Post.css';
import Avatar from '@mui/material/Avatar'
import firebase from 'firebase/compat/app';

function Post({ postId, user, username, caption, imageUrl }) { //userはサインインしているユーザ、usernameは投稿をしたユーザ
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState(''); //入力されるコメントの管理
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    
    db.collection("posts").doc(postId).collection("comments").add({ //postsコレクション→特定の投稿→commentsコレクション
      text: comment,
      username: user.displayName, //サインインしているユーザの名前がコメントをしたユーザとして記録
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('');
  }

  return (
    <div className="post">
        <div className="post__header">
            <Avatar
                className="post__avatar"
                alt={username}
                src="/static/images/avatar/1.jpg"
            />
            <h3>{username}</h3>
            {/* header -> avatar + username */}
         </div>

        <img className="post__image" src={imageUrl} />
        {/* image */}

        <h4 className="post__text"><strong>{username} </strong>{caption}</h4>
        {/* username + caption */}

        <div className="post__comments">
          {comments.map((comment) => (
            <p>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          ))}
        </div>

        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder='コメントを入力...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            投稿
          </button>
        </form>
    </div>
  )
}

export default Post