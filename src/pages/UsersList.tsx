import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../reducers/usersListSlice";
import TotalUsers from "./TotalUsers";
import TotalSolde from "./Solde";
import TotalParticipation from "./TotalParticipation";
import { UserData } from "../api/interfaces";
import UserListItem from "../components/users/UserListItem";
import { API_URL } from "../api/axiosConfig";
import axios from "axios";
import { GlobalState,  resetGlobalSearch } from "../reducers/globalSlice";

type Props = {};

const UsersList = (props: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector((state: any) => state.user.users);
  const global = useSelector((state: any) => state.global);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<UserData[]>([]);
  const [noResults, setNoResults] = useState(false);

  console.log(global);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.post(`${API_URL}/admin/searchUsersByName`, {
        searchTerm: global.globalSearch,
      });
      if (response.data.length === 0) {
        setNoResults(true);
      } else {
        setSearchResults(response.data);
        setNoResults(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (global.globalSearch.trim() === "") {
      setSearchResults([]);
      return;
    }
    handleSearch();
  }, [global.globalSearch]);

  useEffect(() => {
    dispatch(resetGlobalSearch())
  }, [])
  
  const usersList = () => (
    <div className="flex flex-col w-full">
      {noResults ? (
        <div className="text-center mt-4">No data found.</div>
      ) : (
        <>
          <div className="w-full grid grid-cols-6 gap-1 userGrid rounded h-12">
            <div className="uppercase p-3 mt-2">nom</div>
            <div className="uppercase py-3 px-5 mt-2">phone</div>
            <div className="uppercase py-3 px-5 mt-2">solde</div>
            <div className="uppercase py-3 px-5 mt-2">participants</div>
            <div className="uppercase py-3 px-5 mt-2">gagnés</div>
            <div className="uppercase text-end p-3 mt-2">états</div>
          </div>
          <div>
            {searchResults.length > 0
              ? searchResults.map((user: UserData) => (
                  <UserListItem user={user} key={`lu-${user._id}`} />
                ))
              : user.map((user: UserData) => (
                  <UserListItem user={user} key={`lu-${user._id}`} />
                ))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="sectionContainer">
      <div className="listContainer">{usersList()}</div>
      <div className="widgetContainer">
        <div className="w-full">
          <TotalUsers />
        </div>
        <div className="w-full">
          <TotalSolde />
        </div>
        <div className="w-full">
          <TotalParticipation />
        </div>
      </div>
    </div>
  );
};

export default UsersList;
