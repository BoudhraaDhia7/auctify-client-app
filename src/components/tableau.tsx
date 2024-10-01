import React from "react";
import {Link} from "react-router-dom";
import { API_URL } from "../api/axiosConfig";
interface Props {
  thName: string;
  thPhone: number;
  thValue: string;

  id: string;
  avatar: string;
  userName: string;
  value1: any;
  value2: any;
  value3: any;
  linkToDetails: string;
  status: number;
}

const CostumizedTable: React.FC<Props> = ({
  id,
  avatar,
  userName,
  value1,
  value2,
  value3,
  linkToDetails,
  status,
}) => {
  return (
    <div className="card ">
      <div className="box-content h-32 border-1 rounded-xl flex flex-col ">
        <div className="py-1 px-6 flex items-center">
          <img
            src={avatar.startsWith("http") ? avatar : `${API_URL}/${avatar}`}
            alt=""
            width="30"
            height="30"
            className="rounded-full mr-1"
          />
          <div className="mt-4 font-bold">{userName}</div>
        </div>
        <div className="flex justify-between uppercase font-bold py-2 px-6">
          <div className="text-xs">
            <div className="label">Phone</div>
            <div>{value1}</div>
          </div>
          <div className="text-xs">
            <div className="label">Solde</div>
            <div className="text-end">{value2}</div>
          </div>
          <div className="text-xs">
            <div className="label">Participation</div>
            <div>{value3}</div>
          </div>
          <div className="text-xs">
            <div className="label">Gagnés</div>
            <div>0</div>
          </div>
          <div className="text-xs flex items-center">
            <Link to={{ pathname: `/linkToDetails/${id}` }}>
              <button className="text-white py-1 px-6 rounded-xl mr-3 hoverable-element">
                VOIRE FICHE
              </button>
            </Link>
            {status == 1 ? (
              <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
            ) : (
              <div className="h-2.5 w-2.5 rounded-full bg-red-700"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostumizedTable;
