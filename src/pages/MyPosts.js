import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import Auth from "../utils/Auth";
import { getApi } from "../Api";
import Spinner from "../components/Spinner";
import Post from "../components/Post";

const MyPosts = () => {
  const { auth } = useSelector((state) => state.auth);

  const user = new Auth(auth);

  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getMyPosts = async () => {
      try {
        const { data } = await getApi(`/posts/myposts/${user._id}`);
        // console.log(data);
        if (data?.success) {
          return setPost(data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getMyPosts();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <Layout>
      <div className="w-full px-[6.5px] xs:px-4 sm:px-8 md:px-0 mx-auto md:mx-0 relative top-0 z-10  lg:w-[500px]  max-w-[520px] ">
        {posts.map((post) => (
          <Post
            author={post.author}
            comments={post.comments}
            likes={post?.likes}
            createAt={post?.createAt}
            id={post._id}
            image={post?.image}
            text={post?.text}
            title={post?.title}
            video={post?.video}
            key={post._id}
            cssMargin="mt-0 mb-5"
          />
        ))}
      </div>
    </Layout>
  );
};

export default MyPosts;
