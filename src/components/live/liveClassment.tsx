import React, { useState, useEffect } from "react";
import { toUtcDate } from "../../utils/helpers";
import { Classement, UserInfoRecieved } from "../../api/interfaces";



type Props = {
    classment: Classement[];
};

export const LiveClassment = ({ classment }: Props) => {

   
  
  return (
    <div className="live-Classment ">
      {
        classment.map((c, i) => 
          <div className="live-Classment-item" key={`cl-${i}`}>
            <div className="rankContainer">
              <div className="rank">{i+1}</div>
              <div className="avatar" style={{ backgroundImage: `url(${c.betAvatar})` }}></div>
              <div className="avatar-name">{c.betUserName}</div>
            </div>
            <div className="dannos">{c.totalSolde}</div>
          </div>
        )
      }
    </div>
  );
};

export default LiveClassment;
