import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Widget from "./Widget";
import SmallMediaNav from "./SmallMediaNav";
import { useSocket } from "../Provider/Socket";
import { useSelector } from "react-redux";
import IncomingCall from "./IncomingCall";

const Layout = ({ children }) => {
  const { socket } = useSocket();
  const [incomingCall, setIncomingCall] = useState(false);
  const [callerInfo, setCaller] = useState({});

  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    socket.emit("user-join", auth?.user ? auth?.user : auth);
    socket.on("incoming-call", (data) => {
      // console.log();

      setCaller(data);
      setIncomingCall(true);
    });
  }, [socket, auth]);
  return incomingCall ? (
    <IncomingCall caller={callerInfo} />
  ) : (
    <div className="w-full h-screen bg-gray-850 font-blink overflow-y-scroll text-white ">
      <Header />
      <div className="max-w-6xl mt-10  mx-auto h-full">
        <div className="flex w-full justify-center gap-4 pt-6 mt-7 md:pt-6 h-full  md:px-16 lg:px-10">
          <Sidebar />
          <div className="h-full flex-1  w-full  mt-5  ">{children}</div>
          <Widget />
        </div>
      </div>
      <SmallMediaNav />
    </div>
  );
};

export default Layout;
