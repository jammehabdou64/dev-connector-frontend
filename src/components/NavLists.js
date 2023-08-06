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
const NavLists = ({ cssStyle, run = false }) => {
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
              {<Icon className="w-6 " />}{" "}
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
    </ul>
  );
};

export default NavLists;
