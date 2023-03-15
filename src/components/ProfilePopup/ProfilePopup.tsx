import "./ProfilePopup.scss";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { auth } from "../../firebase/config";

type Props = {
  handleUploadProfile: Function;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  file: any;
  setFile: any;
  profileImage: string | undefined;
  setProfileImage: React.Dispatch<React.SetStateAction<string>> | undefined;
  setShouldAnimate?: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
};

const ProfilePopup: FC<Props> = ({
  handleUploadProfile,
  visible = false,
  setVisible,
  setFile,
  setProfileImage,
  setShouldAnimate,
  isLoading,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (!selectedFile) return;
    const fileUrl = URL.createObjectURL(selectedFile);
    setPreviewImage?.(fileUrl);
    setFile(selectedFile);
  };

  const handChangeProfile = async () => {
    setVisible(false);
    const url = await handleUploadProfile();
    if (url) {
      setProfileImage?.(url);
      setShouldAnimate?.(false);
      setShouldAnimate?.(true);
    }
    setShouldAnimate?.(true);
  };

  // Handle click outside of popup to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, setVisible]);

  // If not visible return null
  if (!visible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup" ref={popupRef}>
        <div className="desc">
          <h2>Upload profile image</h2>
          <p>Choose an image from your library to upload.</p>
        </div>
        <div className="img-preview">
          <h4>Preview</h4>
          <div className="img-container">
            <img
              src={
                previewImage ? previewImage : auth?.currentUser?.photoURL || ""
              }
              alt={"file"}
              onClick={() => {
                setShouldAnimate?.(false);
                fileInputRef?.current?.click();
              }}
            />
          </div>
          <div className="file-input-container">
            <label htmlFor="file-upload" className="file-upload-label"></label>

            <input
              ref={fileInputRef}
              style={{ display: "none" }}
              type="file"
              id="file-upload"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => {
                setShouldAnimate?.(false);
                handleFileChange(e);
              }}
            />
          </div>
        </div>
        <div className="buttons">
          <button className="cancel" onClick={() => setVisible(false)}>
            Cancel
          </button>
          <button disabled={isLoading} onClick={handChangeProfile}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
