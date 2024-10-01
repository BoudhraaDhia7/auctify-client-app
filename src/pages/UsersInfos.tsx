import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "swiper/css";
import CardHeader from "../components/cardHeader";
import {
  PartcipatedProduct,
  userInfos,
  Transaction,
  participationInfo,
} from "../api/interfaces";
import ParticipProducts from "../components/products/participProduct";
import UserNotes from "./UserNotes";
import { useForm } from "react-hook-form";
import { API_URL } from "../api/axiosConfig";
import NotesModal from "../components/notesModal";

type Props = {};

interface Note {
  _id: string;
  user: string;
  title: string;
  content: string;
  noteDate: string;
  created_at: string;
  updatedAt: string;
  __v: number;
  id: string;
}

const UsersInfos = (props: Props) => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [avatar, setAvatar] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [participations, setParticipations] = useState<PartcipatedProduct[]>(
    []
  );
  const [userInfos, setUserInfo] = useState<userInfos | undefined>();
  const [praticipationInfos, setPraticipationInfos] = useState<
    participationInfo | undefined
  >();
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const handleHeaderClick = () => {
    setShowModal(true);
  };

  const formatDate = (timestamp: any) => {
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

  const fetchNote = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/admin/getNotesByUserId/${id}`
      );
      setNotes(response.data.UsersNotes);
      
    } catch (error) {
      console.log("An error occurred while fetching user notes");
    }
  };


  const onSubmit = async (data: any) => {
    try {
      const { title, content } = data;
      const response = await axios.post(`${API_URL}/admin/createNote/${id}`, {
        title,
        content,
      });
      console.log(response.data);
      setShowModal(false);
      setNotes(v => [...notes, response.data]);
    } catch (error: any) {
      console.error(error.response.data);
    }
  };
  useEffect(() => {
    fetchNote();
    Promise.all([
      axios.get(`${API_URL}/auth/getInfosByUserId/${id}`),
      axios.get(`${API_URL}/auth/getTransactionsByUser/${id}`),
      axios.get(`${API_URL}/participant/getProductsParticipatedByUser/${id}`),
      axios.get(`${API_URL}/participant/participationInfos/${id}`),
    ])
      .then(
        ([
          infosResponse,
          transactionsResponse,
          participResponse,
          participationInfo,
        ]) => {
          setUserInfo(infosResponse.data);
          setTransactions(transactionsResponse.data.UserTransactions);
          setParticipations(participResponse.data);
          setPraticipationInfos(participationInfo.data);
        }
      )
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div className="w-full h-full">
      <NotesModal
        showModal={showModal}
        onSubmit={handleSubmit(onSubmit)}
        setShowModal={setShowModal}
        register={register}
        errors={errors}
      />

      <div className="detailsRow">
        <div className="cardDetailsContainer width60">
          <div className="profileContent">
            <div className="profileAvatar">
              <div className="avatar">
                <img
                  src={
                    avatar.startsWith("http") ? avatar : `${userInfos?.avatar}`
                  }
                  alt=""
                />
              </div>
              <div className="avatarName">
                {userInfos?.firstName + " " + userInfos?.lastName}
              </div>
              <div className="avatarName">{userInfos?.userName}</div>
              <div className="profileInfos">
                <div className="profileRow ProfileDate">
                  {formatDate(userInfos?.created_at)}
                </div>

                <div className="profileRow profileGrid">
                  <div className="profileGridItem">
                    <div className="label">email</div>
                    <div className="value">{userInfos?.email}</div>
                  </div>
                  <div className="profileGridItem">
                    <div className="label">Mobile</div>
                    <div className="value">{userInfos?.phone}</div>
                  </div>
                </div>
                <div className="profileRow">
                  <div className="profileGridItem">
                    <div className="label">Adresse</div>
                    <div className="value">{userInfos?.address}</div>
                  </div>
                </div>
                <div className="profileRow profileGrid">
                  <div className="profileGridItem">
                    <div className="label">Ville</div>
                    <div className="value">{userInfos?.city}</div>
                  </div>
                  <div className="profileGridItem">
                    <div className="label">Pays</div>
                    <div className="value">Tunisie</div>
                  </div>
                </div>
                <div className="">
                  <div className="profileRow flex ">
                    <div className="px-2 py-1">
                      {userInfos?.status == "1" ? (
                        <div className="h-2.5 w-2.5 rounded-full  bg-green-500 "></div>
                      ) : (
                        <div className="h-2.5 w-2.5 rounded-full  bg-red-700 "></div>
                      )}
                    </div>
                    <div className="ProfileDate">Utilisateur</div>
                    <div className="ml-1 ProfileDate">
                      {userInfos?.status == "1" ? (
                        <div className="ProfileDate">actif</div>
                      ) : (
                        <div className="ProfileDate">inactif</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cardDetailsContainer width40">
          <div className="header">Solde balance</div>
          <div className="content">
            <CardHeader
              label1="REVENUS"
              label2="DEPENSES"
              label3="SOLDE"
              value1={userInfos ? userInfos?.amountRecieved.toString() : "0"}
              value2={userInfos ? userInfos?.amountSent.toString() : "0"}
              value3={userInfos ? userInfos?.solde.toString() : "0"}
            />
            <div className="flex flex-col">
              <div className="title2">Derniers Transactions</div>
              <div>
                <div className="">
                  {transactions.slice(-4).map((transaction) => (
                    <div key={transaction._id}>
                      <div className="flex flex-row justify-between transactionDetails items-center">
                        <div className="flex justify-between ">
                          <img
                            src={
                              userInfos?.avatar.startsWith("http")
                                ? userInfos?.avatar
                                : `${API_URL}/${avatar}`
                            }
                            alt=""
                            width="70"
                            className="rounded-full mr-2"
                          />
                          <div>
                            <div className="transactionDate ">
                              {formatDate2(transaction.date)}
                            </div>
                            <div className="dannosWalletStyle">
                              Solde Wallet
                            </div>
                            <div className="AlimentationStyle">
                              Alimentation portefeuil
                            </div>
                          </div>
                        </div>
                        <div
                          className="mr-4"
                          style={{ fontWeight: "bold", fontSize: 24 }}
                        >
                          {transaction.amount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="detailsRow">
        <div className="cardDetailsContainer width40">
          <div className="content">
            <UserNotes userId={id} notes={notes} />

            <div className="notebtn m-2" onClick={handleHeaderClick}>
              Nouvelle Note
            </div>
          </div>
        </div>
        <div className="cardDetailsContainer width60">
          <div className="header">Participations</div>
          <div className="content">
            <CardHeader
              label1="REMPORTER"
              label2="Montant DEPONSE"
              label3="MONTANT GAGNE"
              value1={
                praticipationInfos
                  ? `${praticipationInfos.winCount}/${praticipationInfos.participationCount}`
                  : "0"
              }
              value2={
                praticipationInfos
                  ? praticipationInfos?.totalAmount.toString()
                  : "0"
              }
              value3={
                praticipationInfos
                  ? praticipationInfos?.totalWon.toString()
                  : "0"
              }
            />

            <div className="participProductContainer">
              {participations &&
                participations
                  .slice(-4)
                  .map((participation) => (
                    <ParticipProducts participation={participation} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersInfos;
