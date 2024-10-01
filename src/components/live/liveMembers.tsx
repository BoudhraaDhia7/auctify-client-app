import React, { useState, useEffect } from "react";
import { toUtcDate } from "../../utils/helpers";
import { UserInfoRecieved } from "../../api/interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";



type Props = {
    members: UserInfoRecieved[];
};

export const LiveMembers = ({ members }: Props) => {

   
  
  return (
    <div className="live-members-container">
      <Swiper spaceBetween={5} width={30}>
                        {members.map((mm: any) => (
                          <SwiperSlide key={mm._id}>
                            <img
                              className="live-member-item"
                              src={`${mm.avatar}`}
                              alt={mm.nickname}
                              style={{ width: "30px", height: "30px" }}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
    </div>
  );
};

export default LiveMembers;
