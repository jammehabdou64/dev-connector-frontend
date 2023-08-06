import React, { useEffect, useRef } from "react";
// import Peer from "simple-peer";
import { useSocket } from "../Provider/Socket";
import User from "../utils";

const VideoCall = ({ recipient, auth }) => {
  const myVideo = useRef();
  const partnerVideo = useRef();
  const { socket } = useSocket();

  useEffect(() => {
    const calling = async () => {
      try {
        const stream = await User.getMedia();
        myVideo.current.srcObject = stream;
        let peer = await User.initiatePeer(stream, true, partnerVideo.current);
        const currentUser = auth?.user ? auth?.user : auth;
        await User.Videocall(peer, recipient, currentUser, socket);
      } catch (error) {
        console.log(error);
      }
    };

    calling();
  }, [socket, auth, recipient]);

  return (
    <div className="h-screen w-full  bg-slate-900">
      <div className="flex h-full items-center">
        <div className="w-[450px] h-96 mx-auto  relative  top-0">
          <video
            className="my-video w-40 h-40 absolute -bottom-4 right-0"
            autoPlay
            ref={myVideo}
          ></video>
          <video
            className="partner-video w-full h-full"
            ref={partnerVideo}
            autoPlay
          ></video>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
