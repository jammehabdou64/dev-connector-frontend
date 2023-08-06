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
    <div className="w-full h-screen bg-gray-800 font-serif overflow-hidden text-white ">
      <Header />
      <div className="max-w-6xl px-2 mx-auto md:px-4 lg:px-12 h-full">
        <div className="flex justify-center lg:justify-between pt-6 mt-7 md:pt-6 h-full">
          <div className="lg:w-[30%] mt-5  md:w-[250px] hidden md:block ">
            <Sidebar />
          </div>
          <div className="h-full overflow-y-scroll w-full  sm:px-4 mt-5  md:w-[65%] lg:[39%] ">
            {children}
          </div>
          <div className="lg:w-[30%] mt-5 lg:block hidden">
            <Widget />
          </div>
        </div>
      </div>
      <SmallMediaNav />
    </div>
  );
};

export default Layout;
