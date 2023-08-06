import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import { getApi } from "../Api";

const NotifyMessages = () => {
  const [messages, setMessage] = useState({});
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    try {
      const getMessages = async () => {
        const { data } = await getApi("/messages");
        if (data.success) {
          setMessage(data.message);
          setLoading(false);
        }
      };
      getMessages();
    } catch (error) {
      setLoading(false);
    }
  }, []);
  return isLoading ? (
    <Spinner />
  ) : (
    <Layout className="messages lg:pl-12 md:pl-10  lg:w-full flex-1 ">
      {messages.map((message, index) => (
        <Message
          key={index}
          id={message._id}
          recipient={message.recipient}
          sender={message.sender}
          text={message.text}
          seen={message.seen}
          createdAt={message.createdAt}
        />
      ))}
    </Layout>
  );
};

export default NotifyMessages;
