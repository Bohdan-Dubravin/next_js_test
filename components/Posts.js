import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../fireBase";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapShot) => {
        console.log(snapShot);
        setPosts(snapShot.docs);
      }
    );

    return () => {
      unsub();
    };
  }, [db]);

  return (
    <div className="">
      {posts.map((post) => {
        const p = { ...post.data(), id: post.id };

        return (
          <Post
            key={p.id}
            data={p}
          />
        );
      })}
    </div>
  );
};

export default Posts;
