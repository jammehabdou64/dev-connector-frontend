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
  return from?.name ? (
    <Link
      to={`/post/${id}`}
      className=" block cursor-pointer max-w-[400px] h-full border-b border-dark mx-auto   sm:w-[400px]  md:w-[440px] lg:max-w-[475px]"
      onClick={(e) => updateNotificationSeen(e, id, from, post)}
    >
      <div
        className={`flex w-full gap-2 sm:gap-2 items-center py-5 px-2 ${
          !seen ? "bg-black" : "bg-gray-950"
        }`}
      >
        <div className="w-[45px]">
          <img
            src={from?.avatar}
            alt={from?.name}
            className="w-[45px] h-[44px] object-cover rounded-full"
          />
        </div>
        <div className="w-full flex-1">
          <div className="flex justify-between w-full items-center text-[15px]">
            <p className=" sm:mx-2 flex flex-col">
              <span className=" mr-1"> {from?.name}</span>
              {type === "like" ? (
                <span className="text-sm">Like your post</span>
              ) : (
                <span className="text-sm">Comment on your post </span>
              )}
            </p>
            <p className="hidden xs:block text-sm">
              <Moment format="DD-M-YYYY">{createdAt}</Moment>
            </p>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    ""
  );
};

export default Notification;
