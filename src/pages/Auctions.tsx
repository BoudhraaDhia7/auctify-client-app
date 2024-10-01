import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { SOCKET_URL } from "../api/axiosConfig";

const socket = io(SOCKET_URL);

type AuctionsProps = {};

const Auctions: React.FC<AuctionsProps> = (props: AuctionsProps) => {
  return <div className="flex justify-between"></div>;
};

export default Auctions;
