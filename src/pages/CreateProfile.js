import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getApi, postApi } from "../Api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/Auth";
import { loadUser } from "../features/auth/authSlice";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubUsername: "",
    bio: "",
  });

  const { auth } = useSelector((state) => state.auth);
  const user = new Auth(auth);

  useEffect(() => {
    const getProfile = async (auth) => {
      const user = new Auth(auth);
      const { data } = await getApi(`/profile/${user?._id}`);
      if (data.success) {
        const { message } = data;
        return setFormData({
          company: message?.company ? message.company : "",
          website: message?.website ? message.website : "",
          location: message?.location ? message.location : "",
          status: message?.status ? message.status : "",
          skills: message?.skills ? message.skills?.join(",") : "",
          githubUsername: message?.githubUsername ? message.githubUsername : "",
          bio: message?.bio ? message.bio : "",
        });
      }
    };
    getProfile(auth);
  }, [auth]);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await postApi("/profile", formData);
      if (data.success) {
        setFormData({
          company: "",
          website: "",
          location: "",
          status: "",
          skills: "",
          githubUsername: "",
          bio: "",
          youtube: "",
          facebook: "",
          twitter: "",
          instagram: "",
          linkedin: "",
        });
        dispatch(loadUser());
        return navigate(`/profile/${user.slug}/${user._id}`);
      }
    } catch (error) {}
  };

  return (
    <Layout>
      <section className="px-4 md:px-0">
        <div className="w-full bg-black  py-3 px-4">
          <h2 className="text-center font-semibold text-lg my-3">
            Create Profile
          </h2>
          <div className="form">
            <form action="" method="post">
              <div className="flex flex-col">
                <label htmlFor="status" className="my-1">
                  Status
                </label>
                <select
                  name="status"
                  onChange={onChangeHandler}
                  value={formData.status}
                  id="status"
                  className="p-2 outline-none bg-dark"
                >
                  <option value=""> Select Professional Stataus</option>
                  <option value="Developer"> Developer</option>
                  <option value="Junior Developer"> Junior Developer</option>
                  <option value="Mid Developer"> Mid Developer</option>
                  <option value="Senior Developer"> Senior Developer</option>
                  <option value="Student or Learning">
                    {" "}
                    Student or Learning
                  </option>
                  <option value="Instructor or Teacher">
                    {" "}
                    Instructor or Teacher
                  </option>
                  <option value="Intern"> Intern</option>
                  <option value="Other"> Other</option>
                </select>
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
                <label htmlFor="website" className="my-1">
                  Website
                </label>
                <input
                  type="text"
                  placeholder="Website"
                  className="p-2 outline-none bg-dark"
                  id="website"
                  name="website"
                  onChange={onChangeHandler}
                  value={formData.website}
                />
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="location" className="my-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Location"
                  className="p-2 outline-none bg-dark"
                  id="location"
                  name="location"
                  onChange={onChangeHandler}
                  value={formData.location}
                />
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="skills" className="my-1">
                  Skills
                </label>
                <input
                  type="text"
                  placeholder="eg. PHP, JAVASCRIPT , PYTHON"
                  className="p-2 outline-none bg-dark"
                  id="skills"
                  name="skills"
                  onChange={onChangeHandler}
                  value={formData.skills}
                />
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="github" className="my-1">
                  Github Username
                </label>
                <input
                  type="text"
                  placeholder="Github Username"
                  className="p-2 outline-none bg-dark"
                  id="github"
                  name="githubUsername"
                  onChange={onChangeHandler}
                  value={formData.githubUsername}
                />
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="bio" className="my-1">
                  Bio
                </label>
                <textarea
                  type="text"
                  placeholder="Tell us little about yourself"
                  className="p-2 outline-none bg-dark"
                  id="bio"
                  name="bio"
                  onChange={onChangeHandler}
                  value={formData.bio}
                />
              </div>

              <div className="my-5">
                <button
                  className="p-3 bg-yellow-600 text-slate-950 w-full"
                  onClick={submit}
                >
                  submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className="h-20"></div>
    </Layout>
  );
};

export default CreateProfile;
