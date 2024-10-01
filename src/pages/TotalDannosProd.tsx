import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalProds } from "../reducers/totalProdsSlice";
import Card from "../components/card";
type Props = {};

const TotalProds = (props: Props) => {
  const dispatch = useDispatch<any>();
  const { total, encours, terminer, isLoading, error } = useSelector(
    (state: any) => state.totalProds
  );
  //console.log(total);

  useEffect(() => {
    dispatch(fetchTotalProds());
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
        title="Total Products"
        value={total}
        label1="Encours"
        value1={encours}
        label2="Terminer"
        value2={terminer}
      />
    </div>
  );
};

export default TotalProds;
