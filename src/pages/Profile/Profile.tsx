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
import { User } from "firebase/auth";
import { motion } from "framer-motion";

const Profile = () => {
  const [userProfile, setUserProfile] = useState<User>();
  useEffect(() => {
    auth?.onAuthStateChanged((user) => {
      if (user) {
        setUserProfile(user);
      } else {
        setUserProfile(undefined);
      }
    });
  }, [userProfile]);
  const photoUrl = userProfile?.photoURL ? userProfile.photoURL : noProfile;
  const [activeChip, setActiveChip] = useState<number>(1);

  const checkActiveChip = () => {
    switch (activeChip) {
      case 1:
        return <ProfileDetails key="profile-details" />;
      case 2:
        return <ProfilePasswordDetails key="profile-password-details" />;

      case 3:
        return <ProfileOrders key="profile-orders" />;

      case 4:
        return <ProfilePlan key="profile-plan" />;
    }
  };

  const AnimatedComponent = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);
    return (
      <div>
        {isMounted && userProfile && (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {checkActiveChip()}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="profile-container">
      <div className="profile-image-container">
        <Avatar src={photoUrl} />
        <ProfileInfo />
      </div>
      <ProfileChips activeChip={activeChip} setActiveChip={setActiveChip} />
      <Separator />

      {<AnimatedComponent />}
    </div>
  );
};

export default Profile;
