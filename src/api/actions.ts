import { Axios, axiosWithCred } from "./axiosConfig";
import { AppNotification, Modified, ProductInfos, RapportCompany, loginData } from "./interfaces";

export async function appLogin(
  userName: string,
  password: string
): Promise<loginData | undefined> {
  try {
    const { data }: { data: loginData } = await Axios().post(
      "company/loginCompany",
      { userName, password }
    );
    return data;
  } catch (error) {
    return undefined;
  }
}

export async function getNotification(
): Promise<AppNotification[] | undefined> {
  try {
    const { data }: { data: AppNotification[] } = await axiosWithCred.get(
      "notifications/getNotifications"
    );
    return data;
  } catch (error) {
    return undefined;
  }
}

export async function getProductById(prodId : string): Promise<ProductInfos[] | undefined> {
    try {
      const { data }: { data: ProductInfos[] } = await axiosWithCred.post(
        "product/getProductById", {prodId}
      );
      return data;
    } catch (error) {
      return undefined;
    }
  }


export async function updateNotifStatus(alertId : string): Promise<Modified | undefined> {
    try {
      const { data }: { data: Modified } = await axiosWithCred.post(
        "notifications/updateNotifStatus", {alertId}
      );
      return data;
    } catch (error) {
      return undefined;
    }
}


export async function companyRapport(dateDebut : string, dateFin: string): Promise<RapportCompany[] | undefined> {
  try {
    const { data }: { data: RapportCompany[] } = await axiosWithCred.post(
      "admin/companyRapport", {dateDebut, dateFin}
    );
    return data;
  } catch (error) {
    return undefined;
  }
}



  
interface RegisterData {
  message: string;
  status: number;
  userID?: string;
  token?: string;
}

export async function registerCompany(
  userName: string,
  password: string,
  companyName: string,
  email: string,
  phone: string
): Promise<RegisterData | undefined> {
  try {
    const { data }: { data: RegisterData } = await Axios().post(
      "company/registerCompany",
      { userName, password, companyName, email, phone }
    );

    return {...data, status: 201};  
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function confirmProduct(prodId : string): Promise<Modified | undefined> {
  try {
    const { data }: { data: Modified } = await axiosWithCred.post(
      "product/confirmProduct", {prodId}
    );
    return data;
  } catch (error) {
    return undefined;
  }
}
