import React, { useState, useEffect } from "react";
import {
  AiFillDelete,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineEdit,
} from "react-icons/ai";
import { UserSettings } from "../api/interfaces";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  id: string;
  title?: string;
  soldeValue: string;
  realValue: string;
  onChange: (id: any, value: string) => void;
  onSave: (id: any, v: string, val: string) => void;
  onDelete: (packId: string) => Promise<void>;
  onCancel: () => void;
  editingId: string | null;
}

const SoldePacks: React.FC<Props> = ({
  id,
  title,
  soldeValue,
  realValue,
  onDelete,
  onSave,
  onCancel,
}: Props) => {

  const dispatch = useDispatch<any>();
  const setting = useSelector((state: any) => state.settings);

  const [editing, setEditing] = useState(false);
  const [soldeVal, setSoldeVal] = useState(soldeValue);
  const [realVal, setRealVal] = useState(realValue);
  const roleID = localStorage.getItem("roleID");
  // console.log(typeof roleID);

  const handleUpdateClick = () => {
    setEditing(true);
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this pack?"
    );
    if (confirmed) {
      onDelete(id);
    }
  };

  const handleCancelClick = () => {
    setEditing(false);
    onCancel();
  };

  const handleSaveClick = () => {
    onSave(id, soldeVal, realVal);
    setEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSoldeVal(e.target.value);
  };

  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRealVal(e.target.value);
  };

  return (
    <div className="params-item">
      <div className="params-title">{title}</div>
      {editing ? (
        <div className="settings-view">
          <input
           className="sett-col-outline"
            type="text"
            defaultValue={soldeVal}
            onChange={handleInputChange}
          />

          <input
           className="sett-col-outline"
            type="text"
            defaultValue={realVal}
            onChange={handleInputChange2}
          />

            <div className="sett-actions">
              <button className="sett-action" onClick={handleSaveClick}>
                <AiOutlineCheck size={18} color="green"></AiOutlineCheck>
              </button>
              <button className="sett-action" onClick={handleCancelClick}>
                <AiOutlineClose size={18} color="red"></AiOutlineClose>
              </button>
            </div>

         
        </div>
      ) : (
        <div className="settings-view">
          <div className="sett-col">{soldeVal} {setting.appDevise}</div>
          <div className="sett-col">{realVal} {setting.devise}</div>
          {roleID == "2" && (
            <div className="sett-actions">
              <button className="sett-action" onClick={handleUpdateClick}>
                <AiOutlineEdit size={18} color="green"></AiOutlineEdit>
              </button>
              <button className="sett-action" onClick={handleDeleteClick}>
                <AiFillDelete size={18} color="red"></AiFillDelete>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SoldePacks;
