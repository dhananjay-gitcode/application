import React, { useEffect, useState, useRef } from 'react';
import Vimeo from '@vimeo/player';
import axios from 'axios';

const Subs = () => {
  const playerRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [playId, setPlayId] = useState('');
  const [hasSubscription, setHasSubscription] = useState(false); // Simulated subscription status
  const [player, setPlayer] = useState(null);

  // Function to check subscription status
  const checkSubscription = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/user/fetch');
      console.log(response);
      const ss = response.data[2].subscription;
      setHasSubscription(ss);
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  useEffect(() => {
    const apiUrl = 'http://localhost:9000/api/video/fetch';

    // Make the API call to fetch video data
    axios.get(apiUrl)
      .then((response) => {
        setVideos(response.data);
        const firstVideo = response.data[2]; // Assuming you want to play the first video
        setPlayId(firstVideo.videoUrl);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    checkSubscription();
  }, [playId]);

  useEffect(() => {

    if (playId && hasSubscription) {
      // Check the subscription status before creating the player
      const newPlayer = new Vimeo(playerRef.current, {
        url: `https://vimeo.com/${playId}`,
      });
      

      setPlayer(newPlayer);

      return () => {
        // Clean up the player when the component unmounts
        if (player) {
          player.destroy();
        }
      };
    }
  }, [playId, hasSubscription, player]);

  return (
    <div>
      {/* <div ref={playerRef}></div> */}
      {/* Display a thumbnail or message if the user does not have a subscription */}
      {hasSubscription ? (
        <div>
          <strong>Title</strong>
          <strong>Tags</strong>
        <div ref={playerRef}></div>

        </div>
      ) : (<div><img className='w-10 h-10' style={{ width: '100px', height: '100px' }} src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' />
          <p>Subscription not available</p>
          </div>
        )}
    </div>
  );
};

export default Subs;
