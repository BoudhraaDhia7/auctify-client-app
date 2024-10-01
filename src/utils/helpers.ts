import { AppNotification, Classement } from "../api/interfaces";

export const isBrowser = typeof window !== `undefined`;

export function toUtcDate(date? : string) {
    var myDate = date ? new Date(date) : new Date();
    var isoDate = new Date(myDate.getTime() + myDate.getTimezoneOffset() * 60000);
    return isoDate;
}

export function getAllMise(data : Classement[]) {

    let total = 0;
    data.forEach(el => {
        total = total + el.totalSolde;
    });

    return total
}

export function addDays(days: number) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}

export function newAppNotif(n : AppNotification[]) {
    const result = n.filter(e => e.status == 0);
    return result.length;
}

export const formatDate = (timestamp: any) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `inscrit le ${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    } a ${hour < 10 ? "0" + hour : hour}:${
      minute < 10 ? "0" + minute : minute
    }`;
  };
  const formatDate2 = (timestamp: any) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return ` ${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
  };