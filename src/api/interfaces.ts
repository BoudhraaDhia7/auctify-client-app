export interface loginData {
  token?: string;
  userID?: string;
  roleID?: string;
  message: string;
}

export interface UserData {
  _id: string;
  avatar: string;
  userName: string;
  phone: string;
  solde: number;
  participationCount: number;
  status: number;
}

export interface userInfos {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  avatar: string;
  address: string;
  city: string;
  email: string;
  phone: number;
  amountRecieved: number;
  amountSent: number;
  status: string;
  role: string;
  solde: number;
  wallet_code: number;
  created_at: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  files: ProductFile[];
}

export interface ProductFile {
  productPicture: string;
  filePath: string;
  fileType: string;
  fileSize: number;
}

export interface PartcipatedProduct {
  _id: string;
  total: number;
  myTotal: number;
  prodName: string;
  prodPrice: string;
  prodDescription: string;
  prodPicture: ProductFile[];
  prodBenefit: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  companyAdress: string;
  companyCity: string;
  companyCountry: string;
  companyEmail: string;
  companyPhone: string;
  prodDate: string;
}

export interface Notes {
  _id: string;
  user: string;
  title: string;
  content: string;
  noteDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  _id: string;
  transactionIdentifier: string;
  amount: number;
  profile: string;
  receiver: string;
  date: string;
  avatar: string;
}

export interface companyInfos {
  _id: string;
  userName: string;
  logo: string;
  companyName: string;
  responsable: string;
  matricule_fiscale: string;
  address: string;
  city: string;
  email: string;
  phone: number;
  amountRecieved: number;
  amountSent: number;
  status: number;
  role: string;
  solde: number;
  created_at: string;
  commerceRegister: string;
}

export interface UserSettings {
  _id: string;
  idUser: string;
  variable: string;
  value: string;
  defaultVal: boolean;
}

export interface participationInfo {
  participationCount: string;
  winCount: string;
  totalAmount: string;
  totalWon: string;
}

export interface UserInfoRecieved {
  idUser: string;
  idSocket: string;
  idProduct: string;
  nickname: string;
  avatar: string;
  amount: number;
}

export interface Classement {
  _id: string;
  betAvatar: string;
  betLastName: string;
  betUserName: string;
  betfirstName: string;
  totalSolde: number;
  totalTime: number;
}

export interface MiseSoldeSended {
  idUser : string;
  idProduct : string;
  amount : number;
  duration : number;
}

export interface AppNotification {
  _id : string;
  avatar : string;
  nickname : string;
  content : string;
  link : string;
  date : string;
  status : number
}

export interface ProductInfos {
  _id: string;
  total: number;
  prodName: string;
  prodPrice: string;
  prodDescription: string;
  prodPicture: ProductFile[];
  prodBenefit: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  companyAdress: string;
  companyCity: string;
  companyCountry: string;
  companyEmail: string;
  companyPhone: string;
  prodDate: string;
}

export interface Modified {
  acknowledged: string;
  modifiedCount: number;
  upsertedId: string;
  upsertedCount: number;
  matchedCount: number;
}

export interface RapportCompany {
  companyName : string;
  address : string;
  logo : string;
  created_at : string;
  totalProductCount : number;
  totalParticipation : number;
  totalProductsPrice : number;
  totalInProgressProds : number;
  totalEndedProds : number
}