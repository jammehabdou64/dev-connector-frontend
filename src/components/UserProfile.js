import React, { useState } from "react";
import {
  ChatBubbleLeftEllipsisIcon,
  UserIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import User from "../utils";
import { putApi } from "../Api";
import { useDispatch } from "react-redux";
import { updateAuth } from "../features/auth/authSlice";

const UserProfile = ({ profileExist, profile, user, auth }) => {
  const userData = new User(profileExist, profile, user, auth);
  const [profileImage, setProfileImage] = useState("");
  const dispatch = useDispatch();

  const changeProfile = (e) => setProfileImage(e.target.files[0]);

  const submit = async () => {
    try {
      const formData = new FormData();
      formData.append("profile", profileImage);
      const { data } = await putApi("/auth/change-profile", formData);
      if (data.success) {
        setProfileImage("");
        dispatch(updateAuth(data.message));
        return;
      }
    } catch (error) {}
  };
  return (
    <section className="flex px-6 py-5 bg-slate-900 justify-center items-center  flex-col">
      <div className="">
        <img
          alt="user-img"
          src={userData.avatar()}
          className="rounded-full border-4 border-yellow-500 w-[125px] h-[125px] md:w-[170px] md:h-[169px]"
        />
      </div>

      <div className={userData.checkIfMyProfile() ? "block -mt-12" : "hidden"}>
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
        className={
          profileImage
            ? "block mt-5 bg-yellow-600 text-slate-950 rounded-md px-2 py-1"
            : "hidden"
        }
        onClick={submit}
      >
        change profile
      </button>
      <h3 className="my-4 font-semibold text-2xl">{userData.name()}</h3>
      <p className=" my-1 text-lg">{profile?.status}</p>
      <p className="text-sm my-1">{profile?.location}</p>
      <div className="flex">
        <div>
          {!userData.checkIfMyProfile() ? (
            <div className="gap-2 my-2 py-3 flex-col flex sm:flex-row ">
              <button
                className={
                  "bg-gray-800 items-center flex py-2 px-4 w-full sm:w-fit"
                }
              >
                <UserIcon className="w-5" />{" "}
                <span className="mx-1">Add friend</span>
              </button>
              <Link
                to={`/message/${userData.nameReplace()}/${userData.id()}`}
                className={
                  "text-gray-900 items-center flex  bg-yellow-500 py-2 px-4 w-full sm:w-fit"
                }
              >
                <ChatBubbleLeftEllipsisIcon className="w-5" />
                <span className="mx-1">Message</span>
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
