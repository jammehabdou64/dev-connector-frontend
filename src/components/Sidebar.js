import { useSelector } from "react-redux";
import Auth from "../utils/Auth";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const {
    auth: { auth },
    post: { posts },
  } = useSelector((state) => state);

  const user = new Auth(auth);
  return (
    <div className="mt-5 hidden md:block py-5 px-1 bg-black shadow-2xl sticky top-4 w-[220px] h-fit">
      <div className="user ">
        <div className="flex justify-center">
          <img
            src={user.avatar}
            width={70}
            height={70}
            alt={user?.name}
            className="rounded-full w-[70px] h-[69px] object-fill"
          />
        </div>
        <p className="text-center text-lg mt-5 font-semibold">{user?.name}</p>
      </div>
      <div className="user-details py-2">
        <div className="w-full px-3 ">
          <p className="text-center text-gray-200 mt-1 mb-4 text-sm">
            {user.status}
          </p>
        </div>
        <Link
          to={`/posts/${user.slug}`}
          className="flex justify-between hover:bg-dark hover:transition-all  w-full px-3 cursor-pointer my-2"
        >
          <p>Posts</p>
          <p className="text-center text-yellow-500">
            {user.numbOfPosts(posts)}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
