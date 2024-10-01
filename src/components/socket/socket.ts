import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../../api/axiosConfig";
import { AppNotification } from "../../api/interfaces";

let socket: Socket;

export const initiateSocket = () => {
  socket = io(SOCKET_URL);
  //console.log(Connecting socket..., SOCKET_URL);
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const onJoinEnchere = (cb: any) => {
  if (!socket) return true;
  socket.on("joinAuction", (msg) => {
    console.log("Websocket event received!");
    return cb(null, msg);
  });
};

export const onMiseSolde = (cb:any) => {
  if (!socket) return (true);
  socket.on('resetMise', msg => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
}

export const onUnJoinEnchere = (cb: any) => {
  if (!socket) return true;
  socket.on("UnjoinAuction", (msg) => {
    console.log("unjoin Websocket event received!");
    return cb(null, msg);
  });
};

export const onNotifications = (cb: any) => {
  if (!socket) return true;
  socket.on("newNotification", (msg) => {
    console.log("unjoin Websocket event received!");
    return cb(null, msg);
  });
};

