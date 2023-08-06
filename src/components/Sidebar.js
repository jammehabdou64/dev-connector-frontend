import { useSelector } from "react-redux";

const Sidebar = () => {
  const { auth } = useSelector((state) => state.auth);
  return (
    <div className="py-5 px-1 bg-slate-900 shadow-2xl">
      <div className="user ">
        <div className="flex justify-center">
          <img
            src={auth?.user ? auth.user?.avatar : auth.avatar}
            width={70}
            height={70}
            alt={auth?.user ? auth.user?.name : auth.name}
            className="rounded-full w-[70px] h-[69px] object-fill"
          />
        </div>
        <p className="text-center text-lg my-5 font-semibold">
          {auth?.user ? auth.user?.name : auth.name}
        </p>
      </div>
      <div className="user-details  flex justify-around">
        <div className="">
          <p>Friends</p>
          <p className="text-center text-yellow-500">
            {auth.user ? auth.user?.friends.length : auth?.friends.length}
          </p>
        </div>
        <div className="">
          <p>viewied profile</p>
          <p className="text-center text-yellow-500">2</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
