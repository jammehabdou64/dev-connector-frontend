import { Link } from "react-router-dom";
import Moment from "react-moment";
import { putApi } from "../Api";
import { useNavigate } from "react-router-dom";

const Message = ({ sender, seen, text, createdAt, id }) => {
  const navigate = useNavigate();
  const updateMessageSeen = async (e, sender) => {
    try {
      e.preventDefault();
      if (!seen) {
        await putApi(`/messages/${id}`, { sender });
      }

      return navigate(
        `/message/${sender?.name?.replace(/\s/g, "-")}/${sender?._id}`
      );
    } catch (error) {}
  };
  return (
    <Link
      to={`/message/${sender?.name?.replace(/\s/g, "-")}/${sender?._id}`}
      className=" block  cursor-pointer max-w-[400px] mt-1 mx-auto   sm:w-[400px]  md:w-[440px] lg:max-w-[475px]"
      onClick={(e) => updateMessageSeen(e, sender)}
    >
      <div
        className={`flex w-full space-x-2 items-center p-2 ${
          !seen ? "bg-black" : "bg-gray-950"
        }`}
      >
        <div className="w-[60px]">
          <img
            src={sender?.avatar}
            alt={sender?.name}
            className="w-[40px] h-[40px] rounded-full"
          />
        </div>
        <div className="w-full mx-1">
          <div className="flex justify-between w-full text-lg">
            <p className="mx-2">{sender?.name}</p>
            <p className="text-base">
              <Moment format="DD-M-YYYY">{createdAt}</Moment>
            </p>
          </div>
          <div className="ml-2 pl-1 text-xs ">
            {`${text}`.substring(0, 100)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Message;
