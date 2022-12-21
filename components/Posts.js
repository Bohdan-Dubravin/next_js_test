import { useEffect, useState } from "react";
import getUsers from "../utils/faker";
import Post from "./Post";

const Posts = () => {
  const data = [
    {
      id: "123",
      username: "Name",
      userImg: "https://links.papareact.com/3ke",
      img: "https://links.papareact.com/3ke",
      caption: "SUBSCRIBE RIGHT NOW THEN SOONER THAN BETTER!!!",
    },
    {
      id: "123",
      username: "Name",
      userImg: "https://links.papareact.com/3ke",
      img: "https://links.papareact.com/3ke",
      caption: "SUBSCRIBE RIGHT NOW THEN SOONER THAN BETTER!!!",
    },
    {
      id: "123",
      username: "Name",
      userImg: "https://links.papareact.com/3ke",
      img: "https://links.papareact.com/3ke",
      caption: "SUBSCRIBE RIGHT NOW THEN SOONER THAN BETTER!!!",
    },
    {
      id: "123",
      username: "Name",
      userImg: "https://links.papareact.com/3ke",
      img: "https://links.papareact.com/3ke",
      caption: "SUBSCRIBE RIGHT NOW THEN SOONER THAN BETTER!!!",
    },
    {
      id: "123",
      username: "Name",
      userImg: "https://links.papareact.com/3ke",
      img: "https://links.papareact.com/3ke",
      caption: "SUBSCRIBE RIGHT NOW THEN SOONER THAN BETTER!!!",
    },
  ];
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const users = [...Array(20)].map((_, i) => {
  //     return getUsers();
  //   });
  //   setPosts(users);
  //   console.log("worked");
  // }, []);

  return (
    <div className="">
      {data.map((d) => {
        return (
          <Post
            key={d.id}
            data={d}
          />
        );
      })}
    </div>
  );
};

export default Posts;
