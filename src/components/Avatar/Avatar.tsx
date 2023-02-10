import "./Avatar.scss";
import EditIcon from "@mui/icons-material/Edit";
type Props = {
  src: string;
  alt?: string;
};

const Avatar = ({ src, alt }: Props) => {
  return (
    <div className="avatar-container">
      <div className="img-container">
        <img className="avatar" src={src} alt={alt} />
        <div className="edit-btn-container">
          <EditIcon className="edit-btn" />
        </div>
      </div>
    </div>
  );
};

export default Avatar;
