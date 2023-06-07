import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { storage, db } from './firebase';
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import './ImageUpload.css';


function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        console.log('0');
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //画像アップロードプログレスの関数
                console.log('1');
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                //エラーが起きたら、、、
                console.log('2');
                console.log(error);
                alert(error.message);
            },
            () => {
                //無事完了したら、、、
                console.log('3');
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //画像をDB内に投稿
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username //App.jsから取得
                        });

                        //アップロードが終わったらprogress, caption, imageをリセット
                        setProgress(0);
                        setCaption('');
                        setImage(null);
                    });
            }
        );
    };
    return (
        <div className="imageupload">
            <progress value={progress} max="100" />
            <input type="text" placeholder='説明文を入力...' onChange={event => setCaption(event.target.value)} value={caption} />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload