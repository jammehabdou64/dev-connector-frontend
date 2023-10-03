import React, { useState } from "react";
import Layout from "../components/Layout";
import { putApi } from "../Api";

const AddEducation = () => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: "",
    description: "",
  });
  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const submit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await putApi("/profile/education", formData);
      if (data.success) {
        console.log(data.message);
        return setFormData({
          school: "",
          degree: "",
          fieldofstudy: "",
          from: "",
          to: "",
          current: false,
          description: "",
        });
      }
    } catch (error) {}
  };

  return (
    <Layout>
      <section className="w-full bg-slate-900  py-3 px-4">
        <h2 className="text-center font-semibold text-lg my-3">
          Add An Education
        </h2>
        <div className="form-container">
          <form action="" method="post">
            <div className="flex flex-col mt-2">
              <label htmlFor="school" className="my-1">
                School or Bootcamp
              </label>
              <input
                type="text"
                placeholder="School or Bootcamp"
                className="p-2 outline-none bg-slate-800"
                id="school"
                name="school"
                onChange={onChangeHandler}
                value={formData.school}
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="fieldofstudy" className="my-1">
                Field of Study
              </label>
              <input
                type="text"
                placeholder="Field Of Study"
                className="p-2 outline-none bg-slate-800"
                id="fieldofstudy"
                name="fieldofstudy"
                onChange={onChangeHandler}
                value={formData.fieldofstudy}
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="degree" className="my-1">
                Degree
              </label>
              <input
                type="text"
                placeholder=" degree"
                className="p-2 outline-none bg-slate-800"
                id="degree"
                name="degree"
                onChange={onChangeHandler}
                value={formData.degree}
              />
            </div>
            <div className="flex flex-col mt-2">
              <label htmlFor="from" className="my-1">
                From Date
              </label>
              <input
                type="date"
                className="p-2 outline-none bg-slate-800"
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
                className="p-2 outline-none bg-slate-800"
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
                className="p-2 outline-none bg-slate-800"
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

export default AddEducation;
