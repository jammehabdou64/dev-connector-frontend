import React, { useState } from "react";
import Layout from "../components/Layout";
import { putApi } from "../Api";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/Auth";
import { useSelector } from "react-redux";

const AddExperience = () => {
  const { auth } = useSelector((state) => state.auth);
  const user = new Auth(auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await putApi("/profile/experience", formData);
      if (data.success) {
        console.log(data.message);
        setFormData({
          ...formData,
          title: "",
          company: "",
          location: "",
          from: "",
          to: "",
          current: false,
          description: "",
        });
        return navigate(`/profile/${user.slug}/${user._id}`);
      }
    } catch (error) {}
  };

  return (
    <Layout>
      <section className="w-full bg-black  py-3 px-4">
        <h2 className="text-center font-semibold text-lg my-3">
          Add An Experience
        </h2>
        <div className="form-container">
          <form action="" method="post">
            <div className="flex flex-col mt-2">
              <label htmlFor="title" className="my-1">
                Job Title
              </label>
              <input
                type="text"
                placeholder="Job title"
                className="p-2 outline-none bg-dark"
                id="title"
                name="title"
                onChange={onChangeHandler}
                value={formData.title}
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="company" className="my-1">
                Company
              </label>
              <input
                type="text"
                placeholder="Company"
                className="p-2 outline-none bg-dark"
                id="company"
                name="company"
                onChange={onChangeHandler}
                value={formData.company}
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="location" className="my-1">
                Location
              </label>
              <input
                type="text"
                placeholder="Job location"
                className="p-2 outline-none bg-dark"
                id="location"
                name="location"
                onChange={onChangeHandler}
                value={formData.location}
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="from" className="my-1">
                From Date
              </label>
              <input
                type="date"
                className="p-2 outline-none bg-dark"
                id="from"
                name="from"
                onChange={onChangeHandler}
                value={formData.from}
              />
            </div>
            <div className="flex mt-2 gap-2">
              <input
                type="checkbox"
                id="current"
                name="current"
                onChange={(e) => {
                  setFormData({ ...formData, current: !formData.current });
                  toggleDisabled(!toDateDisabled);
                }}
                checked={formData.current}
              />
              <label htmlFor="current" className="my-1">
                Current Job
              </label>
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="to" className="my-1">
                To Date
              </label>
              <input
                type="date"
                className="p-2 outline-none bg-dark"
                id="to"
                name="to"
                disabled={toDateDisabled ? "disabled" : ""}
                onChange={onChangeHandler}
                value={formData.to}
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="description" className="my-1">
                Description
              </label>
              <textarea
                type="date"
                className="p-2 outline-none bg-dark"
                id="description"
                name="description"
                onChange={onChangeHandler}
                value={formData.description}
              />
            </div>
            <div className="my-5">
              <button
                className="p-2 bg-yellow-600 text-slate-950 w-full"
                onClick={submit}
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </section>
      <div className="h-20"></div>
    </Layout>
  );
};

export default AddExperience;
