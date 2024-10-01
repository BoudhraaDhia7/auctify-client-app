import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalCompanies } from "../reducers/totalCompaniesSlice";
import Card from "../components/card";
type Props = {};

const TotalCompanies = (props: Props) => {
  const dispatch = useDispatch<any>();
  const { total, active, inactive, isLoading, error } = useSelector(
    (state: any) => state.totalCompanies
  );

  useEffect(() => {
    dispatch(fetchTotalCompanies());
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
        title="Total Companies"
        value={total}
        label1="Actifs"
        label2="Inactifs"
        value1={active}
        value2={inactive}
      />
    </div>
  );
};

export default TotalCompanies;
