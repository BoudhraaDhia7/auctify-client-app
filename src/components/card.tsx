import React from "react";

interface Props {
  title?: string;
  value: number;
  label1: string;
  label2: string;
  value1: number;
  value2: number;
}

const Card: React.FC<Props> = ({
  title,
  value,
  label1,
  label2,
  value1,
  value2,
}) => {
  return (
    <div className="statcard ">
      <div className="box-content h-32 border-1 rounded-xl flex flex-col ">
        <div className="py-1 px-6">
          <div className="mt-4 statprincipalTitle">{title}</div>
          <div className="statprincipalvalue">{value}</div>
        </div>
        <div className=" flex  rounded-b-lg px-6 py-2 bg-white  justify-between uppercase font-bold">
          <div className="text-xs">
            <div className="statlabel stat-green">{label1}</div>
            <div>{value1}</div>
          </div>
          <div className="text-xs">
            <div className="statlabel stat-red ">{label2}</div>
            <div className="text-end"> {value2}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
