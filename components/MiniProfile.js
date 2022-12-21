import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import getUsers from "../utils/faker";

const MiniProfile = () => {
  return (
    <div className="flex flex-end  items-center justify-between mt-14 ml-[20px]">
      <Avatar
        src=""
        alt="name"
        className="w-8 h-8 lg:w-16 lg:h-16"
      />
      <div className="flex-1 mx-4">
        <h3 className="truncate font-bold">Name</h3>
        <p className="truncate text-sm text-gray-400">welcome instagram</p>
      </div>
      <button className="text-sm  font-semibold text-blue-500">Sign Out</button>
    </div>
  );
};

export default MiniProfile;
