import React, { useEffect, useRef } from "react";
import User from "../utils";
import { useSocket } from "../Provider/Socket";

const AnswerCall = ({ caller }) => {
  const { socket } = useSocket();
  const myVideo = useRef();
  const partnerVideo = useRef();
  useEffect(() => {
    const answer = async (caller) => {
      try {
        // console.log(caller);
        const stream = await User.getMedia();
        myVideo.current.srcObject = stream;
        let peer = await User.initiatePeer(stream, false, partnerVideo.current);
        await User.answerCall(peer, caller, socket);
      } catch (error) {
        console.log(error);
      }
    };
    answer(caller);
  }, [socket, caller]);
  return (
    <div className="h-screen w-full  bg-slate-900">
      <div className="flex h-full items-center">
        <div className="w-[450px] h-96 mx-auto  relative  top-0">
          <video
            className="my-video w-40 h-40 absolute -bottom-4 right-1"
            autoPlay
            ref={myVideo}
          ></video>
          <video
            className="partner-video w-full h-full "
            ref={partnerVideo}
            autoPlay
          ></video>
        </div>
      </div>
    </div>
  );
};

export default AnswerCall;
