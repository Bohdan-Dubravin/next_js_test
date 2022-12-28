import { useEffect, useState } from "react";
import getUsers from "../utils/faker";

const Suggestions = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const users = [...Array(5)].map((_, i) => {
      return getUsers();
    });
    setPosts(users);
    console.log("worked");
  }, []);
  return (
    <div className="mt-4 ml-[20px]">
      <div className="flex justify-between mb-5">
        <h4 className="text-sm font-bold text-gray-400">Suggestions for you</h4>
        <button className=" font-semibold text-gray-600">See all</button>
      </div>
      {posts &&
        posts.map((profile) => {
          return (
            <div
              key={profile.userId}
              className="flex justify-between items-center mt-3"
            >
              <img
                className="w-10 h-10 rounded-full p-[2px] border"
                src={profile.avatar}
                alt={profile.username}
              />
              <div className="ml-4">
                <h3 className="font-semibold text-sm">{profile.username}</h3>
              </div>
              <button className="text-blue-500 text-sm font-semibold">
                Follow
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default Suggestions;
