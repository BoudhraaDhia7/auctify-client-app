import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../api/actions";
import { setAppNotifications } from "../reducers/globalSlice";
import { disconnectSocket, initiateSocket, onNotifications } from "../components/socket/socket";
import { AnimatePresence } from "framer-motion";
import { AppNotification } from "../api/interfaces";
import TheNotif from "./TheNotif";

type Props = {};


const NewNotif = (props: Props) => {

    const dispatch = useDispatch<any>();
    const global = useSelector((state: any) => state.global);

    const [ isNotif, setIsNotif ] = useState<boolean>(true);
    const [ notif, setNotif ] = useState<AppNotification|null>(null);


    const getGlobalNotifs = async() => {
        const notifs = await getNotification();
        if (notifs) dispatch(setAppNotifications(notifs))
    }

    useEffect(() => {
        getGlobalNotifs();
    }, [])

    useEffect(() => {
        initiateSocket();
        onNotifications((err: any, data: AppNotification) => {
            if (err) return;
            getGlobalNotifs();
            setNotif(data)
            setIsNotif(true);
        });
        return () => disconnectSocket();
    }, [])

    const closeNotif = () => {
        setIsNotif(false);
    }


    return (
        <div className="new-notif">
            <AnimatePresence>
                { (isNotif && notif) && <TheNotif notif={notif} closeNotif={() => closeNotif()} /> }
            </AnimatePresence>
        </div>
    );
};

export default NewNotif;
