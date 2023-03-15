import "./Auth.scss";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useAuthSchemas } from "../../hooks/useAuthSchemas";
import { authService } from "../../api/auth/auth";
import GoogleSignInButton from "../../components/GoogleSignInBtn/GoogleSignInButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FirebaseError } from "firebase/app";
import { useTranslation } from "react-i18next";

interface IRegisterFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ILoginFormInputs {
  email: string;
  password: string;
}

const Auth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSignedUpMode, setIsSignedUpMode] = useState<boolean>(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const dynamicClass = isSignedUpMode ? "auth sign-up-mode" : "auth";
  const { registerSchema, loginSchema } = useAuthSchemas();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRegisterFormInputs>({
    resolver: yupResolver(registerSchema),
    reValidateMode: "onChange",
  });

  /**
   * @param {IRegisterFormInputs} data - The register form input data object
   * @returns {void}
   */
  const onRegister = (data: IRegisterFormInputs) => {
    const { username, email, password } = data;
    const user = { username, email, password };
    // If registration is success => move to login form
    authService
      .registerUser(user)
      .then(() => {
        setTimeout(() => {
          setIsSignedUpMode(true);
        }, 1000);
      })
      .catch((err) => console.error(err));
    reset();
  };

  const {
    register: registerLoginField,
    handleSubmit: handleSubmitLoginForm,
    reset: resetLoginForm,
    formState: { errors: loginFormErrors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(loginSchema),
    reValidateMode: "onChange",
  });

  /**
   * @param {IFormInputs} data - The login form input data object
   * @returns {void}
   */
  const onLogin = (data: ILoginFormInputs) => {
    const { email, password } = data;
    const user = { email, password };
    authService
      .loginUser(user)
      .then((data) => {
        if (data instanceof FirebaseError) {
          toast.error(t("data.errors.toast.invalid_credentials"));
          return;
        }
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((error) => console.error(error));
    resetLoginForm();
  };

  const handleToggle = () => setIsSignedUpMode(!isSignedUpMode);

  return (
    <div className={dynamicClass}>
      <div className="container">
        <div className="inner-container">
          <div className="forms-wrapper">
            <form className="sign-in" onSubmit={handleSubmitLoginForm(onLogin)}>
              <div className="top">
                <h2>{t("data.auth.welcome")}</h2>
              </div>
              <div className="center">
                <div className="inputs">
                  <div className="input-container">
                    <input
                      {...registerLoginField("email")}
                      type="email"
                      placeholder={t("data.auth.email") || "Email"}
                      required
                    />
                  </div>
                  <p className="validation-error">
                    {loginFormErrors.email?.message}
                  </p>
                  <div className="input-container">
                    <input
                      {...registerLoginField("password")}
                      type="password"
                      placeholder={t("data.auth.password") || "Password"}
                      required
                    />
                  </div>
                  <p className="validation-error">
                    {loginFormErrors.password?.message}
                  </p>
                </div>
              </div>
              <div className="bottom">
                <button type="submit">{t("data.auth.sign_in")}</button>
                <div className="google-provider">
                  <GoogleSignInButton
                    onClick={() => authService.signInWithGoogle()}
                  />
                </div>
                <p className="no-account toggle" onClick={handleToggle}>
                  {t("data.auth.no_account")}
                  <span className="sign-up-btn"> {t("data.auth.sign_up")}</span>
                </p>
                <p className="forgot-password">
                  {t("data.auth.forgot_password")}
                </p>
              </div>
            </form>
            <form className="sign-up" onSubmit={handleSubmit(onRegister)}>
              <div className="top">
                <h2>{t("data.auth.create_account")}</h2>
              </div>
              <div className="center">
                <div className="inputs">
                  <div className="input-container">
                    <input
                      {...register("username")}
                      type="text"
                      minLength={4}
                      placeholder={t("data.auth.username") || "Username"}
                      required
                    />
                  </div>
                  <p className="validation-error">{errors.username?.message}</p>
                  <div className="input-container">
                    <input
                      type="email"
                      placeholder={t("data.auth.email") || "Email"}
                      required
                      {...register("email")}
                    />
                  </div>

                  <p className="validation-error">{errors.email?.message}</p>

                  <div className="input-container">
                    <input
                      className="password"
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder={t("data.auth.password") || "Password"}
                      required
                      {...register("password")}
                    />
                    <div
                      className="input-icon-container"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? (
                        <VisibilityIcon style={{ fill: "cornflowerblue" }} />
                      ) : (
                        <VisibilityOffIcon style={{ fill: "lightslategray" }} />
                      )}
                    </div>
                  </div>

                  <p className="validation-error">{errors.password?.message}</p>

                  <div className="input-container">
                    <input
                      type="password"
                      placeholder={
                        t("data.auth.confirm_password") || "Confirm password"
                      }
                      required
                      {...register("confirmPassword")}
                    />
                  </div>
                  <p className="validation-error">
                    {errors.confirmPassword?.message}
                  </p>
                </div>
              </div>
              <div className="bottom">
                <button type="submit">{t("data.auth.sign_up")}</button>
                <p className="no-account toggle" onClick={handleToggle}>
                  {t("data.auth.already_joined") || "Already a member?"}{" "}
                  <span className="sign-in-btn">
                    {" "}
                    {t("data.auth.sign_in")}{" "}
                  </span>
                </p>
                <p className="no-account">{t("data.auth.tos")}</p>
              </div>
            </form>
          </div>
          <div className="image">
            <div className="img-wrapper">
              <img src={require("../../images/men-fashion-min.jpg")} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
