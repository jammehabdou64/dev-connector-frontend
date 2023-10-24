import React, { useState } from "react";
import {
  ChatBubbleLeftEllipsisIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";

// import User from "../utils";
import { putApi } from "../Api";
import { useDispatch } from "react-redux";
import { loadUser } from "../features/auth/authSlice";
import Auth from "../utils/Auth";

const UserProfile = ({ profile, auth }) => {
  const authUser = new Auth(auth);
  const userProfile = new Auth(profile);
  const [profileImage, setProfileImage] = useState("");
  const dispatch = useDispatch();

  const changeProfile = (e) => setProfileImage(e.target.files[0]);
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  const url = useLocation();
  const submit = async () => {
    try {
      setDisabled(true);
      const formData = new FormData();

      formData.append("profile", profileImage);
      const { data } = await putApi("/auth/change-profile", formData);
      if (data.success) {
        setProfileImage("");
        dispatch(loadUser());
        return navigate(`/profile/update?url=${url.pathname}`);
      }
    } catch (error) {
    } finally {
      setDisabled(false);
    }
  };

  return (
    <section className="flex px-6 py-5 bg-black justify-center items-center  flex-col mt-7">
      <div className="">
        <img
          alt="user-img"
          src={userProfile?.avatar}
          className="rounded-full border-4 border-yellow-500 w-[125px] h-[125px] md:w-[170px] md:h-[169px]"
        />
      </div>

      <div
        className={
          userProfile?._id === authUser?._id ? "block -mt-12" : "hidden"
        }
      >
        <input
          type="file"
          className="hidden"
          id="select-img"
          onChange={(e) => changeProfile(e)}
        />
        <label
          htmlFor="select-img"
          className="flex items-center cursor-pointer "
        >
          <CameraIcon className=" w-7 md:w-10 text-yellow-500 " />
        </label>
      </div>

      <button
        disabled={disabled}
        className={
          profileImage
            ? "block mt-8 sm:mt-5 sm:text-lg  bg-yellow-600 text-slate-950 rounded-md px-2 py-1"
            : "hidden"
        }
        onClick={submit}
      >
        change profile
      </button>
      <h3 className="my-4 font-semibold text-2xl">{userProfile?.name}</h3>
      <p className=" my-1 text-lg">{userProfile?.status}</p>
      <p className="text-sm my-1">{userProfile?.location}</p>
      <div className="flex">
        <div>
          {userProfile?._id !== authUser?._id ? (
            <div className="gap-2 my-2 py-3 flex-col flex sm:flex-row ">
              <Link
                to={`/message/${userProfile?.slug}/${userProfile?._id}`}
                className={
                  "text-gray-900 items-center flex  bg-yellow-500 py-2 px-4 w-full sm:w-fit"
                }
              >
                <ChatBubbleLeftEllipsisIcon className="w-5" />
                <span className="mx-1 text-lg text-black font-medium">
                  Message
                </span>
              </Link>
            </div>
          ) : (
            <div className="p-3 flex gap-2 flex-col sm:flex-row">
              <Link
                to={"/profile/create"}
                className="py-1 px-2 bg-yellow-500 text-center rounded-md text-slate-950"
              >
                {auth?.user ? "Edit Profile" : "Create Profile"}
              </Link>
              <Link
                to={"/education/create"}
                className="py-1 px-2 bg-yellow-500 text-center rounded-md text-slate-950"
              >
                Add education
              </Link>
              <Link
                to={"/experience/create"}
                className="py-1 px-2 bg-yellow-500 text-center rounded-md text-slate-950"
              >
                Add experience
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
