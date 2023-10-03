import { useState } from "react";
import Layout from "../components/Layout";
import { patchApi } from "../Api";

const ChangePassword = () => {
  const [error, setError] = useState({});

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const submit = async (e) => {
    try {
      e.preventDefault();
      // return console.log(formData);
      const { data } = await patchApi("/auth/change-password", formData);
      console.log(data);
    } catch (error) {
      setError(error?.response?.data?.error);
    }
  };

  const inputHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Layout>
      <div className=" px-3 xs:px-6 sm:px-16 md:px-0 mt-6 md:mt-2 ">
        <form
          action=""
          method="post"
          onSubmit={(e) => submit(e)}
          className="px-4  md:px-4 py-6 bg-slate-900"
        >
          <h3 className="font-semibold text-xl xs:text-3xl text-center py-2">
            Change Password
          </h3>
          <div className="flex flex-col mt-2">
            <label htmlFor="oldPassword" className="text-gray-200 my-1">
              Old password
            </label>
            <input
              id="oldPassword"
              type="password"
              placeholder="old password"
              name="oldPassword"
              className={`outline-none bg-gray-700 py-2 px-4 rounded-md text-white ${
                error.old ? "border-red-600 border" : ""
              }`}
              onChange={(e) => inputHandler(e)}
            />
            <small className={error.oldPassword ? "text-red-600" : "hidden"}>
              {error.oldPassword}
            </small>
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="newPassword" className="text-gray-200 my-1">
              New password
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="old password"
              name="newPassword"
              className={`outline-none bg-gray-700 py-2 px-4 rounded-md text-white ${
                error.newPassword ? "border-red-600 border" : ""
              }`}
              onChange={(e) => inputHandler(e)}
            />
            <small className={error.newPassword ? "text-red-600" : "hidden"}>
              {error.newPassword}
            </small>
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="confirmPassword" className="text-gray-200 my-1">
              Confirm-password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="confirm-password"
              name="confirmPassword"
              className={`outline-none bg-gray-700 py-2 px-4 rounded-md text-white ${
                error.confirmPassword ? "border-red-600 border" : ""
              }`}
              onChange={(e) => inputHandler(e)}
            />
            <small
              className={error.confirmPassword ? "text-red-600" : "hidden"}
            >
              {error.confirmPassword}
            </small>
          </div>
          <div className="mt-6 pb-5">
            <button className="font-medium bg-yellow-500 text-gray-900 p-3 w-full rounded-md">
              Subimt
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChangePassword;
