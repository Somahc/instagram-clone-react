import './App.css';
import Post from './Post'

function App() {
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

    <Post username="Soma" caption="こいつ、動くぞ！" imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Johnrogershousemay2020.webp/1200px-Johnrogershousemay2020.webp"/>
    <Post username="Tim" caption="holy cow" imageUrl="https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fc47f6830-9292-11ed-b04f-b9bf191ef388.jpg?crop=5879%2C3919%2C0%2C0"/>
    <Post username="Ploops" caption="shoot" imageUrl="https://imagesvc.meredithcorp.io/v3/jumpstartpure/image/?url=https%3A%2F%2Fcf-images.us-east-1.prod.boltdns.net%2Fv1%2Fstatic%2F3281700261001%2F6a204d6b-0fe4-45c8-a63e-b2e09c11de32%2Fa13648d5-c0b9-4ded-8ecd-89aad8634e6c%2F1280x720%2Fmatch%2Fimage.jpg&w=640&h=360&q=90&c=cc"/>
    </div>
  );
}

export default App;
