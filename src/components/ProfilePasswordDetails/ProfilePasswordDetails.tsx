import "./ProfilePasswordDetails.scss";
import { User } from "firebase/auth";
import { authService } from "../../api/auth/auth";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { toggleLoading } from "../../store/slices/loadingSlice";

const ProfilePasswordDetails = ({ user }: { user: User | null }) => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch: AppDispatch = useDispatch();

  const updatePassword = async () => {
    if (!user) return;
    dispatch(toggleLoading(true));
    await authService.handleUpdatePasswordEmailSend(user);
    dispatch(toggleLoading(false));
  };

  return (
    <>
      {isLoading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      <div className="profile-password">
        <div>
          <h2 className="profile-password__title">Update Password</h2>
          <p className="profile-password__description">
            Ensure your account security by updating your password
          </p>
        </div>
        <div className="profile-password__content">
          <button onClick={updatePassword} className="profile-password__button">
            Update Password
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePasswordDetails;
