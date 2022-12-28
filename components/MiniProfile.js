import { Avatar } from "@mui/material";
import { signOut, useSession } from "next-auth/react";

const MiniProfile = () => {
  const { data } = useSession();

  return (
    <div className="flex flex-end  items-center justify-between mt-14 ml-[20px]">
      <Avatar
        src={data?.user?.image}
        alt="user avatar"
        className="w-8 h-8 lg:w-16 lg:h-16"
      />
      <div className="flex-1 mx-4">
        <h3 className="truncate font-bold">{data?.user?.username}</h3>
        <p className="truncate text-sm text-gray-400">welcome instagram</p>
      </div>
      <button
        onClick={signOut}
        className="text-sm  font-semibold text-blue-500"
      >
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfile;
