import React, {useEffect, useRef} from 'react';


const VideoPlayer = ({videoId}) => {
    const videoRef = useRef(null);
    useEffect(() => {
        if(videoRef.current){
            videoRef.current.pause()
            videoRef.current.removeAttribute('src')
            videoRef.current.load()
        
        }
    })
  return (
    <div>
        <video ref={videoRef} width='320' height='240' controls autoPlay>
            <source src={`http://localhost:4000/video/${videoId}`} type='video/mp4'></source>
            Your Browser does not support this video
        </video>
    </div>
  )
}

export default VideoPlayer