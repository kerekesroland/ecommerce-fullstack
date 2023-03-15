import "./Avatar.scss";
import EditIcon from "@mui/icons-material/Edit";
import ProfilePopup from "../ProfilePopup/ProfilePopup";
import { useState } from "react";

type Props = {
  src: string;
  alt?: string;
  file: any;
  setFile: React.Dispatch<React.SetStateAction<any>>;
  profileImage?: string;
  setProfileImage?: React.Dispatch<React.SetStateAction<string>>;
  setShouldAnimate?: React.Dispatch<React.SetStateAction<boolean>>;
  handleUploadProfile: Function;
  isLoading: boolean;
};

const Avatar = ({
  src,
  alt,
  file,
  setFile,
  profileImage,
  setProfileImage,
  handleUploadProfile,
  setShouldAnimate,
  isLoading,
}: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div className="avatar-container">
      <div className="img-container">
        <img
          className="avatar"
          src={profileImage ? profileImage : src}
          alt={alt}
        />
        <div
          className="edit-btn-container"
          onClick={() => {
            setProfileImage?.("");
            setVisible(true);
          }}
        >
          <EditIcon className="edit-btn" />
        </div>
      </div>
      <ProfilePopup
        handleUploadProfile={handleUploadProfile}
        visible={visible}
        setVisible={setVisible}
        file={file}
        setFile={setFile}
        profileImage={profileImage}
        setProfileImage={setProfileImage}
        setShouldAnimate={setShouldAnimate}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Avatar;
