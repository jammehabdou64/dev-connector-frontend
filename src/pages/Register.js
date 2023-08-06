import { useState } from "react";
import { postApi } from "../Api";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../features/auth/authSlice";

const Register = () => {
  const [error, setError] = useState({});

  const inputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const submit = async (e) => {
    try {
      e.preventDefault();
      // console.log();
      const { data } = await postApi("/auth/register", formData);
      if (data.success) {
        localStorage.setItem("api-token", data.message);
        dispatch(loadUser());
        return <Navigate replace to="/" />;
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  if (isAuth) {
    return <Navigate replace to="/" />;
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        action=""
        method="post"
        className="w-[400px] px-3"
        onSubmit={(e) => submit(e)}
      >
        <div className="flex flex-col">
          <label htmlFor="full-name" className="text-gray-200 my-1">
            Full name
          </label>
          <input
            id="full-name"
            type="text"
            placeholder="name"
            onChange={(e) => inputChange(e)}
            name="name"
            className={`outline-none bg-gray-700 py-2 px-4 rounded-md text-white ${
              error?.name ? "border-red-600 border" : ""
            }`}
          />
          <small className={error?.name ? "text-red-600" : "hidden"}>
            {error?.name}
          </small>
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="email" className="text-gray-200 my-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="email"
            onChange={(e) => inputChange(e)}
            name="email"
            className={`outline-none bg-gray-700 py-2 px-4 rounded-md text-white ${
              error?.email ? "border-red-600 border" : ""
            }`}
          />
          <small className={error?.email ? "text-red-600" : "hidden"}>
            {error?.email}
          </small>
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="password" className="text-gray-200 my-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="password"
            onChange={(e) => inputChange(e)}
            name="password"
            className={`outline-none bg-gray-700 py-2 px-4 rounded-md text-white ${
              error?.password ? "border-red-600 border" : ""
            }`}
          />
          <small className={error?.password ? "text-red-600" : "hidden"}>
            {error?.password}
          </small>
        </div>

        <div className="mt-8">
          <button className="bg-yellow-500 font-medium text-gray-900 p-3 w-full rounded-md">
            Register
          </button>
        </div>
        <div className="mt-4 text-white">
          Already have an account?
          <Link to={"/login"} className="ml-1 text-blue-400">
            login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
