import React from "react";
import { Link } from "react-router-dom";
import NavLists from "./NavLists";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { setModal } from "../features/modalSlice";

const Header = () => {
  const state = useSelector((state) => state);
  const { auth } = state.auth;
  const { showModal } = state.modal;
  const dispatch = useDispatch();

  return (
    <header className="w-full  border-b border-dark z-30 text-white fixed top-0 bg-black shadow-lg">
      <div className="max-w-6xl px-1 xs:px-2 mx-auto md:px-4 lg:px-12">
        <nav className="flex  py-1 items-center md:gap-4 lg:gap-1 sm:gap-0 justify-between">
          <Link
            to={"/"}
            className="logo text-lg xs:text-xl lg:font-extrabold font-medium sm:font-semibold text-yellow-500 sm:text-2xl md:text-3xl lg:text-3xl"
          >
            Gambtech
          </Link>

          <div className="search mx-1 flex-1 max-w-[300px] sm:w-[300px] md:max-w-[400px]">
            <form
              action=""
              method="get"
              className=" bg-dark w-full p-[7px] rounded-full  "
            >
              <input
                type="search"
                name=""
                id=""
                className="w-full p-[5px]   rounded-full outline-none bg-inherit"
                placeholder="search ...."
              />
            </form>
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
                alt={auth?.user ? auth?.user.name : auth?.name}
                src={auth?.user ? auth?.user.avatar : auth.avatar}
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
