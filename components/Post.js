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
import Moment from "react-moment";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../fireBase";

const Post = ({ data }) => {
  const { id, username, profileImg, image, caption } = data;
  const { data: session } = useSession();
  const [commentsList, setCommentsList] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

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

  useEffect(() => {
    const addedLike = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapShot) => {
        setLikes(snapShot.docs);
      }
    );
    return () => {
      addedLike();
    };
  }, [db]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  const likePost = async () => {
    if (!hasLiked) {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    } else {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

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
      <div className="relative w-full h-[250px] sm:h-[500px]">
        <Image
          loader={() => image}
          src={image}
          fill
          className="object-cover object-center"
          alt="post img"
        />
      </div>
      {session && (
        <div className="flex justify-between p-4">
          <div className="flex space-x-4">
            {!hasLiked ? (
              <FavoriteBorderOutlinedIcon
                onClick={likePost}
                className="btn"
              />
            ) : (
              <FavoriteIcon
                onClick={likePost}
                color="error"
              />
            )}
            <SmsOutlinedIcon className="btn" />
            <SendOutlinedIcon className="btn" />
          </div>
          <BookmarkBorderOutlinedIcon className="btn" />
        </div>
      )}
      <div className="p5 truncate p-4">
        {likes.length > 0 && (
          <p className="font-bold mb-1">
            {likes.length} {likes.length < 2 ? "Like" : "Likes"}
          </p>
        )}
        <span className="font-bold mr-1">{username}</span>
        {caption}
      </div>
      {commentsList.length > 0 && (
        <div className="ml-[20px] h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {commentsList.map((comment) => {
            return (
              <div
                key={comment.id}
                className="flex space-x-2 items-center mb-3"
              >
                <Avatar
                  src={comment.data().userImage}
                  alt="author comment img"
                  className="h-[20px] w-[20px]"
                  sx={{ width: 34, height: 34 }}
                />
                <p className="text-sm flex-1">
                  <span className="font-bold mr-2 ">
                    {comment.data().username}
                  </span>
                  {comment.data().comment}
                </p>
                <Moment
                  className="text-xs pr-5"
                  fromNow
                >
                  {comment.data().timeStamp?.toDate()}
                </Moment>
              </div>
            );
          })}
        </div>
      )}
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
