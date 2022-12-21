import { useEffect, useState } from "react";
import getUsers from "../utils/faker";
import Story from "./Story";

const Stories = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => {
      return getUsers();
    });
    setUsers(suggestions);
  }, []);

  return (
    <div className="flex space-x-1 bg-white p-6 mt-8 border rounded-sm overflow-x-scroll scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-100 ">
      {users.length &&
        users.map((user) => {
          return (
            <Story
              key={user.userId}
              user={user}
            />
          );
        })}
    </div>
  );
};

export default Stories;
