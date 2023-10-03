import React, { useEffect } from "react";
import {
  FilmIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/postSlice";
import Post from "./Post";
import Spinner from "./Spinner";
import { setPostFeedModal } from "../features/modalSlice";

const Feeds = () => {
  const dispatch = useDispatch();

  const {
    auth: { auth },
    post: { posts, isLoading },
  } = useSelector((state) => state);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="feeds-container w-full px-[6.5px] xs:px-4 sm:px-8 md:px-0 mx-auto md:mx-0 relative top-0 z-10  lg:w-[500px]  max-w-[520px] ">
      <div className="post-container w-full py-3 px-3 sm:px-4 bg-slate-900">
        <div className="flex mt-2 pt-2 gap-2 ">
          <img
            alt={auth?.user ? auth?.user.name : auth?.name}
            src={auth?.user ? auth?.user.avatar : auth.avatar}
            className="w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] object-center rounded-full"
          />

          <div className="flex-1">
            <form action="" method="post" className="w-full relative top-0">
              <textarea
                type="text"
                name="text"
                id=""
                className="h-10 sm:h-11 w-full text-sm p-3 outline-none bg-gray-700 rounded-full"
                placeholder="post feed"
                onClick={() => dispatch(setPostFeedModal())}
              />{" "}
            </form>
          </div>
        </div>
        <div
          className="flex py-1 sm:py-2 mt-4 justify-between"
          onClick={() => dispatch(setPostFeedModal())}
        >
          <div className="flex items-center cursor-pointer">
            <PhotoIcon className=" w-5 sm:w-7 text-green-500" />
            <span className="ml-2 text-base">photo</span>
          </div>

          <div className="flex items-center cursor-pointer">
            <FilmIcon className=" w-5 sm:w-7 text-yellow-500 " />
            <span className="ml-2">video</span>
          </div>
          <div className="flex items-center cursor-pointer">
            <VideoCameraIcon className=" w-5 sm:w-7 text-red-500" />
            <span className="ml-2">live</span>
          </div>
        </div>
      </div>

      <div className="feed-posts mt-6">
        {posts.map((post) => (
          <Post
            title={post?.title}
            author={post.author}
            comments={post.comments}
            image={post?.image}
            createAt={post.createdAt}
            likes={post.likes}
            key={post._id}
            text={post?.text}
            video={post?.video}
            id={post._id}
          />
        ))}
      </div>

      <div className="h-20"></div>
    </div>
  );
};

export default Feeds;
