import Layout from "../components/Layout";
import FriendSuggestion from "../components/FriendSuggestion";
import { useEffect, useState } from "react";
import { deleteApi, getApi, postApi } from "../Api";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const DisplayRequest = ({ request, accept, remove, confirm }) => {
  return (
    <div className="w-40 p-2 bg-slate-900 flex flex-col items-center">
      <Link
        to={`/profile/${request?.sender.name.replace(/\s/g, "-")}/${
          request?.sender?._id
        }`}
        className="w-full flex justify-center "
      >
        <img
          src={request?.sender.avatar}
          alt={request?.sender.name}
          className="w-20 h-20 rounded-full"
        />
      </Link>
      <p className="my-1">{request?.sender.name}</p>
      <div className="flex flex-col w-full gap-2">
        <button
          className={`${
            !confirm ? "p-1 bg-yellow-600 text-gray-900 w-full" : "hidden"
          }`}
          onClick={() => accept(request)}
        >
          confirm
        </button>
        {confirm ? (
          <p className="text-base text-center">friend</p>
        ) : (
          <button
            className="p-1 bg-slate-700 text-yellow-600 w-full"
            onClick={() => remove(request._id)}
          >
            remove
          </button>
        )}
      </div>
    </div>
  );
};

const FindFriends = () => {
  const [userRequest, setRequest] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    try {
      const getFriendRequest = async () => {
        const { data } = await getApi("/friend-request");
        if (data.success) {
          setRequest(data.message);
          setLoading(false);
        }
      };
      getFriendRequest();
    } catch (error) {
      setLoading(false);
    }
  }, []);

  const accept = async (request) => {
    try {
      const { data } = await postApi("/friends/add", {
        sender: request?.sender?._id,
        id: request?._id,
      });
      if (data.success) {
        setConfirm(true);
      }
    } catch (error) {}
  };

  const remove = async (id) => {
    try {
      const { data } = await deleteApi(`/friend-request/${id}`);
      return data;
    } catch (error) {}
  };
  return isLoading ? (
    <Spinner />
  ) : (
    <Layout>
      <div className="max-w-[400px] mt-1 mx-auto   sm:w-[400px]  md:w-[440px] lg:max-w-[475px]">
        {userRequest.length > 0 ? (
          userRequest.map((request, index) => (
            <DisplayRequest
              request={request}
              key={index}
              accept={accept}
              confirm={confirm}
              remove={remove}
            />
          ))
        ) : (
          <FriendSuggestion />
        )}
      </div>
    </Layout>
  );
};

export default FindFriends;
