import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  ChatBubbleLeftEllipsisIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import Moment from "react-moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../features/postSlice";
import PostComments from "./Comment";
import { deleteApi, putApi } from "../Api";
import Auth from "../utils/Auth";

const Post = ({
  video,
  author,
  title,
  image,
  text,
  createAt,
  comments,
  likes,
  id,
  cssMargin = "mt-8 mb-0",
}) => {
  const { auth } = useSelector((state) => state.auth);
  const [toggleComment, setToggle] = useState(false);
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();

  const checkIfLike = (userId, likes) => {
    const result = likes.find((like) => like.user?.id === userId);
    return result ? true : false;
  };

  const like = async (postId, user) => {
    try {
      const formData = new FormData();
      formData.append("id", user._id);
      formData.append("name", user.name);
      formData.append("avatar", user.avatar);
      const { data } = await putApi(`/posts/like/${postId}`, formData);

      if (data.success) {
        dispatch(updatePost(data.message));
      }
    } catch (error) {}
  };

  const comment = async (postId, user) => {
    try {
      const formData = new FormData();
      formData.append("id", user._id);
      formData.append("name", user.name);
      formData.append("avatar", user.avatar);
      formData.append("text", commentText);
      const { data } = await putApi(`/posts/comment/${postId}`, formData);
      if (data.success) {
        dispatch(updatePost(data.message));
        return setCommentText("");
      }
    } catch (error) {}
  };

  const authUser = new Auth(auth);

  const navigate = useNavigate();
  const url = useLocation();

  const deletePost = async (postId) => {
    try {
      const { data } = await deleteApi(`/posts/${postId}`);
      if (data?.success) {
        return navigate(`/post/delete?url=${url.pathname}`);
      }
    } catch (error) {}
  };

  return (
    <div className={` ${cssMargin} post  bg-black`}>
      <div className="post-author px-3 py-4 ">
        <div className="post-author-details flex items-center justify-between ">
          <Link
            to={`/profile/${author?.name?.replace(/\s/g, "-")}/${author?._id}`}
            className="flex items-center  flex-1 gap-3"
          >
            <img
              src={author?.avatar}
              alt={author?.name}
              className="w-[40px] h-[40px]  sm:w-[50px] sm:h-[50px] object-center rounded-full"
            />
            <div className="flex flex-col leading-[0] xs:flex-row xs:items-center gap-2">
              <h3 className="post-author-name font-semibold sm:text-lg  sm:font-medium">
                {author?.name}
              </h3>
              <div className="text-xs">
                <Moment fromNow>{createAt}</Moment>
              </div>
            </div>
          </Link>
          {author?._id === authUser?._id ? (
            <div className="flex cursor-pointer relative top-0">
              <TrashIcon className="w-5" onClick={() => deletePost(id)} />
            </div>
          ) : (
            ""
          )}
        </div>

        <div className={title ? "post-title mx-1 pt-1  text-[15px]" : "hidden"}>
          {title ? title : ""}
        </div>
      </div>
      <div className={`${text ? "p-2 " : "post-body bg-white"} `}>
        {image ? (
          <img
            src={image}
            alt={"post-img"}
            className="max-h-[470px] object-cover w-full"
            width={300}
            height={300}
          />
        ) : video ? (
          <video className="max-h-[450px]  w-full" controls>
            <source src={video} />
          </video>
        ) : (
          text
        )}
      </div>
      {toggleComment ? (
        <div className="text-sm bg-black py-2">
          {comments?.map((item, index) => (
            <PostComments
              createdAt={item.createAt}
              text={item.text}
              key={index}
              user={item?.user}
            />
          ))}
        </div>
      ) : (
        ""
      )}
      <div className="flex p-4 justify-between bg-black post-reactions">
        <div className="flex gap-2 items-center">
          {checkIfLike(authUser?._id, likes) ? (
            <HeartIcon
              onClick={() => like(id, authUser)}
              className="w-5 text-red-600 cursor-pointer"
            />
          ) : (
            <HeartIcon
              onClick={() => like(id, authUser)}
              className="w-5 cursor-pointer"
            />
          )}
          <span className="text-sm">
            {likes.length > 0 ? likes.length : ""}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <ChatBubbleLeftEllipsisIcon
            className="w-5 cursor-pointer"
            onClick={() => setToggle(!toggleComment)}
          />
          <span className="text-sm">
            {comments.length > 0 ? comments.length : ""}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <ShareIcon className="w-5 cursor-pointer" />{" "}
          <span className="text-sm">10</span>
        </div>
      </div>
      <div className="comment px-1 py-2 border-t  border-dark flex items-center justify-between">
        <img
          alt={authUser?.name}
          src={authUser?.avatar}
          className="w-[23px] h-[23px]  sm:mr-0 sm:w-[35px]  sm:h-[35px] object-cover rounded-full"
        />
        <form
          action=""
          className="flex-1 px-2"
          onSubmit={(e) => {
            e.preventDefault();
            return comment(id, authUser);
          }}
        >
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className=" p-3   w-full outline-none bg-dark rounded-full"
            placeholder="comment ..."
          />
        </form>
      </div>
    </div>
  );
};

export default Post;
