import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import * as yup from "yup";
import { Formik } from "formik";
import Input from "../components/input";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../reducers/errorSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { appLogin } from "../api/actions";
import { setAccesToken } from "../api/axiosConfig";
import { fetchUserInfo } from "../reducers/currentUserSLice";

type Props = {};
interface InitialValues {
  userName: string;
  password: string;
}
const Login = ({}: Props) => {
  const dispatch = useDispatch();
  const initialValues: InitialValues = {
    password: "",
    userName: "",
  };
  const ValidationSchema = yup.object({
    userName: yup.string().min(3).required(),
    password: yup.string().required(),
  });
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const { message } = useSelector((state: any) => state.error);

  const login = async (values: InitialValues) => {
    try {
      const result = await appLogin(values.userName, values.password);
      if (!result) {
        dispatch(setError(result));
      }
      if (result?.roleID && result?.userID && result?.token) {
        setAccesToken(result.token);
        localStorage.setItem("access_token", result.token);
        localStorage.setItem("userID", result.userID);
        localStorage.setItem("roleID", result.roleID);

        if (result.roleID == "2") {
          navigate("/dashboard");
        }
        if (result.roleID == "1") {
          navigate("/dashboard");
        }
      } else {
        dispatch(setError({ message: result?.message }));
        toast.error(result?.message);
      }
      // console.log(result);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="appbg flexmode">
      <div className="loginContainer">
        <div className="flex items-center justify-center basis-[50%] ">
          <img alt="logo" src={logo} width={240} />
        </div>
        <div className="flex  flex-grow  ">
          <Formik
            validationSchema={ValidationSchema}
            initialValues={initialValues}
            onSubmit={async (values) => {
              await login(values);
            }}
          >
            {({ values, handleSubmit, errors, isValid, handleChange }) => (
              <div className=" flex  w-full items-center justify-center flex-col">
                <p className="logintitle self-start">Connectez-Vous</p>
                <Input
                  errors={errors}
                  handleChange={handleChange}
                  label="Email/mobile"
                  name="userName"
                  id="userName"
                  type="text"
                />
                <Input
                  errors={errors}
                  handleChange={handleChange}
                  label="Mot de passe"
                  name="password"
                  id="password"
                  type="password"
                />

                <Link to={"/forgotPassword"} className="loginForgetpass">
                  Mot de Passe oublié ?
                </Link>
                <button
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="loginSubmit"
                >
                  Connexion
                </button>
              </div>
            )}
          </Formik>
          {message && <ToastContainer autoClose={3000} />}
        </div>
      </div>
    </div>
  );
};

export default Login;
