import "./ProfileTab.scss";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
type Props = {};

const ProfileTab = (props: Props) => {
  return (
    <div className="profile-tab">
      <Link className="link" to={"/profile"}>
        <PersonIcon />
      </Link>
      <Link className="link" to={"/profile"}>
        <PersonIcon />
      </Link>
      <Link className="link" to={"/profile"}>
        <PersonIcon />
      </Link>
      <Link className="link" to={"/profile"}>
        <PersonIcon />
      </Link>
      <button className="toggle">
        <AddIcon />
      </button>
    </div>
  );
};

export default ProfileTab;
