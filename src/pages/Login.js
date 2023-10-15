import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { postApi } from "../Api";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

const Login = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { auth, isLoading } = useSelector((state) => state.auth);
  const inputHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await postApi("/auth/login", formData);
      if (data.success) {
        localStorage.setItem("api-token", data.message);
        return (window.location.href = "/");
      }
    } catch (error) {
      setError(error.response.data.error?.email);
    }
  };

  if (auth) {
    return <Navigate replace to="/" />;
  }
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="px-3 md:px-0 w-full flex justify-center items-center h-screen bg-dark ">
      <form
        action=""
        method="post"
        className="w-full bg-black text-white py-10 xs:w-[380px] sm:w-[400px] px-3 xs:px-6 md:px-10"
        onSubmit={(e) => submit(e)}
      >
        <h1 className="text-center font-semibold text-3xl mb-5">Login</h1>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-200 my-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="email"
            value={formData.email}
            name="email"
            onChange={(e) => inputHandler(e)}
            className={`outline-none bg-gray-700 py-2 px-4 rounded-md text-white ${
              error ? "border-red-600 border" : ""
            }`}
          />
          <small className={error ? "text-red-600" : "hidden"}>{error}</small>
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="password" className="text-gray-200 my-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="password"
            name="password"
            className="outline-none bg-gray-700 py-2 px-4 rounded-md text-white focus:bg-inherit"
            onChange={(e) => inputHandler(e)}
          />
        </div>
        <div className="flex items-center justify-between my-4">
          <div>
            <input
              type="checkbox"
              className="text-gray-200 cursor-pointer"
              name=""
              id="remember-me"
            />
            <label
              htmlFor="remember-me "
              className=" text-[14.5px] xs:text-base xs:ml-1 text-gray-300"
            >
              Remember me
            </label>
          </div>
        </div>
        <div className="mt-2">
          <button className="font-medium bg-yellow-500 text-black text-xl p-3 w-full rounded-md">
            Login
          </button>
        </div>
        <div className="mt-4 text-white">
          Don't have an account?
          <Link to={"/register"} className="ml-1 text-blue-400">
            register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
