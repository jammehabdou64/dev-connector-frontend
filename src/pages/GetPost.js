import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { getApi } from "../Api";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const GetPost = () => {
  const [post, setPost] = useState({});
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    try {
      const getPost = async (id) => {
        const { data } = await getApi(`/posts/${id}`);
        if (data.success) {
          setPost(data.message);
          setLoading(false);
        }
      };
      getPost(id);
    } catch (error) {
      setLoading(false);
    }
  }, [id]);
  return isLoading ? (
    <Spinner />
  ) : (
    <Layout>
      <div className=" w-full max-w-[390px] relative top-0 z-10   mx-auto   sm:w-[400px]   lg:max-w-[420px] ">
        <Post
          cssMargin="mt-0"
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
        <div className="h-24"></div>
      </div>
    </Layout>
  );
};

export default GetPost;
