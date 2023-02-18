import "./ProfilePasswordDetails.scss";
import { ChangeEvent, useState } from "react";
import Separator from "../Separator/Separator";

const ProfilePasswordDetails = () => {
  //todo add validation schema for the passwords like the register schema
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
  return (
    <div className="profile-password">
      <div className="profile-details">
        <div className="profile-input-group">
          <div className="profile-input-container">
            <label htmlFor="username">New password</label>
            <input
              type="password"
              defaultValue={newPassword ? newPassword : ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewPassword(e.target.value)
              }
            />
          </div>
          <Separator maxWidth />
          <div className="profile-input-container">
            <label htmlFor="email">New password confirm</label>
            <input
              type="password"
              defaultValue={newPasswordConfirm ? newPasswordConfirm : ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewPasswordConfirm(e.target.value)
              }
            />
          </div>
          <Separator maxWidth />
        </div>
        <div className="profile-buttons">
          <button className="cancel">Cancel</button>
          <button className="publish">Save changes</button>
        </div>
        {/* Personal information END */}
      </div>
    </div>
  );
};

export default ProfilePasswordDetails;
