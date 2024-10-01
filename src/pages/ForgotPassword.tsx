import axios from "axios";
import React from "react";
import { API_URL } from "../api/axiosConfig";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";

interface FormValues {
  email: string;
}

type Props = {};

const ForgotPassword = (props: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post(
        `${API_URL}/company/forgotPassword`,
        data
      );
      console.log(response);
      toast.success(response.data.message);
      reset();
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="appbg flexmode">
      <div className="loginContainer">
        <div className="flex items-center justify-center basis-[50%] ">
          <img alt="logo" src={logo} width={240} />
        </div>
        <div className="flex  flex-grow ">
          <div className=" flex  w-full items-center justify-center flex-col">
            <p className="logintitle self-start">mot de pass oublié</p>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="loginfield w-full">
                <label className="loginlabel" htmlFor="email">
                  Your email
                </label>
                <input
                  className="logininput "
                  type="text"
                  {...register("email", { required: true })}
                />
                {errors.email && <span>Email is required</span>}
              </div>
              <button className="loginSubmit mt-2" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
        {<ToastContainer autoClose={3000} />}
      </div>
    </div>
  );
};

export default ForgotPassword;
