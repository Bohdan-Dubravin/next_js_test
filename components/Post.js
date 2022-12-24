import { Avatar } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Image from 'next/image';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
const Post = ({ data }) => {
  const { id, username, userImg, img, caption } = data;

  return (
    <div className="bg-white rounded-sm border my-7">
      <div className="flex items-center p-5">
        <Avatar src={userImg} alt={username} className="mr-2" />
        <p className="flex-1 font-bold">{username}</p>
        <MoreHorizIcon className="cursor-pointer" />
      </div>
      <div className="relative w-full h-[500px]">
        <Image src={userImg} fill className="object-cover" />
      </div>
      <div className="flex justify-between p-4">
        <div className="flex space-x-4">
          <FavoriteBorderOutlinedIcon className="btn" />
          {/* <FavoriteIcon color="error" /> */}
          <SmsOutlinedIcon className="btn" />
          <SendOutlinedIcon className="btn" />
        </div>
        <BookmarkBorderOutlinedIcon className="btn" />
      </div>
      <div className="p5 truncate p-4">
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </div>

      <form className="flex items-center p-4">
        <SentimentSatisfiedAltOutlinedIcon className=" mr-2" />
        <input
          type="text"
          placeholder="Add a comment..."
          className="border-none flex-1 outline-none"
        />
        <button className="text-blue-500 font-semibold">Post</button>
      </form>
    </div>
  );
};

export default Post;
