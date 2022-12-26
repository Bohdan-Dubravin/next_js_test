import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Image from "next/image";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../fireBase";
const Post = ({ data }) => {
  const { id, username, profileImg, image, caption } = data;
  const { data: session } = useSession();
  const [commentsList, setCommentsList] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const addedComment = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timeStamp", "desc")
      ),
      (snapShot) => {
        setCommentsList(snapShot.docs);
      }
    );
    return () => {
      addedComment();
    };
  }, [db]);

  const sendComment = async (e) => {
    e.preventDefault();
    const sendedComment = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: sendedComment,
      username: session.user.name,
      timeStamp: serverTimestamp(),
      userImage: session.user.image || "",
    });
    try {
    } catch (error) {
      console.log(error);
      setComment(sendedComment);
    }
  };

  return (
    <div className="bg-white rounded-sm border my-7">
      <div className="flex items-center p-5">
        <Avatar
          src={profileImg || ""}
          alt={username}
          className="mr-2"
        />
        <p className="flex-1 font-bold">{username}</p>
        <MoreHorizIcon className="cursor-pointer" />
      </div>
      <div className="relative w-full h-[500px]">
        <Image
          loader={() => image}
          src={image}
          fill
          className="object-cover"
          alt="post img"
        />
      </div>
      {session && (
        <div className="flex justify-between p-4">
          <div className="flex space-x-4">
            <FavoriteBorderOutlinedIcon className="btn" />
            {/* <FavoriteIcon color="error" /> */}
            <SmsOutlinedIcon className="btn" />
            <SendOutlinedIcon className="btn" />
          </div>
          <BookmarkBorderOutlinedIcon className="btn" />
        </div>
      )}
      <div className="p5 truncate p-4">
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </div>

      {session && (
        <form className="flex items-center p-4">
          <SentimentSatisfiedAltOutlinedIcon className=" mr-2" />
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Add a comment..."
            className="border-none flex-1 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            className="text-blue-500 font-semibold disabled:text-gray-400"
            onClick={sendComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
