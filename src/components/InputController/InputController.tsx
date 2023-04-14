import styles from "./InputController.module.scss";

interface IProps {
  register: any;
  placeholder: string;
  defaultName: string;
  name: string;
}

const InputController = ({
  register,
  placeholder,
  defaultName,
  name,
}: IProps) => {
  return (
    <div className={styles.input_controller}>
      <label>{name}</label>
      <div className={styles.input_container}>
        <input
          {...register}
          type="text"
          minLength={4}
          placeholder={placeholder || defaultName}
          required
        />
      </div>
    </div>
  );
};

export default InputController;
