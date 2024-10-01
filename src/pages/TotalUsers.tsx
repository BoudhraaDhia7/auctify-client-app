import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalUsers } from "../reducers/totalUsersSlice";
import Card from "../components/card";
type Props = {};

const totalUsers = (props: Props) => {
  const dispatch = useDispatch<any>();
  const { total, active, inactive, isLoading, error } = useSelector(
    (state: any) => state.totalUsers
  );

  useEffect(() => {
    dispatch(fetchTotalUsers());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full ">
      <Card
        title="Total Utilisateurs"
        value={total}
        label1="Actifs"
        label2="Inactifs"
        value1={active}
        value2={inactive}
      />
    </div>
  );
};

export default totalUsers;
