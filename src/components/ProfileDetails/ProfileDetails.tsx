import Separator from "../Separator/Separator";
import "./ProfileDetails.scss";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { ChangeEvent, useState } from "react";
import { E164Number } from "libphonenumber-js/types";
import { auth } from "../../firebase/config";

const ProfileDetails = () => {
  const [userName, setUsername] = useState(auth?.currentUser?.displayName);
  const [email, setEmail] = useState(auth?.currentUser?.email);
  const [phoneNumber, setPhoneNumber] = useState<E164Number | undefined>();
  return (
    /* Personal information START */
    <div className="profile-details">
      <div className="input-group">
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            defaultValue={userName ? userName : ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </div>
        <Separator maxWidth />
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            defaultValue={email ? email : ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <Separator maxWidth />
        <div className="input-container">
          <label htmlFor="phone">Phone</label>
          <PhoneInput
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
        </div>
        <Separator maxWidth />
      </div>
      <div className="buttons">
        <button className="cancel">Cancel</button>
        <button className="publish">Save changes</button>
      </div>
      {/* Personal information END */}
    </div>
  );
};

export default ProfileDetails;
