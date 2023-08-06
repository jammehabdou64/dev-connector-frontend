import React from "react";
import NavLists from "./NavLists";

const SmallMediaNav = () => {
  return (
    <div className="bg-gray-900 fixed w-full  bottom-0  z-30 sm:hidden">
      <NavLists
        cssStyle={"flex space-x-6 px-4 py-4 justify-between "}
        run={true}
      />
    </div>
  );
};

export default SmallMediaNav;
