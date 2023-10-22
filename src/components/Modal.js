import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Modal = () => {
  const { auth } = useSelector((state) => state.auth);
  const logoutDispatch = useDispatch();
  const logoutHandler = (event) => {
    try {
      event.preventDefault();
      logoutDispatch(logout());
      window.location.href = "/login";
      return;
    } catch (error) {}
  };
  return (
    <div className="w-[200px] absolute mt-12  text-white top-0 left-0 -ml-[10.6rem] z-40 bg-black shadow-xl h-fit min-h-[200px]">
      <div className="p-3">
        <h3 className="font-semibold my-2 text-xl">Settings</h3>
        <ul className="py-3">
          <li>
            <Link
              className="p-1 hover:underline"
              to={`/profile/${
                auth?.user
                  ? auth?.user.name.replace(/\s/g, "-")
                  : auth?.name.replace(/\s/g, "-")
              }/${auth?.user ? auth?.user._id : auth?._id}`}
            >
              Profile
            </Link>
          </li>
          <li className="my-3">
            <Link className="p-1 hover:underline" to={"/change-password"}>
              Change password
            </Link>
          </li>
          <li>
            <Link
              className="p-1 hover:underline"
              to={"/logout"}
              onClick={logoutHandler}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Modal;
