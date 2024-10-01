import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalParticipations } from "../reducers/totalParticipationSlice";
import Card from "../components/card";
type Props = {};

const TotalParticipation: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { totalWinners, participation, losers } = useSelector(
    (state: any) => state.totalParticipations
  );
  // console.log(totalWinners);
  useEffect(() => {
    dispatch(fetchTotalParticipations());
  }, []);
  /*
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  */

  return (
    <div className="w-full">
      <Card
        title="Participants"
        label1="GANGANTS"
        label2="PERDANS"
        value={participation}
        value1={totalWinners}
        value2={losers}
      />
    </div>
  );
};

export default TotalParticipation;
