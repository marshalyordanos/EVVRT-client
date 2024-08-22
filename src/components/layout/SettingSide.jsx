import { Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/auth/authSlice";
import { NavLink } from "react-router-dom";

const SettingSide = () => {
  const user = useSelector(selectCurrentUser);
  console.log("user", user);
  return (
    <div>
      <div className="flex flex-col items-center ">
        <Avatar
          style={{
            backgroundColor: "#aa2909",
            verticalAlign: "middle",
          }}
          size={100}
          gap={2}
        >
          <p className="text-3xl uppercase">
            {user?.user?.firstName[0]}
            {user?.user?.lastName[0]}
          </p>
        </Avatar>
        <p className="text-xl capitalize leading-5 pt-2">
          {user?.user?.firstName} {user?.user?.lastName}
        </p>
        <p className="text-md leading-5 ">@{user?.user?.username}</p>
      </div>
      <div>
        <p>
          <NavLink
            to={"/setting/dashboard"}
            className={
              "p-3 block hover:bg-black hover:text-white border-b-[1px] border-gray-300"
            }
          >
            Profile
          </NavLink>
        </p>
        <p>
          <NavLink
            to={"/setting/dashboard"}
            className={
              "p-3 block hover:bg-black hover:text-white border-b-[1px] border-gray-300"
            }
          >
            Profile
          </NavLink>
        </p>
        <p>
          <NavLink
            to={"/setting/profile"}
            className={
              "p-3 block hover:bg-black hover:text-white border-b-[1px] border-gray-300"
            }
          >
            Profile
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SettingSide;
