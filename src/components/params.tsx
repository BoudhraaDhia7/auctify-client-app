import React, { useState, useEffect } from "react";
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { UserSettings } from "../api/interfaces";

interface Props {
  id: string;
  title?: string;
  variable: string;
  unit : string;
  userSettings: UserSettings[];
  onChange: (id: any, value: string) => void;
  onSave: (v: string, val: string) => void;
  onCancel: () => void;
  editingId: string | null;
}

const Params: React.FC<Props> = ({
  id,
  title,
  variable,
  userSettings,
  unit,
  onChange,
  onSave,
  onCancel,
  editingId,
}: Props) => {
  const [editing, setEditing] = useState(false);
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    const val =
      userSettings.find((el) => !el.defaultVal) ||
      userSettings.find((el) => el.defaultVal);
    if (val) {
      setTextValue(val.value);
    }
  }, [userSettings]);

  const handleUpdateClick = () => {
    setEditing(true);
    //console.log(id);
  };

  const handleCancelClick = () => {
    setEditing(false);
    onCancel();
  };

  const handleSaveClick = () => {
    onSave(variable, textValue);
    setEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
    //onChange(id, e.target.value);
  };

  return (
    <div className="params-item">
      <div className="params-title">{title} ({unit})</div>
      {editing ? (
        <div className="params-edit">
          <input
            type="text"
            defaultValue={textValue}
            onChange={handleInputChange}
          />

          <button onClick={handleSaveClick}>
            <AiOutlineCheck className="text-green-500"> </AiOutlineCheck>
          </button>

          <button onClick={handleCancelClick}>
            <AiOutlineClose className="text-red-500"></AiOutlineClose>
          </button>
        </div>
      ) : (
        <div className="params-edit">
          {textValue}
          <button style={{ marginLeft: 6, fontSize: 17}} onClick={handleUpdateClick}>
            <AiOutlineEdit></AiOutlineEdit>
          </button>
        </div>
      )}
    </div>
  );
};

export default Params;
