import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import './Post.css';
import Avatar from '@mui/material/Avatar'

function Post({ postId, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState(''); //入力されるコメントの管理
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {

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