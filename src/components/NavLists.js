import {
  HomeIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  BellIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNotification } from "../features/notificationSlice";
import { fetchMessage } from "../features/messageSlice";
import { fetchFriendRequest } from "../features/FriendRequestSlice";
import { Menu } from "@headlessui/react";
import DropDownLink from "./DropDownLink";
import { logout } from "../features/auth/authSlice";

const NavLists = ({ cssStyle, run = false }) => {
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

  const dispatch = useDispatch();
  const {
    notification: { numsOfNotifications },
    message: { numsOfMessages },
    friendRequest: { numsOfRequest },
  } = useSelector((state) => {
    return {
      notification: state.notification,
      message: state.message,
      friendRequest: state.friendRequest,
    };
  });
  useEffect(() => {
    if (run) {
      dispatch(fetchNotification());
      dispatch(fetchMessage());
      dispatch(fetchFriendRequest());
    }
  }, [dispatch, run]);

  const navLists = [
    {
      name: "Home",
      path: "/",
      Icon: HomeIcon,
      nums: 0,
    },

    {
      name: "Find Friends",
      path: "/find-friends",
      Icon: UserGroupIcon,
      nums: numsOfRequest,
    },

    {
      name: "Jobs",
      path: "/jobs",
      Icon: BriefcaseIcon,
      nums: 0,
    },

    {
      name: "Messages",
      path: "/messages",
      Icon: EnvelopeIcon,
      nums: numsOfMessages,
    },

    {
      name: "Notfications",
      path: "/notifications",
      Icon: BellIcon,
      nums: numsOfNotifications,
    },
  ];
  return (
    <ul className={cssStyle}>
      {navLists.map(({ name, path, Icon, nums }, index) => (
        <li key={index}>
          <Link to={path}>
            <span className="flex relative top-0 justify-center">
              {<Icon className="w-7 md:w-8 " />}{" "}
              <sup
                className={`${
                  nums > 0 ? "bg-red-500  w-4 h-4 ro rounded-full" : ""
                } flex items-center  justify-center`}
              >
                {nums > 0 ? nums : ""}
              </sup>
            </span>
            <span className="text-sm  hidden lg:inline">{name}</span>
          </Link>
        </li>
      ))}
      <li className="hidden sm:inline-block">
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
              <p className="hidden lg:inline-block">me</p>
            </div>
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
      </li>
    </ul>
  );
};

export default NavLists;
