import Image from "next/image";
import { MagnifyingGlassIcon, HomeIcon } from "@heroicons/react/24/outline";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Avatar from "@mui/material/Avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../redux/slices/modalSlice";

export const Header = () => {
  const { show } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-20 border-b shadow-sm flex justify-between bg-white max-w-6xl mx-5 lg:mx-auto">
      <div
        onClick={() => router.push("/")}
        className="relative w-24 h-10  hidden lg:inline-grid cursor-pointer"
      >
        <Image
          fill
          src="https://links.papareact.com/ocw"
        />
      </div>
      <div
        onClick={() => router.push("/")}
        className="relative w-10 h-10 lg:hidden cursor-pointer"
      >
        <Image
          fill
          src="https://links.papareact.com/jjm"
        />
      </div>
      <div className="relative flex items-center cursor-pointer h-10 max-w-[250px]">
        <div className="absolute left-1 top-[10px] inset-y-0 pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        </div>
        <input
          className="w-full font-semibold bg-gray-100 pl-8 p-3 h-7 rounded-md  focus:ring-black text-sm"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center justify-end space-x-4">
        <HomeIcon
          onClick={() => router.push("/")}
          className="navBtn h-6"
        />
        {session ? (
          <>
            <MenuOutlinedIcon className="md:hidden cursor-pointer" />
            <div className="relative">
              <div className="hidden md:flex z-10 w-5 h-5 text-white text-xs absolute top-[-5px] right-[-5px] bg-red-500 rounded-full  items-center justify-center animate-pulse">
                3
              </div>
              <SendOutlinedIcon className="navBtn -rotate-45 -translate-y-1" />
            </div>
            <AddCircleOutlineOutlinedIcon
              onClick={() => dispatch(showModal())}
              className="navBtn"
            />
            <PeopleAltOutlinedIcon className="navBtn" />
            <FavoriteBorderOutlinedIcon className="navBtn" />
            <Avatar
              onClick={signOut}
              className="h-8 w-8"
              alt="user img"
              src={session.user?.image}
            />
          </>
        ) : (
          <button onClick={signIn}>Sign Up</button>
        )}
      </div>
    </header>
  );
};
