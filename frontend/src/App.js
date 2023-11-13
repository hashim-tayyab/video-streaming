import React, {useState} from 'react';
import VideoPlayer from './components/videoplayer/VideoPlayer';

function App(){
  const [videoId, setVideoId] = useState();
  function playVideo(e, videoId) {
    e.preventDefault();
    setVideoId(videoId);
  }
    return (
      <div className="App">
        {videoId && <VideoPlayer videoId={videoId}></VideoPlayer>}
        <br/>
        <button onClick={(e) => {playVideo(e, 'video1')}}>Video 1</button>
        <button onClick={(e) => {playVideo(e, 'video2')}}>Video 2</button>

      </div>
    );
  
}

export default App;
