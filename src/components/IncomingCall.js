import React, { useState } from "react";
import AnswerCall from "./AnswerCall";

const IncomingCall = ({ caller }) => {
  const [answer, setAnswer] = useState(false);
  return answer ? (
    <AnswerCall caller={caller} />
  ) : (
    <div className="w-full bg-white h-screen">
      <div className="flex flex-col h-full justify-center items-center">
        <h2 className="mb-6 font-semibold text-2xl">
          Incoming from {caller?.from?.name}
        </h2>
        <div className="flex gap-2">
          <button className="p-2 bg-red-600 text-white rounded-md ">
            Reject
          </button>
          <button
            className="p-2 bg-green-600 text-white rounded-md "
            onClick={() => setAnswer(true)}
          >
            Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;
