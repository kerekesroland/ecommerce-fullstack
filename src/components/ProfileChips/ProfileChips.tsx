import { FC } from "react";
import "./ProfileChips.scss";

interface IOption {
  id: number;
  name: string;
}

interface IProps {
  activeChip: number;
  setActiveChip: React.Dispatch<React.SetStateAction<number>>;
}

const ProfileChips: FC<IProps> = ({ activeChip, setActiveChip }) => {
  //todo add translations
  const options: Array<IOption> = [
    {
      id: 1,
      name: "Details",
    },
    {
      id: 2,
      name: "Password",
    },
    {
      id: 3,
      name: "Orders",
    },
    {
      id: 4,
      name: "Plan",
    },
  ];

  return (
    <div className="profile-chips">
      {options.map((option: IOption) => (
        <span
          className={option.id === activeChip ? "option active" : "option"}
          onClick={() => setActiveChip(option.id)}
          key={option.id}
        >
          {option.name}
        </span>
      ))}
    </div>
  );
};

export default ProfileChips;
