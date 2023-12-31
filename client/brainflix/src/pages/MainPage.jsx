import React, { useState, useEffect } from 'react';
import axios from 'axios';
import viewslogo from '../Assets/Icons/views.svg';
import likeslogo from '../Assets/Icons/likes.svg';
import '../assets/styles/main.scss'
import NavComponent from '../assets/components/nav'







const MainPage = () => {
  const [videoDetails, setVideoDetails] = useState({});
  const [videosData, setVideosData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({
    id: "",
    title: "",
    channel: "",
    image: '',
    likes: 0,
    views: 0,
    timestamp: 0,
  });
useEffect(() => {
    axios.get('/videos')
      .then((response) => {
        const data = response.data;
        console.log(data)
        if (data.length > 0) {
          const sortedData = data.sort((a, b) => a.timestamp - b.timestamp);
          setVideosData(sortedData);
          setSelectedVideo(sortedData[0]);
          
          axios.get(`/videos/${sortedData[0].id}`)
            .then((response) => {
              const videoDetailsData = response.data; 
              setSelectedVideo((prevSelectedVideo) => ({
                ...prevSelectedVideo,
                likes: videoDetailsData.likes,
                views: videoDetailsData.views,
                timestamp: videoDetailsData.timestamp,
              }));
              setVideoDetails(videoDetailsData);
              setVideoComments(videoDetailsData.comments);
            })
            .catch((error) => {
              console.error("Error fetching video details:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      }); 
  }, []);

  const [videoComments, setVideoComments] = useState([]);
  const [newName, setNewName] = useState('');
  const [newCommentText, setNewCommentText] = useState("");
  const updateVideoDetails = (videoId) => {
    axios.get(`/videos/${videoId}`)
      .then((response) => {
        const videoDetailsData = response.data;
        

        setSelectedVideo((prevSelectedVideo) => ({
          ...prevSelectedVideo,
          likes: videoDetailsData.likes,
          views: videoDetailsData.views,
          timestamp: videoDetailsData.timestamp,
        }));

        setVideoDetails(videoDetailsData);
        setVideoComments(videoDetailsData.comments);
      })
      .catch((error) => {
        console.error("Error fetching video details:", error);
      });
  };
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    updateVideoDetails(video.id);
  };
  

  const formatDate = (timestamp) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };

  const addComment = () => {
    if (!newName || !newCommentText) {
      return;
    }

    const newComment = {
      image: "/Assets/Images/Mohan-muruge.jpg",
      name: newName,
      datePosted: "posted Now",
      comment: newCommentText,
    };

    setVideoComments([...videoComments, newComment]);
    setNewName('');
    setNewCommentText('');
  };


  return (
    
    <div className="video">
      <div className="video__main">
        <video controls width="100%" poster={selectedVideo.image}>
          <source src={selectedVideo.videoUrl} type="video/mp4" />
        </video>
        </div>
        <div className="wrapper">
        <div className="description">
          <div className="description__info">
            <h2>{selectedVideo.title}</h2>
            <span>By: {selectedVideo.channel}</span>
            <p><img src={viewslogo}></img>Views: {selectedVideo.views}</p>
            <p>{formatDate(selectedVideo.timestamp)}</p>
            <p><img src={likeslogo}></img>Likes: {selectedVideo.likes}</p>
            <div>{selectedVideo.description}</div>
          </div>
        </div>
        <div className="comment">
          <h3>JOIN THE CONVERSATION</h3>
          <div className="comment__form">
            <div className="comment__form--name">
              <input type="text" id="name" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Your Name" />
            </div>
            <div className="comment__form--text">
              <textarea id="comment" value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} placeholder="Add a comment"></textarea>
            </div>
          </div>
          <button id="submit" onClick={addComment}>COMMENT</button>
        </div>
        <div className="comment__container">
        {videoComments.map((comment, index) => (
          <div key={index} className="comment__container--item">
            <h3>{comment.name}</h3>
            <h4>{comment.datePosted}</h4>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
      <div className="videolist">
  {videosData
    .filter(video => video.id !== selectedVideo.id)
    .map((video) => (
      <div key={video.id} className="videolist__item" onClick={() => handleVideoSelect(video)}>
        <img src={video.image} alt={video.title} />
        <p className="title">{video.title}</p>
        <p className="artist">{video.artist}</p>
      </div>
    ))}
</div>



      </div>
    </div>
  );
};

export default MainPage;
