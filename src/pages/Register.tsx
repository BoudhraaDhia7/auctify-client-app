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
import { registerCompany } from "../api/actions";
import { setAccesToken } from "../api/axiosConfig";

type Props = {};
interface InitialValues {
  userName: string;
  password: string;
  companyName: string;
  email: string;
  phone: string;
}

const Register = ({}: Props) => {
  const dispatch = useDispatch();
  const initialValues: InitialValues = {
    userName: "",
    password: "",
    companyName: "",
    email: "",
    phone: "",
  };

  const ValidationSchema = yup.object({
    userName: yup.string().min(3).required("Le nom d'utilisateur est requis"),
    password: yup.string().min(6).required("Le mot de passe est requis"),
    companyName: yup.string().required("Le nom de l'entreprise est requis"),
    email: yup.string().email("Email invalide").required("L'email est requis"),
    phone: yup.string().required("Le numéro de téléphone est requis"),
  });

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const { message } = useSelector((state: any) => state.error);

  const register = async (values: InitialValues) => {
    try {
      const result = await registerCompany(
        values.userName,
        values.password,
        values.companyName,
        values.email,
        values.phone
      );
      
      console.log(result);
      if (!result) {
        dispatch(setError(result));
      }

      if ((result as any)?.roleID && result?.userID && result?.token) {
        setAccesToken(result.token)
        localStorage.setItem('access_token', result.token)
        localStorage.setItem('userID', result.userID)
        localStorage.setItem('roleID', (result as any).roleID)

        if ((result as any).roleID == '2') {
          navigate('/dashboard')
        }
        if ((result as any).roleID == '1') {
          navigate('/dashboard')
        }
      } else {
        dispatch(setError({ message: result?.message }))
        toast.error(result?.message)
      }

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
              await register(values);
            }}
            validateOnBlur={false}  // Disable validation on blur
            validateOnChange={false}  // Disable validation on change
          >
            {({ values, handleSubmit, errors, isValid, handleChange, setFieldTouched }) => (
              <div className="flex w-full items-center justify-center flex-col">
                <p className="logintitle self-start">Inscrivez-Vous</p>
                <Input
                  errors={errors}
                  handleChange={(e) => {
                    handleChange(e);  // Keep handling changes to update state
                    setFieldTouched(e.target.name, true, false);  // Optionally mark as touched if needed on change
                  }}
                  label="Username"
                  name="userName"
                  id="userName"
                  type="text"
                />
                <Input
                  errors={errors}
                  handleChange={(e) => {
                    handleChange(e);
                    setFieldTouched(e.target.name, true, false);
                  }}
                  label="Mot de passe"
                  name="password"
                  id="password"
                  type="password"
                />
                <Input
                  errors={errors}
                  handleChange={(e) => {
                    handleChange(e);
                    setFieldTouched(e.target.name, true, false);
                  }}
                  label="Nom l'entreprise"
                  name="companyName"
                  id="companyName"
                  type="text"
                />
                <Input
                  errors={errors}
                  handleChange={(e) => {
                    handleChange(e);
                    setFieldTouched(e.target.name, true, false);
                  }}
                  label="Email"
                  name="email"
                  id="email"
                  type="email"
                />
                <Input
                  errors={errors}
                  handleChange={(e) => {
                    handleChange(e);
                    setFieldTouched(e.target.name, true, false);
                  }}
                  label="Téléphone"
                  name="phone"
                  id="phone"
                  type="text"
                />
  
                <Link to={"/login"} className="loginForgetpass underline">
                  Déjà inscrit ? Connectez-vous
                </Link>
                <button
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="loginSubmit"
                >
                  Inscription
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

export default Register;
