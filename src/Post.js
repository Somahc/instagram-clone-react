import React from 'react';
import './Post.css';

function Post() {
  return (
    <div className="post">
        <h3>Username</h3>
        {/* header -> avatar + username */}

        <img className="post__image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Johnrogershousemay2020.webp/1200px-Johnrogershousemay2020.webp" />
        {/* image */}

        <h4 className="post__text"><strong>Username </strong>caption</h4>
        {/* username + caption */}
    </div>
  )
}

export default Post