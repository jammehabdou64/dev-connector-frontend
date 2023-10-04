import { FilmIcon, PhotoIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/postSlice";
import { postApi } from "../Api";
import { setPostFeedModal } from "../features/modalSlice";

const PostFeedModal = () => {
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    text: "",
    image: "",
    title: "",
    video: "",
  });

  const [imageLength, setImageLength] = useState(0);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (
      formData.text?.length > 0 ||
      formData.title?.length > 0 ||
      imageLength > 0
    ) {
      return setDisableButton(false);
    }
    return setDisableButton(true);
  }, [formData, imageLength]);

  const inputChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const imageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    setImageLength(1);
  };

  const submit = async (e) => {
    try {
      const jsFormData = new FormData();
      jsFormData.append(
        "title",
        formData.image || formData.video ? formData.text : ""
      );
      jsFormData.append(
        "text",
        formData.image || formData.video ? "" : formData.text
      );
      jsFormData.append("image", formData.image);
      jsFormData.append("video", formData.image ? "" : formData.video);
      const { data } = await postApi("/posts", jsFormData);
      if (data.success) {
        dispatch(addPost(data.message));
        return setFormData({
          ...formData,
          image: "",
          text: "",
          title: "",
          video: "",
        });
      }
    } catch (error) {
    } finally {
      dispatch(setPostFeedModal());
    }
  };

  return (
    <div className="bg-light px-2  xs:px-6 absolute z-[999] h-screen top w-full">
      <div className=" w-full sm:w-[500px] lg:w-[600px] bg-gray-900 min-h-[300px] mx-auto mt-20 p-4">
        <div className="flex items-center justify-between  mb-3">
          <div className="flex items-center gap-3">
            <img
              alt={auth?.user ? auth?.user.name : auth?.name}
              src={auth?.user ? auth?.user.avatar : auth.avatar}
              className="w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] object-center rounded-full"
            />
            <h3 className=" font-medium xs:font-semibold xl:text-xl">
              {auth?.user ? auth?.user.name : auth?.name}
            </h3>
          </div>
          <div>
            <span
              onClick={() => dispatch(setPostFeedModal())}
              className="font-semibold text-sm py-2 px-3 cursor-pointer  hover:bg-gray-800 rounded-full "
            >
              X
            </span>
          </div>
        </div>
        <div className="my-3">
          <textarea
            className=" h-[240px] p-2 outline-none w-full bg-gray-800"
            placeholder=" Write Something"
            name="text"
            value={formData.text}
            onChange={inputChangeHandler}
          />
        </div>

        <div className="flex items-center gap-3 py-1 sm:py-2 mt-4">
          <div className="bg-gray-800 p-2 rounded-full ">
            <input
              type="file"
              className="hidden"
              id="select-img"
              onChange={(e) => imageChange(e)}
            />
            <label
              htmlFor="select-img"
              className="flex items-center cursor-pointer"
            >
              {" "}
              <PhotoIcon className=" w-5 sm:w-7 " />
            </label>
          </div>

          <div className="bg-gray-800 p-2 rounded-full">
            <input
              type="file"
              className="hidden"
              id="select-video"
              onChange={(e) => imageChange(e)}
            />
            <label
              htmlFor="select-video"
              className="flex items-center cursor-pointer"
            >
              <FilmIcon className=" w-5 sm:w-7  " />
            </label>
          </div>
        </div>
        <div className="flex justify-end py-1">
          <button
            disabled={disableButton}
            className={`${
              disableButton ? "bg-yellow-700" : "bg-yellow-600"
            } px-4 py-1 rounded-full`}
            onClick={submit}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostFeedModal;
