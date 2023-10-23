import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLists from "./NavLists";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { setModal } from "../features/modalSlice";
import { getApi } from "../Api";
import Auth from "../utils/Auth";

const Header = () => {
  const state = useSelector((state) => state);
  const [search, setSearch] = useState("");
  const [searchSuggestion, setSearchSuggestion] = useState(false);
  const [searchResults, setSearchResult] = useState([]);
  const { auth } = state.auth;
  const { showModal } = state.modal;
  const dispatch = useDispatch();

  useEffect(() => {
    if (search.length > 0) {
      return setSearchSuggestion(true);
    }
    return setSearchSuggestion(false);
  }, [search]);

  const inputChangeHadler = async (e) => {
    try {
      setSearch(e.target.value);
      if (search.length > 0) {
        const { data } = await getApi(`/search?user=${e.target.value}`);
        if (data.success) {
          return setSearchResult(data.message);
        }
      }
    } catch (error) {}
  };

  const navigate = useNavigate();
  const authUser = new Auth(auth);
  const submit = async (e) => {
    try {
      e.preventDefault();
      return navigate(`/search?name=${search}`);
    } catch (error) {}
  };

  return (
    <header className="w-full  border-b border-dark z-30 text-white fixed top-0 bg-black shadow-lg">
      <div className="max-w-6xl px-1 xs:px-2 mx-auto md:px-4 lg:px-12">
        <nav className="flex py-2 items-center md:gap-4 lg:gap-1 sm:gap-0 justify-between">
          <Link
            to={"/"}
            className="logo font-extrabold text-xs sm:text-sm text-yellow-500 uppercase"
          >
            <span className="text-xl md:text-2xl">G</span>ambtech
          </Link>

          <div className="search mx-1 flex-1 relative top-0 w-[260px] xs:w-[270px] sm:w-[300px] md:max-w-[400px]">
            <form
              action="/search"
              method="get"
              className=" bg-dark w-full p-1 rounded-full"
              onSubmit={submit}
            >
              <input
                type="search"
                name="search"
                id=""
                className="w-full p-1 sm:p-[5px]   rounded-full outline-none bg-inherit"
                placeholder="search ...."
                value={search}
                autoComplete="off"
                onChange={inputChangeHadler}
              />
            </form>
            {searchSuggestion ? (
              <div
                className={`search-suggestions shadow-2xl w-full transition-all absolute top-12 rounded-lg bg-dark z-[999] h-fit py-3 px-2`}
              >
                {searchResults.map((user) =>
                  user._id !== authUser?._id ? (
                    <Link
                      to={`/profile/${user?.name.replace(/\s/, "-")}/${
                        user?._id
                      }`}
                      onClick={() => setSearchSuggestion(false)}
                      className="w-full flex items-center gap-2 hover:bg-black px-1 py-2"
                      key={user?._id}
                    >
                      <div></div>
                      <img
                        src={user.avatar}
                        alt={user?.name}
                        className="w-8 h-8 object-cover rounded-full"
                      />
                      <span>{user?.name}</span>
                    </Link>
                  ) : (
                    ""
                  )
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <NavLists
            cssStyle={"sm:flex gap-4 items-center  hidden "}
            run={false}
          />
          <div className="inline-block sm:hidden">
            <div
              className="mt-[2px] relative left-0 top-0  cursor-pointer  "
              onClick={() => dispatch(setModal())}
            >
              <img
                alt={authUser?.name}
                src={authUser?.avatar}
                className="rounded-full w-9 h-9 object-cover"
              />
              {showModal ? <Modal /> : ""}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
