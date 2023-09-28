import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/solid";
import {
  ChatBubbleLeftEllipsisIcon,
  PaperAirplaneIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import Moment from "react-moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../features/postSlice";
import PostComments from "./Comment";
import { putApi } from "../Api";

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
  return (
    <div className="post mt-8 bg-slate-900">
      <div className="post-author px-3 py-4 ">
        <div className="post-author-details flex items-center justify-between ">
          <Link
            to={`/profile/${author.name.replace(/\s/g, "-")}/${author._id}`}
            className="flex items-center flex-1 gap-3"
          >
            <img
              src={author?.avatar}
              alt={author?.name}
              className="w-[40px] h-[40px]  sm:w-[50px] sm:h-[50px] object-center rounded-full"
            />
            <div className="flex items-center gap-2">
              <h3 className="post-author-name font-semibold sm:text-lg  sm:font-medium">
                {author.name}
              </h3>
              <div className="text-sm">
                <Moment fromNow>{createAt}</Moment>
              </div>
            </div>
          </Link>
        </div>

        <div className={title ? "post-title mx-1 pt-1  text-[15px]" : "hidden"}>
          {title ? title : ""}
        </div>
      </div>
      <div className={`${text ? "p-2 " : "post-body"} `}>
        {image ? (
          <img
            src={image}
            alt={"post-img"}
            className="max-h-[410px]  w-full"
            width={300}
            height={300}
          />
        ) : video ? (
          <video className="max-h-[410px]  w-full" controls>
            <source src={video} />
          </video>
        ) : (
          text
        )}
      </div>
      {toggleComment ? (
        <div className="text-sm bg-slate-900 py-2">
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
      <div className="flex p-4 justify-between bg-slate-900 post-reactions">
        <div className="flex gap-2 items-center">
          {checkIfLike(auth?._id, likes) ? (
            <HeartIcon
              onClick={() => like(id, auth)}
              className="w-5 text-red-600 cursor-pointer"
            />
          ) : (
            <HeartIcon
              onClick={() => like(id, auth)}
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
      <div className="comment px-1 py-3 border-t  border-gray-700 flex items-center justify-between">
        <img
          alt={auth?.user ? auth?.user.name : auth?.name}
          src={auth?.user ? auth?.user.avatar : auth.avatar}
          className="w-[23px] h-[23px]  sm:mr-0 sm:w-[35px]  sm:h-[35px] object-center rounded-full"
        />
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-1 p-[6px] ml-1  outline-none bg-gray-800 rounded-full"
          placeholder="comment ..."
        />
        <PaperAirplaneIcon
          className="w-6 sm:w-7   cursor-pointer"
          onClick={() => comment(id, auth?.user ? auth?.user : auth)}
        />
      </div>
    </div>
  );
};

export default Post;
