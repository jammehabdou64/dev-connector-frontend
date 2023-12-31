import React from "react";
import Moment from "react-moment";

const Comment = ({ text, user, createdAt }) => {
  return (
    <div className="flex flex-col   items-end px-3 mt-1">
      <div className="flex py-1 gap-2 items-center max-w-[88%]">
        <img
          width={40}
          height={30}
          src={user?.avatar}
          alt={user?.name}
          className="w-[30px] h-[30px] rounded-full"
        />
        <div className="bg-dark rounded-xl py-2  px-4">{text}</div>
      </div>
      <p className="text-xs -mt-1">
        <Moment format="DD-M-YYYY">{createdAt}</Moment>
      </p>
    </div>
  );
};

export default Comment;
