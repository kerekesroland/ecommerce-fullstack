import { FC } from "react";
import "./ProfileChips.scss";
import { useTranslation } from "react-i18next";

interface IOption {
  id: number;
  name: string;
}

interface IProps {
  activeChip: number;
  setActiveChip: React.Dispatch<React.SetStateAction<number>>;
}

const ProfileChips: FC<IProps> = ({ activeChip, setActiveChip }) => {
  const { t } = useTranslation();
  const options: Array<IOption> = [
    {
      id: 1,
      name: t("data.navigation.profile.details"),
    },
    {
      id: 2,
      name: t("data.navigation.profile.password"),
    },
    {
      id: 3,
      name: t("data.navigation.profile.orders"),
    },
    {
      id: 4,
      name: t("data.navigation.profile.plan"),
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
