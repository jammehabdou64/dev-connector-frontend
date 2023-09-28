import React from "react";
import { Link } from "react-router-dom";
import NavLists from "./NavLists";
import { Menu } from "@headlessui/react";
import DropDownLink from "./DropDownLink";
import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const { auth } = useSelector((state) => state.auth);
  const logoutDispatch = useDispatch();

  const logoutHandler = (event) => {
    try {
      event.preventDefault();
      logoutDispatch(logout());
      window.location.href = "/login";
      return;
    } catch (error) {}
  };
  return (
    <header className="w-full  border-b border-gray-500 z-30 text-white fixed top-0 bg-slate-900 shadow-lg">
      <div className="max-w-6xl px-2 mx-auto md:px-4 lg:px-12">
        <nav className="flex py-2 items-center md:gap-4 lg:gap-1 sm:gap-0 justify-between">
          <Link
            to={"/"}
            className="logo text-xl lg:font-extrabold font-medium sm:font-semibold text-yellow-500 sm:text-2xl md:text-3xl lg:text-4xl"
          >
            Gambtech
          </Link>

          <div className="search flex-1 max-w-[300px] sm:w-[300px] md:max-w-[400px]">
            <form
              action=""
              method="get"
              className=" bg-gray-600 w-full rounded-full  "
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
          <NavLists
            cssStyle={"sm:flex gap-4 items-center  hidden "}
            run={false}
          />
          <div className="inline-block sm:hidden">
            <Menu
              as={"div"}
              className="headlessui-menu-container relative  inline-block"
            >
              <Menu.Button>
                <div className="mt-[2px]">
                  <img
                    alt={auth?.user ? auth?.user.name : auth?.name}
                    src={auth?.user ? auth?.user.avatar : auth.avatar}
                    className="rounded-full w-7 h-7 object-center"
                  />
                  {/* <p className="inline-block sm:hidden">me</p> */}
                </div>
              </Menu.Button>
              <Menu.Items
                className={
                  "absolute bg-gray-900 right-0 w-40  origin-top-right shadow-lg"
                }
              >
                <Menu.Item>
                  <DropDownLink
                    to={"/change-password"}
                    className="dropdown-link"
                  >
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
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
