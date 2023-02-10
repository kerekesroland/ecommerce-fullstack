import { auth } from "../../firebase/config";
import "./ProfileInfo.scss";
type Props = {};

const ProfileInfo = (props: Props) => {
  const user = auth?.currentUser;
  return (
    <div className="profile-info">
      <span className="username">{user?.displayName}</span>
      <span className="user-email">{user?.email}</span>
    </div>
  );
};

export default ProfileInfo;
