import React, { useEffect, useState } from "react";
import Notification from "./Notification";
import { getNotification } from "../api/actions";
import { AppNotification } from "../api/interfaces";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setAppNotifications } from "../reducers/globalSlice";
type Props = {
  closeNotifs : () => void;
};



const HeaderAlerts = ({ closeNotifs }: Props) => {

  const dispatch = useDispatch<any>();
  const global = useSelector((state: any) => state.global);

  const alertWindow:any = React.useRef<HTMLDivElement>();

  useOnClickOutside(alertWindow, () => closeNotifs());

  const [ notifications, setNotifications ] = useState<AppNotification[]>([]);
  

  const onGetNofifications = async() => {
    const notifs = await getNotification();
    if (notifs) dispatch(setAppNotifications(notifs))
  }

  useEffect(() => {
    onGetNofifications();
  }, [])

  return (
    <motion.div className="alert-container" ref={alertWindow}
      initial={{x: 300, opacity: 0}}
      animate={{x: 0, opacity: 1}}
      exit={{x: 300, opacity: 0}}
    >
        <div className="header">Notifications</div>
        <div className="container">
          {
            global.appNotifications.map((n: AppNotification, i: number) => 
              <Notification key={`n-${i+1}`} data={n} closeNotif={closeNotifs} />
            )
          }
          
        </div>
    </motion.div>
  );
};

export default HeaderAlerts;
