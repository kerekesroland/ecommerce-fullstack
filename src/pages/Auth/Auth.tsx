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
  const navigate = useNavigate();
  const [isSignedUpMode, setIsSignedUpMode] = useState<boolean>(false);
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
      .then(() => {
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
            <form className="sign-up" onSubmit={handleSubmit(onRegister)}>
              <div className="top">
                <h2>Create account!</h2>
              </div>
              <div className="center">
                <div className="inputs">
                  <div className="input-container">
                    <input
                      {...register("username")}
                      type="text"
                      minLength={4}
                      placeholder="Username"
                      required
                    />
                  </div>
                  <p className="validation-error">{errors.username?.message}</p>
                  <div className="input-container">
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      {...register("email")}
                    />
                  </div>

                  <p className="validation-error">{errors.email?.message}</p>

                  <div className="input-container">
                    <input
                      className="password"
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Password"
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
                      placeholder="Confirm password"
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
                <button type="submit">Sign Up</button>
                <p className="no-account toggle" onClick={handleToggle}>
                  Already a member?{" "}
                  <span className="sign-in-btn"> Sign in </span>
                </p>
                <p className="no-account">
                  I agree to the terms of services by signing up
                </p>
              </div>
            </form>

            <form className="sign-in" onSubmit={handleSubmitLoginForm(onLogin)}>
              <div className="top">
                <h2>Welcome back!</h2>
              </div>
              <div className="center">
                <div className="inputs">
                  <div className="input-container">
                    <input
                      {...registerLoginField("email")}
                      type="email"
                      placeholder="Email"
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
                      placeholder="Password"
                      required
                    />
                  </div>
                  <p className="validation-error">
                    {loginFormErrors.password?.message}
                  </p>
                </div>
              </div>
              <div className="bottom">
                <button type="submit">Sign In</button>
                <div className="google-provider">
                  <GoogleSignInButton
                    onClick={() => authService.signInWithGoogle()}
                  />
                </div>
                <p className="no-account toggle" onClick={handleToggle}>
                  Don't have an account?
                  <span className="sign-up-btn">Sign up</span>
                </p>
                <p className="forgot-password">Forgot your password?</p>
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
