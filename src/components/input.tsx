import React from "react";

interface Props {
  handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  label?: string;
  errors: any;
  name: string;
  id: string;
  type: string;
}

const Input: React.FC<Props> = ({
  errors,
  id,
  handleChange,
  label,
  name,
  type,
}) => {
  return (
    <div style={{ width: "100%" }}>
      <div className="loginfield">
        <label htmlFor={id} className="loginlabel">
          {label}
        </label>
        <input
          onChange={handleChange}
          name={name}
          type={type}
          id="username"
          className="logininput"
          style={{ backgroundColor: "##E8F0FE" }}
        />
      </div>
      {errors && errors[id] && <p className="loginError">{errors[id]}</p>}
    </div>
  );
};

export default Input;
