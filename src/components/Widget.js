import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Widget = () => {
  const { auth } = useSelector((state) => state.auth);
  const friends = auth.user ? auth.user.friends : auth.friends;
  return (
    <div className="py-5 w-[350px] hidden mt-5 lg:block min-h-[100px] h-fit px-3 bg-slate-900 shadow-xl">
      <h3 className="text-yellow-500 text-center text-lg">Friends</h3>
      {friends.map((friend, index) => (
        <Link
          to={`/message/${friend?.name?.replace(/\s/g, "-")}/${friend?._id}`}
          key={index}
          className="flex px-1 py-1 items-center mt-2 gap-3"
        >
          <img
            src={friend?.avatar}
            alt="ww"
            className="w-[30px] h-[30px] rounded-full"
          />
          <p className="text-lg font-medium">{friend?.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default Widget;
