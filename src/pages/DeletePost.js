import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../features/postSlice";
const DeletePost = () => {
  const [params] = useSearchParams();
  const url = params.get("url");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const redirectBack = () => {
      dispatch(fetchPosts());
      return navigate(url);
    };
    redirectBack();
  }, [navigate, url, dispatch]);
  return (
    <div className="bg-dark w-full h-screen text-white">
      <Spinner />
    </div>
  );
};

export default DeletePost;
