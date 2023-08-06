import React from "react";

const CallNotification = ({ caller, room, auth }) => {
  return (
    <div className="w-full h-screen relative top-0  bg-slate-900">
      <div className="absolute top-0 w-full h-full z-40">
        <div className="flex justify-center items-center">
          <div>
            <h1>Incoming call from {caller?.name}</h1>
            <div className="flex">
              <button className="p-2 bg-green-500">Accept</button>
              <button className="p-2 bg-red-400">Reject</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallNotification;
