import React, { useState } from "react";
import Layout from "../components/Layout";
import { postApi } from "../Api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/Auth";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
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

  const { auth } = useSelector((state) => state.auth);
  const user = new Auth(auth);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const showSocialNetwork = (e) => {
    e.preventDefault();
    return setShow(!show);
  };
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
        return navigate(`/profile/${user.slug}/${user._id}`);
      }
    } catch (error) {}
  };

  return (
    <Layout>
      <section className="w-full bg-slate-900  py-3 px-4">
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
                className="p-2 outline-none bg-slate-800"
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
                className="p-2 outline-none bg-slate-800"
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
                className="p-2 outline-none bg-slate-800"
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
                className="p-2 outline-none bg-slate-800"
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
                className="p-2 outline-none bg-slate-800"
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
                className="p-2 outline-none bg-slate-800"
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
                className="p-2 outline-none bg-slate-800"
                id="bio"
                name="bio"
                onChange={onChangeHandler}
                value={formData.bio}
              />
            </div>
            <div className="my-5">
              <button
                className="bg-slate-700 text-yellow-600 p-2 mr-2"
                onClick={(e) => showSocialNetwork(e)}
              >
                Add Social Network Links
              </button>
              <span className="text-slate-200">Optional</span>
            </div>

            {show ? (
              <div className="social-links ">
                <div className="flex flex-col ">
                  <label htmlFor="facebook" className="my-1">
                    Facebook
                  </label>
                  <input
                    type="text"
                    placeholder="Facebook url"
                    className="p-2 outline-none bg-slate-800"
                    id="facebook"
                    name="facebook"
                    onChange={onChangeHandler}
                    value={formData.facebook}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label htmlFor="twitter" className="my-1">
                    Twitter
                  </label>
                  <input
                    type="text"
                    placeholder="Twitter url"
                    className="p-2 outline-none bg-slate-800"
                    id="twitter"
                    name="twitter"
                    onChange={onChangeHandler}
                    value={formData.twitter}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label htmlFor="instagram" className="my-1">
                    Instagram
                  </label>
                  <input
                    type="text"
                    placeholder="Instagram url"
                    className="p-2 outline-none bg-slate-800"
                    id="instagram"
                    name="instagram"
                    onChange={onChangeHandler}
                    value={formData.instagram}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label htmlFor="linkedin" className="my-1">
                    Linkedin
                  </label>
                  <input
                    type="text"
                    placeholder="Linkedin url"
                    className="p-2 outline-none bg-slate-800"
                    id="linkedin"
                    name="linkedin"
                    onChange={onChangeHandler}
                    value={formData.linkedin}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
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
      </section>
      <div className="h-20"></div>
    </Layout>
  );
};

export default CreateProfile;
