import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalProdsSolde } from "../reducers/totalProdsBenefits";
import Card from "../components/card";
type Props = {};

const TotalProdsBenefits = (props: Props) => {
  const dispatch = useDispatch<any>();
  const { totalPrice, multipliedBenefit, totalBenefit, isLoading, error } =
    useSelector((state: any) => state.totalProdsBenefits);

  useEffect(() => {
    dispatch(fetchTotalProdsSolde());
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
        title="Total products dannos"
        value={totalPrice}
        label1="Total"
        value1={multipliedBenefit}
        label2="Benefits"
        value2={totalBenefit}
      />
    </div>
  );
};

export default TotalProdsBenefits;
