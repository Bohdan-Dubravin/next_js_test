import { Avatar } from "@mui/material";

const Story = (props) => {
  const {
    user: { avatar, username },
  } = props;

  return (
    <div className="w-14">
      <img
        className="h-14 w-14 object-cover p-[1.5px] rounded-full border-red-500 border-2 cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
        src={avatar}
        alt={username}
      />
      <p className="truncate w-14 text-xs">{username}</p>
    </div>
  );
};

export default Story;
