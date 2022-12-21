import { useEffect, useState } from "react";
import getUsers from "../utils/faker";
import Post from "./Post";

const Posts = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => {
      return getUsers();
    });
    setUsers(suggestions);
    console.log("worked");
  }, []);

  return (
    <div className="">
      {users.map((user) => {
        <Post
          id={user.userId}
          user={user}
        />;
      })}
    </div>
  );
};

export default Posts;
