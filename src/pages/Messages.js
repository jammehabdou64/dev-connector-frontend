import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Moment from "react-moment";
import ScrollToBottom from "react-scroll-to-bottom";

// import Layout from "../components/Layout";
import { getApi, postApi } from "../Api";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import SmallMediaNav from "../components/SmallMediaNav";
import Sidebar from "../components/Sidebar";

const Messages = () => {
  const [user, setUser] = useState({});
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

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

  const submit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await postApi(`/messages`, {
        text,
        recipient: user?._id,
      });
      if (data.success) {
        setMessages([...messages, data.message]);
        setText("");
      }
    } catch (error) {}
  };

  return loading ? (
    <Spinner />
  ) : (
    // <Layout>
    //   <div className="flex-1 w-full   px-2  mx-auto h-full items-center md:items-start  md:mt-10  flex   sm:px-6  ">
    //     <div className="conversations w-full border-2 border-black">
    //       <div className="conversations-header flex justify-between items-center p-3 bg-black w-full">
    //         <div className="flex  items-center">
    //           <img
    //             alt={user?.name}
    //             src={user?.avatar}
    //             className="w-[45px] h-[45px] object-cover rounded-full"
    //           />
    //           <span className="text-lg ml-4">{user?.name}</span>
    //         </div>
    //       </div>
    //       <ScrollToBottom
    //         className="conversation-body h-[365px]  w-full "
    //         initialScrollBehavior={"smooth"}
    //       >
    //         {messages?.map((message) => (
    //           <div className="w-full" key={message?._id}>
    //             {message.recipient === user?._id ? (
    //               <div className="w-full  flex flex-col items-end">
    //                 <span className="m-2 py-1 max-w-[75%] bg-yellow-500  px-3 rounded-md text-black">
    //                   {message.text}
    //                 </span>
    //                 <span className="text-xs -mt-1 mr-2">
    //                   <Moment format="hh:mm a">{message.createdAt}</Moment>
    //                 </span>
    //               </div>
    //             ) : (
    //               <div className="w-full flex flex-col items-start">
    //                 <span className="m-2 max-w-[75%] py-1 px-3 rounded-md text-yellow-500 bg-black">
    //                   {message.text}
    //                 </span>
    //                 <span className="text-xs -mt- ml-2">
    //                   <Moment format="hh:mm a">{message.createdAt}</Moment>
    //                 </span>
    //               </div>
    //             )}
    //           </div>
    //         ))}
    //       </ScrollToBottom>
    //       <form
    //         method="post"
    //         onSubmit={(e) => submit(e)}
    //         className="conversation-footer bg-black  h-[60px] px-2 "
    //       >
    //         <input
    //           type="text"
    //           placeholder="send message .."
    //           className="w-full rounded-full px-3 bg-inherit py-3 text-lg outline-none h-full "
    //           name="text"
    //           value={text}
    //           onChange={(e) => setText(e.target.value)}
    //         />{" "}
    //       </form>
    //     </div>
    //   </div>
    // </Layout>
    <div className="w-full h-screen relative top-0 bg-dark font-blink overflow-y-scroll text-white ">
      <Header />

      <div className="max-w-6xl mt-10  mx-auto h-full">
        <div className="flex w-full justify-center gap-4 pt-6 mt-7 md:pt-6 h-full  md:px-16 lg:px-10">
          <Sidebar />
          <div className="h-full flex-1  w-full ">
            {/*  */}
            <div className="flex-1 w-full   px-2  mx-auto h-full items-center md:items-start md:mt-7 flex   sm:px-6  ">
              <div className="conversations w-full border-2 border-black">
                <div className="conversations-header flex justify-between items-center p-3 bg-black w-full">
                  <div className="flex  items-center">
                    <img
                      alt={user?.name}
                      src={user?.avatar}
                      className="w-[45px] h-[45px] object-cover rounded-full"
                    />
                    <span className="text-lg ml-4">{user?.name}</span>
                  </div>
                </div>
                <ScrollToBottom
                  className="conversation-body h-[300px] md:h-[365px]  w-full "
                  initialScrollBehavior={"smooth"}
                >
                  {messages?.map((message) => (
                    <div className="w-full" key={message?._id}>
                      {message.recipient === user?._id ? (
                        <div className="w-full  flex flex-col items-end">
                          <span className="m-2 py-1 max-w-[75%] bg-yellow-500  px-3 rounded-md text-black">
                            {message.text}
                          </span>
                          <span className="text-xs -mt-1 mr-2">
                            <Moment format="hh:mm a">
                              {message.createdAt}
                            </Moment>
                          </span>
                        </div>
                      ) : (
                        <div className="w-full flex flex-col items-start">
                          <span className="m-2 max-w-[75%] py-1 px-3 rounded-md text-yellow-500 bg-black">
                            {message.text}
                          </span>
                          <span className="text-xs -mt- ml-2">
                            <Moment format="hh:mm a">
                              {message.createdAt}
                            </Moment>
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </ScrollToBottom>
                <form
                  method="post"
                  onSubmit={(e) => submit(e)}
                  className="conversation-footer bg-black  h-[70px] py-2 px-1 "
                >
                  <input
                    type="text"
                    placeholder="send message .."
                    className="w-full rounded-full px-3 bg-dark py-1 text-lg outline-none h-full "
                    name="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />{" "}
                </form>
              </div>
            </div>

            {/*  */}
          </div>
        </div>
      </div>
      <SmallMediaNav />
    </div>
  );
};

export default Messages;
