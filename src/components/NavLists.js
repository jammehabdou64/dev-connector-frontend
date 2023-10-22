import { HomeIcon, EnvelopeIcon, BellIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNotification } from "../features/notificationSlice";
import { fetchMessage } from "../features/messageSlice";
import Modal from "./Modal";
import { setModal } from "../features/modalSlice";

const NavLists = ({ cssStyle, run = false }) => {
  const state = useSelector((state) => state);
  const { auth } = state.auth;
  const { showModal } = state.modal;

  const dispatch = useDispatch();
  const {
    notification: { numsOfNotifications },
    message: { numsOfMessages },
  } = useSelector((state) => {
    return {
      notification: state.notification,
      message: state.message,
    };
  });
  useEffect(() => {
    if (run) {
      dispatch(fetchNotification());
      dispatch(fetchMessage());
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
          <Link
            to={path}
            className="hover:text-yellow-500 hover:transition-all"
          >
            <span className="flex relative top-0 justify-center">
              {<Icon className="w-7 " />}{" "}
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
      <li className="hidden sm:inline-block hover:text-yellow-500 transition-all">
        <div
          className="mt-[2px] relative left-0 top-0  cursor-pointer  "
          onClick={() => dispatch(setModal())}
        >
          <img
            alt={auth?.user ? auth?.user.name : auth?.name}
            src={auth?.user ? auth?.user.avatar : auth.avatar}
            className="rounded-full w-7 h-7 object-center"
          />
          <p className="hidden lg:inline-block">me</p>
          {showModal ? <Modal /> : ""}
        </div>
      </li>
    </ul>
  );
};

export default NavLists;
