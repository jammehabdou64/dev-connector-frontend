import { Link } from "react-router-dom";
import Moment from "react-moment";
import { putApi } from "../Api";
import { useNavigate } from "react-router-dom";

const Notification = ({ from, seen, type, createdAt, id, post }) => {
  const navigate = useNavigate();
  const updateNotificationSeen = async (e, id, from, post) => {
    try {
      e.preventDefault();
      if (!seen) {
        const { data } = await putApi(`/notifications/${id}`, from);
        if (data.success) {
          return navigate(`/post/${post}`);
        }
      }
      return navigate(`/post/${post}`);
    } catch (error) {}
  };
  return (
    <Link
      to={`/post/${id}`}
      className=" block cursor-pointer max-w-[400px] mt-1 mx-auto   sm:w-[400px]  md:w-[440px] lg:max-w-[475px]"
      onClick={(e) => updateNotificationSeen(e, id, from, post)}
    >
      <div
        className={`flex w-full gap-1 sm:gap-2 items-center p-1 sm:p-2 ${
          !seen ? "bg-black" : "bg-gray-950"
        }`}
      >
        <div className="w-[41px]">
          <img
            src={from?.avatar}
            alt={from?.name}
            className="w-[40px] h-[40px] rounded-full"
          />
        </div>
        <div className="w-full flex-1">
          <div className="flex justify-between w-full items-center text-[15px]">
            <p className=" sm:mx-2">
              <span className="font-semibold mr-1"> {from?.name}</span>
              {type === "like" ? (
                <span>Like your post</span>
              ) : (
                <span>Comment on your post </span>
              )}
            </p>
            <p className="hidden xs:block text-sm">
              <Moment format="DD-M-YYYY">{createdAt}</Moment>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Notification;
