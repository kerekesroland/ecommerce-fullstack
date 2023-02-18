import "./Separator.scss";
import { FC } from "react";
interface IProps {
  maxWidth?: boolean;
}
const Separator: FC<IProps> = ({ maxWidth }) => {
  return <hr className={maxWidth ? "separator maxWidth" : "separator"} />;
};

export default Separator;
