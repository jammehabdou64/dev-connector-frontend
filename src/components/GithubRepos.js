import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApi } from "../Api";

const GithubRepos = ({ username }) => {
  const [loading, setLoading] = useState(true);
  const [repos, setRepo] = useState([]);

  useEffect(() => {
    const getRepos = async () => {
      try {
        if (username) {
          const { data } = await getApi(`/profile/github/repos/${username}`);
          if (data.success) {
            setRepo(data.message);
          }
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getRepos();
  }, [username]);
  return loading ? (
    <h3 className="animate-pulse font-semibold text-lg">Loading</h3>
  ) : (
    <div>
      {repos.length > 0 ? (
        repos.map((repo, index) => (
          <Link
            className="mb-3 w-full "
            to={repo?.html_url}
            target="_blank"
            key={index}
          >
            <div className="flex-1 p-2 bg-black mb-3">
              <p className="my-1 text-yellow-500  sm:text-lg font-medium ">
                {repo?.name}
              </p>
              <p className="py-1 text-sm">
                {repo?.description || "No descriptions"}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-center font-medium ">No Repo Found</h1>
      )}
    </div>
  );
};

export default GithubRepos;
