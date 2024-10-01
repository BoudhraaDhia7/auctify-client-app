import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../api/axiosConfig";
import logo from "../assets/logo.png";
type ResetPasswordData = {
  email: string;
  newPassword: string;
  confirmationNewPassword: string;
};

const ResetPassword = () => {
  const [params, _] = useSearchParams();
  const key = params.get("key");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (key) {
      const decodedToken = jwt_decode<{ _id: string; email: string }>(key);
      setEmail(decodedToken.email);
    }
  }, [key]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordData>();

  const onSubmit = async (data: ResetPasswordData) => {
    try {
      if (data.newPassword !== data.confirmationNewPassword) {
        throw new Error("Password confirmation doesn't match");
      }

      const response = await axios.post(
        `${API_URL}/company/resetPassword`,
        data
      );

      console.log(response.data.message);
      reset(); // Reset the form after successful submission
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="appbg flexmode">
      <div className="loginContainer">
        <div className="flex items-center justify-center basis-[50%] ">
          <img alt="logo" src={logo} width={240} />
        </div>
        {email ? (
          <div className="flex  flex-grow  ">
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className=" flex  w-full items-center justify-center flex-col">
                <p className="logintitle self-start">Changer mot de pass</p>

                <input type="hidden" {...register("email")} value={email} />
                <div className="loginfield">
                  <label className="loginlabel" htmlFor="newPassword">
                    New Password:
                  </label>
                  <input
                    className="logininput"
                    type="password"
                    {...register("newPassword", { required: true })}
                  />
                  {errors.newPassword && <span>New Password is required</span>}
                </div>
                <div className="loginfield">
                  <label
                    className="loginlabel"
                    htmlFor="confirmationNewPassword"
                  >
                    Confirmation
                  </label>
                  <input
                    className="logininput"
                    type="password"
                    {...register("confirmationNewPassword", {
                      required: true,
                    })}
                  />
                </div>
                {errors.confirmationNewPassword && (
                  <span>Confirmation New Password is required</span>
                )}

                <button className="loginSubmit mt-5" type="submit">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>Invalid reset key</div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
