import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  PaperAirplaneIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import Moment from "react-moment";
import ScrollToBottom from "react-scroll-to-bottom";

import Layout from "../components/Layout";
import { getApi, postApi } from "../Api";
import Spinner from "../components/Spinner";
// import { v4 as uuidv4 } from "uuid";
import VideoCall from "../components/VideoCall";
import { useSelector } from "react-redux";

const Messages = () => {
  const [user, setUser] = useState({});
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [calling, setCalling] = useState(false);
  const { id } = useParams();

  const { auth } = useSelector((state) => state.auth);

  // const navigate = useNavigate();

  useEffect(() => {
    try {
      const getUser = async (id) => {
        const { data } = await getApi(`/users/${id}`);

        if (data.success) {
          setLoading(false);
          return setUser(data.message);
        }
      };

      const getMessages = async (id) => {
        const { data } = await getApi(`/messages/${id}`);

        if (data.success) {
          return setMessages(data.message);
        }
      };
      getUser(id);
      getMessages(id);
    } catch (error) {}
  }, [id]);

  const submit = async () => {
    const { data } = await postApi(`/messages`, {
      text,
      recipient: user?._id,
    });
    if (data.success) {
      setMessages([...messages, data.message]);
      setText("");
    }
  };

  const videoCall = () => {
    return setCalling(true);
    // return navigate(`/video/${uuidv4()}/${user?._id}`);
  };
  return loading ? (
    <Spinner />
  ) : calling ? (
    <VideoCall auth={auth} recipient={user} />
  ) : (
    <Layout>
      <div className="flex-1 w-full   px-2 max-w-[500px] mx-auto md:max-w-[500px] h-full items-center md:items-start  md:mt-10  flex   sm:px-6  ">
        <div className="conversations w-full border border-gray-700">
          <div className="conversations-header flex justify-between items-center p-3 bg-slate-900 w-full">
            <div className="flex  items-center">
              <img
                alt={user?.name}
                src={user?.avatar}
                className="w-[45px] h-[45px] rounded-full"
              />
              <span className="text-lg ml-4">{user?.name}</span>
            </div>
            <div>
              <VideoCameraIcon
                className="w-7 cursor-pointer"
                onClick={() => videoCall()}
              />
            </div>
          </div>
          <ScrollToBottom
            className="conversation-body h-[365px]  w-full "
            initialScrollBehavior={"smooth"}
          >
            {messages?.map((message) => (
              <div className="w-full" key={message?._id}>
                {message.recipient === user?._id ? (
                  <div className="w-full  flex flex-col items-end">
                    <span className="m-2 py-1 max-w-[75%] bg-yellow-500  px-2 rounded-md text-gray-900">
                      {message.text}
                    </span>
                    <span className="text-xs -mt-2 mr-5">
                      <Moment format="hh:mm a">{message.createdAt}</Moment>
                    </span>
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-start">
                    <span className="m-2 max-w-[75%] py-1 px-2 rounded-md text-white bg-slate-900">
                      {message.text}
                    </span>
                    <span className="text-xs -mt-2 ml-5">
                      <Moment format="hh:mm a">{message.createdAt}</Moment>
                    </span>
                  </div>
                )}
              </div>
            ))}
          </ScrollToBottom>
          <div className="conversation-footer bg-slate-900 flex items-center h-[60px] px-2 ">
            <textarea
              type="text"
              placeholder="send message .."
              className="flex-1 bg-inherit py-3 text-lg outline-none h-full "
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />{" "}
            <PaperAirplaneIcon
              className="w-7 cursor-pointer"
              onClick={() => submit()}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
