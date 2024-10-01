import React from "react";
import { UserData } from "../../api/interfaces";
import { Link } from "react-router-dom";
import { API_URL } from "../../api/axiosConfig";

type Props = {
  user: UserData;
};

const UserListItem = ({ user }: Props) => {
  console.log("UserListItem.tsx", user);
  return (
    <div className="w-full grid grid-cols-6 gap-1 tabRow px-2">
      <div className="uppercase text-end flex ">
        <div>
          <img
            src={
              user.avatar.startsWith("http")
                ? user.avatar
                : `${API_URL}/${user.avatar}`
            }
            alt=""
            width="30"
            height="30"
            className="rounded-full mr-1 "
          />
        </div>
        <div className="m-2 ">{user.userName}</div>
      </div>

      <div className=" uppercase p-5 ">{user.phone}</div>
      <div className=" uppercase p-5  ">{user.solde}</div>
      <div className=" uppercase p-5 ">{user.participationCount}</div>
      <div className=" uppercase p-5  ">0</div>
      <div className=" uppercase text-end p-4 flex col-span-1 justify-end items-center">
        <Link to={{ pathname: `/displayUserInfos/${user._id}` }}>
        <button className="text-white py-1 px-6 rounded-xl mr-3 hoverable-element hoverable-element">
            VOIRE FICHE
          </button>
        </Link>
        {user.status == 1 ? (
          <div className="h-2.5 w-2.5 rounded-full  bg-green-500 "></div>
        ) : (
          <div className="h-2.5 w-2.5 rounded-full  bg-red-700 "></div>
        )}
      </div>
    </div>
  );
};

export default UserListItem;
