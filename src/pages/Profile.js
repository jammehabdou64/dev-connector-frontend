import { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

import Header from "../components/Header";
import SmallMediaNav from "../components/SmallMediaNav";
import UserProfile from "../components/UserProfile";
import { useSelector } from "react-redux";
import { getApi } from "../Api";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Education from "../components/Education";
import Experience from "../components/Experience";
import GithubRepos from "../components/GithubRepos";

const Profile = () => {
  const { id } = useParams();
  const { auth } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async (id) => {
      try {
        const { data } = await getApi(`/profile/edit/${id}`);
        if (data.success || data.success === null) {
          setProfile(data.message);
          return;
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getProfile(id);
  }, [id]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="h-screen w-full bg-dark overflow-hidden text-white font-blink">
      <Header />

      <main className="mt-10 md:px-9 px-[6.5px] xs:px-4 sm:px-10 pt-10 h-full overflow-y-scroll">
        <div className="mx-auto h-[400px] max-w-4xl">
          <UserProfile profile={profile} auth={auth} />

          <div className="bio bg-black mt-8 py-4 px-3 ">
            <h3 className=" py-2 mt-2 text-lg flex justify-center  text-yellow-500  font-medium md:font-semibold text-center md:text-xl">
              Summary
            </h3>
            <p className="px-2 text-center">{profile?.bio}</p>
          </div>
          <div className="skills-set w-full py-4 bg-black  mt-4 px-3">
            <h2 className=" py-2 my-1 text-lg font-medium md:font-semibold md:text-xl text-yellow-500 text-center">
              Skill set
            </h2>
            <ul className="py-3 flex justify-center gap-2">
              {profile?.skills?.map((skill, index) => (
                <li
                  className="text-sm md:font-medium mt-2 flex gap-1 md:gap-2 md:mx-3 md:px-2"
                  key={index}
                >
                  <CheckIcon className="w-3 md:w-5" /> {skill}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-3 mt-4 ">
            <div className="w-full md:w-1/3 flex flex-col sm:flex-row  md:flex-col gap-5 pt-0 md:py-14">
              <div className="w-full md:w-64 py-4 bg-black  mt-4 px-3 experience-container">
                <div className="">
                  <h2 className=" py-2 my-1 text-lg font-medium md:font-semibold md:text-xl text-yellow-500 text-center">
                    Experience
                  </h2>
                  <div className="py-3">
                    {profile?.experience?.map((experience, index) => (
                      <Experience
                        key={index}
                        company={experience.company}
                        current={experience.current}
                        description={experience.description}
                        from={experience.from}
                        to={experience.to}
                        title={experience.title}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-64  py-4 bg-black  mt-4 px-3 education-container">
                <div className="skills-set">
                  <h2 className=" py-2 my-1 text-lg font-medium md:font-semibold md:text-xl text-yellow-500 text-center">
                    Education
                  </h2>
                  <div className="py-3">
                    {profile?.education?.map((education, index) => (
                      <Education
                        key={index}
                        school={education.school}
                        fieldofstudy={education.fieldofstudy}
                        degree={education.degree}
                        description={education.description}
                        from={education.from}
                        to={education.to}
                        current={education.current}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full pt-0 md:pt-1 github-repos-container">
              <div>
                <h3 className="text-center mb-5 text-yellow-500 text-2xl font-medium md:font-semibold  md:my-4 md:py-2">
                  Github Reposts
                </h3>
                <GithubRepos username={profile?.githubUsername} />
              </div>
              <div className="h-28 md:h-36 md:mt-52"></div>
            </div>
          </div>
        </div>
      </main>
      <SmallMediaNav />
    </div>
  );
};

export default Profile;
