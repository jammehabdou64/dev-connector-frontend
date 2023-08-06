import React from "react";
import { Menu } from "@headlessui/react";
import DropDownLink from "./DropDownLink";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavLists from "./NavLists";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logoutHandler = (event) => {
    try {
      event.preventDefault();
      dispatch(logout());
      window.location.href = "/login";
      return;
    } catch (error) {}
  };
  return (
    <header className="w-full  border-b border-gray-500 z-30 text-white fixed top-0 bg-slate-900 shadow-lg">
      <div className="max-w-6xl px-2 mx-auto md:px-4 lg:px-12">
        <nav className="flex py-2 items-center gap-2 sm:gap-0 justify-between">
          <Link
            to={"/"}
            className="logo text-lg lg:font-extrabold  font-medium sm:font-semibold text-yellow-500 sm:text-xl"
          >
            Gambtech
          </Link>

          <div className="search ">
            <form
              action=""
              method="get"
              className=" bg-gray-600 rounded-full  md:w-72 "
            >
              <input
                type="search"
                name=""
                id=""
                className="w-full p-1 sm:p-2 rounded-full outline-none bg-inherit"
                placeholder="search ...."
              />
            </form>
          </div>
          <NavLists cssStyle={"sm:flex space-x-6  hidden "} run={false} />
          <Menu
            as={"div"}
            className="headlessui-menu-container relative  inline-block"
          >
            <Menu.Button>
              <img
                alt={auth?.user ? auth?.user.name : auth?.name}
                src={auth?.user ? auth?.user.avatar : auth.avatar}
                className="rounded-full w-[29px] h-[29px] sm:h-[32px] sm:w-[32px] object-center"
              />
            </Menu.Button>
            <Menu.Items
              className={
                "absolute bg-gray-900 right-0 w-40  origin-top-right shadow-lg"
              }
            >
              <Menu.Item>
                <DropDownLink to={"/change-password"} className="dropdown-link">
                  change password
                </DropDownLink>
              </Menu.Item>
              <Menu.Item>
                <DropDownLink
                  to={"/logout"}
                  onClick={logoutHandler}
                  className="dropdown-link"
                >
                  logout
                </DropDownLink>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </nav>
      </div>
    </header>
  );
};

export default Header;
