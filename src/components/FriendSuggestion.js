import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { getApi, postApi } from "../Api";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const WidgetDisplay = ({ avatar, name, id }) => {
  return (
    <div className="user mt-2 py-2 flex gap-2 items-center justify-between ">
      <div className="flex items-center">
        <Link to={`/profile/${name?.replace(/\s/g, "-")}/${id}`}>
          <img
            src={avatar}
            alt="ww"
            className="w-[32px] h-[32px] rounded-full"
          />
        </Link>
        <span className="text-xs ml-2">{name?.substring(0, 12)}</span>
      </div>
      <button className="flex items-center  text-sm rounded-md text-yellow-600 ">
        <PlusIcon className="w-3" /> <span>add friend</span>
      </button>
    </div>
  );
};

const FindFriendDisplay = ({ avatar, name, id, addFriend, sentRequest }) => {
  return (
    <div className=" w-36 flex flex-col items-center py-2 shadow-sm bg-slate-900">
      <Link
        to={`/profile/${name?.replace(/\s/g, "-")}/${id}`}
        className="w-full flex justify-center"
      >
        <img src={avatar} alt="ww" className="w-20 h-20 rounded-full" />
      </Link>
      <div className="px-2 w-full my-1">
        <p className="text-sm text-center py-1 truncate my-1">{name}</p>
        <button
          className="w-full bg-yellow-600 text-gray-900 shadow-sm p-1"
          disabled={sentRequest}
          onClick={() => addFriend(id)}
        >
          {!sentRequest ? "Add friend" : "Request sent"}
        </button>
      </div>
    </div>
  );
};

const Friends = ({ widget = false }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [sentRequest, setSentRequest] = useState(false);
  useEffect(() => {
    try {
      const getUsers = async () => {
        const { data } = await getApi("/friends/find-friend");
        if (data.success) {
          setUsers(data.message);
        }
        setLoading(false);
      };

      getUsers();
    } catch (error) {
      setLoading(false);
    }
  }, []);
  const addFriend = async (id) => {
    try {
      const { data } = await postApi("/friend-request", {
        recipient: id,
      });
      if (data.success) {
        setSentRequest(true);
      }
    } catch (error) {}
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      <div className="w-full flex flex-wrap gap-3">
        {users.map((user, index) =>
          widget ? (
            <WidgetDisplay
              key={index}
              name={user.name}
              id={user?._id}
              avatar={user.avatar}
              addFriend={addFriend}
              sentRequest={sentRequest}
            />
          ) : (
            <FindFriendDisplay
              name={user.name}
              id={user?._id}
              avatar={user.avatar}
              addFriend={addFriend}
              key={index}
              sentRequest={sentRequest}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Friends;
