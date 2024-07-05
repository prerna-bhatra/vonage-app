/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OT from '@opentok/client';
import { useLocation } from 'react-router-dom';
import VitalsPage from './VitalsPage';

const VideoRoom = () => {

  const location = useLocation();
  const [attendees, setAttendees] = useState([]);
  const [meetingStarter, setMeetingStarter] = useState();
  const subscribedStreams = new Set();

  useEffect(() => {
    const initializeSession = async () => {
      try {
        // Fetch session credentials from your backend API
        const response = await axios.get(`https://communication-backend.azurewebsites.net/meeting/join/${location?.state?.meetingID}`);
        console.log({ response });
        const credentials = response.data;
        OT.setLogLevel(0);

        // Initialize OpenTok session
        const session = OT.initSession(credentials.apiKey, credentials.sessionId);
        const handleError = (error) => {
          if (error) {
            alert(error.message);
          }
        }

        // Create a publisher
        const publisher = OT.initPublisher('publisherContainer', {
          insertMode: 'off', // Change this to append
          width: '100%',
          height: '50%',
          name: "PRERNA BHATRA",
          style: {
            // buttonDisplayMode: 'off',
            // videoDisabledDisplayMode:'auto'

          }
        }, handleError);

        // Connect to the session
        session.connect(credentials.token, (error) => {
          if (error) {
            console.error('Error connecting to session:', error);
          } else {
            // Publish the publisher's stream to the session
            session.publish(publisher, (error) => {
              if (error) {
                console.error('Error publishing stream:', error);
              }
            });
          }
        });

        // Subscribe to a stream created by another client
        session.on('streamCreated', (event) => {

          if (!subscribedStreams.has(event.stream.streamId)) {
            subscribedStreams.add(event.stream.streamId);
            console.log("event.stream", event.stream);
            session.subscribe(event.stream, 'subscriberContainer', {
              insertMode: 'append', // Change this to append
              width: '50%',
              // height: '400px',
              name: "Antima Bhatra",
              style: {

                videoDisabledDisplayMode: 'auto'
              }
            }, handleError);
          }
        });
      } catch (error) {
        console.error('Error initializing video room:', error);
      }
    };

    initializeSession();
  }, [location?.state?.meetingID]);

  return (
    <div className='flex space-around mx-20' id="videos" >

      <div className='vitals w-1/2'>
        <VitalsPage />
      </div>


      {/* MEETING */}
      <div className=' w-1/2'>
        {/* MEETING STARTER */}
        <div id="publisherContainer"></div>
        <button >Leave Call</button>


        {/* Attendess */}
        <div
          id="subscriberContainer" className='video-subscriber flex'></div>


      </div>

    </div>
  );
};

export default VideoRoom;
