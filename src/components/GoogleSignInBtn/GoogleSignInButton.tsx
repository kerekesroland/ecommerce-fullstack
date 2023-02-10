import { useTranslation } from "react-i18next";
import "./GoogleSignInButton.scss";
import Logo from "../../images/google_logo.png";
import { useNavigate } from "react-router-dom";
import { NavigateFunction } from "react-router-dom";
type Props = {
  onClick: () => void;
};

const GoogleSignInButton = ({ onClick }: Props) => {
  const { t } = useTranslation();
  const navigate: NavigateFunction = useNavigate();
  const handleLogin = () => {
    onClick();
    setTimeout(() => {
      navigate("/");
    }, 500);
  };
  return (
    <div className="btn-container" onClick={handleLogin}>
      <button type="button" className="google-btn">
        {t("data.navigation.profile.login_google")}
        <img
          className="google-icon"
          src={Logo}
          width={"25px"}
          height={"25px"}
          alt=""
        />
      </button>
    </div>
  );
};

export default GoogleSignInButton;
