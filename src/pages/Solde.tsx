import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalSolde } from "../reducers/totalSoldeSlice";
import Card from "../components/card";
type Props = {};

const Solde: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { total, totalReceived, totalSent, isLoading, error } = useSelector(
    (state: any) => state.totalSolde
  );

  useEffect(() => {
    dispatch(fetchTotalSolde());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full">
      <Card
        title="Total Solde"
        value={total}
        label1="REVENUS"
        label2="DEPENSES"
        value1={totalReceived}
        value2={totalSent}
      />
    </div>
  );
};

export default Solde;
