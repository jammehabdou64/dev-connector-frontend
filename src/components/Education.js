import React from "react";
import Moment from "react-moment";

const Education = ({
  school,
  degree,
  fieldofstudy,
  description,
  from,
  to,
  current,
}) => {
  return (
    <div className="title text-sm">
      <h4 className="font-semibold text-lg my-3">{school}</h4>
      <div className="mt-2">
        <span className="font-semibold">Degree:</span>{" "}
        <span className="px-2">{degree}</span>
      </div>
      <div className="mt-2">
        <span className="font-semibold">Field of study:</span>
        <span className="px-2">{fieldofstudy}</span>
      </div>
      <div className="mt-2">
        <span className="font-semibold">Description:</span>
        <span className="px-2">{description}</span>
      </div>
      <div className="mt-2">
        <span className="font-semibold">From:</span>
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

export default Education;
