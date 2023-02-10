import "./Profile.scss";
import { auth } from "../../firebase/config";
import Avatar from "../../components/Avatar/Avatar";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import Separator from "../../components/Separator/Separator";

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-image-container">
        <Avatar src={auth?.currentUser?.photoURL ?? ""} />
        <ProfileInfo />
      </div>
      <Separator />
      <ProfileDetails />
    </div>
  );
};

export default Profile;
