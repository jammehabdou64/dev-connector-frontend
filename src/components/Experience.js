import React from "react";
import Moment from "react-moment";

const Experience = ({ company, title, description, from, to, current }) => {
  return (
    <div className="title text-sm">
      <h4 className="font-semibold text-lg my-3">{company}</h4>
      <div className="mt-2">
        <span className="font-semibold">Position:</span>{" "}
        <span className="px-2">{title}</span>
      </div>
      <div className="mt-2">
        <span className="font-semibold">Description:</span>
        <span className="px-2">{description}</span>
      </div>
      <div>
        <span className="font-semibold mt-1">From:</span>
        <span className="px-2">
          <Moment format="DD-M-YYYY">{from}</Moment>
        </span>
      </div>
      {!current ? (
        <div className="mt-2">
          <span className="font-semibold">To:</span>
          <span className="px-2">
            <Moment format="DD-M-YYYY">{to}</Moment>
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Experience;
