import React from "react";

interface Props {
  label1: string;
  label2: string;
  label3: string;
  value1: string;
  value2: string;
  value3: string;
}

const CardHeader: React.FC<Props> = ({
  value1,
  value2,
  value3,
  label1,
  label2,
  label3,
}) => {
  return (
    <div className="card">
      <div className="flex flex-col justify-center">
        <div className="title">{label1}</div>
        <div className="values">{value1}</div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="title">{label2}</div>
        <div className="values">{value2}</div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="title">{label3}</div>
        <div className="values">{value3}</div>
      </div>
    </div>
  );
};

export default CardHeader;
