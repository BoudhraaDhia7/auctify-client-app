import React, { useEffect, useState } from "react";
import Params from "../components/params";
import CardHeader from "../components/cardHeader";
import { useDispatch, useSelector } from "react-redux";
import { SettingsState, fetchSettings } from "../reducers/settings";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchSoldePacks } from "../reducers/dannosPacksSlice";
import SoldePacks from "../components/dannosPacks";
import { API_URL, axiosWithCred } from "../api/axiosConfig";
import { useForm } from "react-hook-form";
import { AiFillCloseCircle, AiFillPlusSquare, AiFillSave, AiOutlineCheck, AiOutlineClose, AiOutlineCloseCircle, AiOutlineCloseSquare, AiOutlineSave } from "react-icons/ai";

type Props = {};

const Parametres: React.FC<Props> = (props) => {
  const dispatch = useDispatch<any>();
  const setting = useSelector((state: any) => state.settings);
  const dannosPacks = useSelector((state: any) => state.dannosPacks);
  const { userId } = useParams();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [newPackTitle, setNewPackTitle] = useState("");
  const [newPackSoldeValue, setNewPackSoldeValue] = useState("");
  const [newPackRealValue, setNewPackRealValue] = useState("");
  const token = localStorage.getItem("access_token");
  console.log(token);
  useEffect(() => {
    dispatch(fetchSettings(userId));
    dispatch(fetchSoldePacks());
  }, [dispatch, userId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(event.target.value);
  };

  const handleSave = async (v: string, val: string) => {
    try {
      const response = await axios.patch(
        `${API_URL}/setting/updateSettingValue`,
        {
          idUser: userId,
          variable: v,
          value: val,
        }
      );
      toast.success("Value updated successfully!");

      setEditingId(null);
      dispatch(fetchSettings(userId));
    } catch (error) {
      console.error("Error updating setting:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedValue("");
  };

  const handleSave2 = async (id: any, v: string, val: string) => {
    try {
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.patch(
        `${API_URL}/setting/updateSoldePacks`,
        {
          packId: id,
          dannosValue: v,
          realValue: val,
        },
        { headers }
      );
      toast.success("Value updated successfully!");

      setEditingId(null);
      dispatch(fetchSettings(userId));
    } catch (error) {
      console.error("Error updating setting:", error);
    }
  };

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleCancel2 = () => {
    setShowForm(false);
    setNewPackTitle("");
    setNewPackSoldeValue("");
    setNewPackRealValue("");
  };

  const handleSaveNewPacks = async () => {
    try {
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        `${API_URL}/setting/createNewPack`,
        {
          title: newPackTitle,
          dannosValue: newPackSoldeValue,
          realValue: newPackRealValue,
        },
        { headers }
      );
      toast.success("New pack created successfully!");
      setShowForm(false);
      setNewPackTitle("");
      setNewPackSoldeValue("");
      setNewPackRealValue("");

      dispatch(fetchSoldePacks());
    } catch (error) {
      console.error("Error creating new pack:", error);
    }
  };

  const handleDeletePack = async (packId: string) => {
    try {
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(
        `${API_URL}/setting/deleteSoldePack/${packId}`,
        { headers }
      );
      toast.success("Pack deleted successfully!");

      dispatch(fetchSoldePacks());
    } catch (error) {
      console.error("Error deleting pack:", error);
    }
  };

  return (
    <div className="w-full h-full">
      <ToastContainer />
      <div className="detailsRow">
        <div className="cardDetailsContainer width60">
          <div className="header">Parametres</div>
          <div className="content">
            <div className="flex flex-col">
              <div>
                <div className="">
                  <div className="flex flex-row justify-between transactionDetails items-center">
                    <div className="flex justify-between w-[100%]">
                      <div style={{ width: '100%'}}>
                        {setting.settings.map((elem: any, ind: number) => (
                          <Params
                            key={`st-${ind}`}
                            id={elem._id}
                            title={elem.title}
                            variable={elem.variable}
                            userSettings={elem.matchedSettings}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            editingId={editingId}
                            onChange={handleInputChange}
                            unit={elem.unit}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cardDetailsContainer width40">
          <div className="header">Solde package</div>
          <div className="content">
            <div className="flex flex-col">
              <div className="devise-params-container">
                <div className="devise-col">
                  <div className="devise-title">App. Devise</div>
                  <input className="devise-value" placeholder={setting.appDevise} />
                </div>
                <div className="devise-col">
                  <div className="devise-title">Devise</div>
                  <input className="devise-value" placeholder={setting.devise} />
                </div>
                <div className="devise-col">
                  <div className="devise-title">Taux de change</div>
                  <input className="devise-value" placeholder={setting.changeTaux ? setting.changeTaux.toString() : "0"} />
                </div>
              </div>
              <div className="add-params-container" onClick={handleAddClick}>
                <AiFillPlusSquare size={52} color="rgba(188, 195, 249, 1)" />
                <div className="add-title" >Ajouter Pack</div>
              </div>
              <div>
                {dannosPacks.dannosPacks.map((elem: any, ind: number) => (
                  <SoldePacks
                    key={`st-${ind}`}
                    id={elem._id}
                    title={elem.title}
                    dannosValue={elem.dannosValue}
                    realValue={elem.realValue}
                    onSave={handleSave2}
                    onCancel={handleCancel}
                    editingId={editingId}
                    onChange={handleInputChange}
                    onDelete={handleDeletePack}
                  />
                ))}
              </div>
              {showForm && (
                <div className="params-item bleu-bg">
                  <input className="sett-col-outline" style={{ width: '40%' }}
                    type="text"
                    placeholder="Pack"
                    onChange={(e) => setNewPackTitle(e.target.value)}
                  />
                  <input className="sett-col-outline" style={{ width: '20%' }}
                    type="text"
                    placeholder={"valeur " + setting.appDevise}
                    onChange={(e) => setNewPackSoldeValue(e.target.value)}
                  />
                  <input className="sett-col-outline" style={{ width: '20%' }}
                    type="text"
                    placeholder={"valeur " + setting.devise}
                    onChange={(e) => setNewPackRealValue(e.target.value)}
                  />
                  
                  <div className="sett-actions">
                    <button className="sett-action" onClick={handleSaveNewPacks}>
                      <AiOutlineSave size={24} color="green"></AiOutlineSave>
                    </button>
                    <button className="sett-action" onClick={handleCancel2}>
                      <AiOutlineCloseCircle size={24} color="red"></AiOutlineCloseCircle>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parametres;
