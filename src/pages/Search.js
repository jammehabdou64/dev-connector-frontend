import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link, useSearchParams } from "react-router-dom";
import { getApi } from "../Api";
import Spinner from "../components/Spinner";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [searchUsers, setSearchUser] = useState([]);
  const [searchQuery] = useSearchParams();
  const query = searchQuery.get("name");

  useEffect(() => {
    const searchUser = async () => {
      try {
        if (!query) {
          return;
        }
        const { data } = await getApi(`/search?user=${query} `);
        if (data.success) {
          return setSearchUser(data?.message);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    searchUser();
  }, [query]);

  return loading ? (
    <Spinner />
  ) : (
    <Layout>
      <div className="w-full">
        {searchUsers ? (
          searchUsers.map((user) => (
            <Link
              className="w-full bg-black hover:bg-gray-950 px-2 py-3 mb-2 items-center flex gap-4"
              key={user?._id}
              to={`/profile/${user?.name.replace(/\s/, "-")}/${user?._id}`}
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-10 h-10 sm:h-14 sm:w-14 rounded-full"
              />

              <p>{user?.name}</p>
            </Link>
          ))
        ) : (
          <h2>No user with the name {query} found</h2>
        )}
      </div>
    </Layout>
  );
};

export default Search;
