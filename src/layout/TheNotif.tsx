import React, { useEffect } from "react";
import { AppNotification } from "../api/interfaces";
import { Link } from "react-router-dom";
import moment from "moment";
import { PICT_URL } from "../api/axiosConfig";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";

type Props = {
    notif : AppNotification;
    closeNotif : () => void;
};

const TheNotif = ( {notif, closeNotif} : Props ) => {

    const pict = notif.avatar.includes("http") ? notif.avatar : PICT_URL + notif.avatar;

    useEffect(() => {
        const timer = setTimeout(() => {
          closeNotif();
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

  return (

    <motion.div className="alert-container the-alert-container"
        initial = {{ opacity: 0, y : 100 }}
        animate = {{ opacity: 1, y : 0 }}
        exit = {{ opacity: 0, y : 100 }}
    >
        <div className="container">
            <div className="item">
                <div className="avatar" style={{ backgroundImage: `url(${pict})` }}></div>
                <div className="content">
                    <div className="alert-info"><span>{notif.nickname}</span> {notif.content}</div>
                    <div className="alert-date">{moment(notif.date).fromNow()}</div>
                </div>
                <Link style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }} to={notif.link} onClick={() => closeNotif()}></Link>
            </div>
        </div>
        <div className="close-notif" onClick={() => closeNotif()}>
            <AiOutlineClose size={16} color="#333" />
        </div>
    </motion.div>
);
};

export default TheNotif;
