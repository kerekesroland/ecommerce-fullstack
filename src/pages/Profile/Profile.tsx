import "./Profile.scss";
import { auth } from "../../firebase/config";
import noProfile from "../../images/no_profile_picture.jpg";
import Avatar from "../../components/Avatar/Avatar";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import ProfileChips from "../../components/ProfileChips/ProfileChips";
import Separator from "../../components/Separator/Separator";
import { useEffect, useState } from "react";
import ProfilePasswordDetails from "../../components/ProfilePasswordDetails/ProfilePasswordDetails";
import ProfileOrders from "../../components/ProfileOrders/ProfileOrders";
import ProfilePlan from "../../components/ProfilePlan/ProfilePlan";
import { motion } from "framer-motion";
import { authService } from "../../api/auth/auth";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../../store/slices/loadingSlice";
import getSubscriptionId from "../../stripe/getSubscriptionId";
import usePremiumStatus from "../../stripe/usePremiumStatus";
import useAuthUser from "../../hooks/useAuthUser";

const Profile = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch: AppDispatch = useDispatch();
  const [userSubscriptionId, setUserSubscriptionId] = useState<string>("");
  const premiumStatus = usePremiumStatus();
  const user = useAuthUser();

  useEffect(() => {
    const getUserSubscription = async () => {
      if (!auth.currentUser) return;
      const subscriptionId: string = await getSubscriptionId(
        user?.uid as string
      );
      setUserSubscriptionId(subscriptionId);
    };
    getUserSubscription();
  }, [user]);

  const photoUrl = user?.photoURL ? user.photoURL : noProfile;
  const [activeChip, setActiveChip] = useState<number>(1);
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(true);
  const [profileImage, setProfileImage] = useState<string>("");
  const [file, setFile] = useState({});

  const handleUploadProfile = async () => {
    // if user is not present, stop right there
    if (!user) return;
    dispatch(toggleLoading(true));
    await authService.uploadProfilePicture(file, user, setProfileImage);
    dispatch(toggleLoading(false));
  };

  const checkActiveChip = () => {
    switch (activeChip) {
      case 1:
        return <ProfileDetails key="profile-details" />;
      case 2:
        return (
          <ProfilePasswordDetails user={user} key="profile-password-details" />
        );

      case 3:
        return <ProfileOrders user={user} key="profile-orders" />;

      case 4:
        return (
          <ProfilePlan
            userSubscriptionId={userSubscriptionId}
            premiumStatus={premiumStatus}
            key="profile-plan"
          />
        );
    }
  };

  const AnimatedComponent = () => {
    return (
      <>
        {user && (
          <>
            {shouldAnimate ? (
              <motion.div
                layout
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                {checkActiveChip()}
              </motion.div>
            ) : (
              <div>{checkActiveChip()}</div>
            )}
          </>
        )}
      </>
    );
  };

  //Observable kind of thing to keep track of the mobile menu
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = isLoading ? "hidden" : "auto";
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}

      <div className="profile-container">
        <div className="profile-image-container">
          <Avatar
            src={photoUrl}
            file={file}
            setFile={setFile}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            handleUploadProfile={handleUploadProfile}
            setShouldAnimate={setShouldAnimate}
            isLoading={isLoading}
          />
          <ProfileInfo />
        </div>
        <ProfileChips activeChip={activeChip} setActiveChip={setActiveChip} />
        <Separator />

        <AnimatedComponent />
      </div>
    </>
  );
};

export default Profile;
