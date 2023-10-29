type TOption = {
  label: string;
  value: string;
};

interface IProps {
  currentOption: string;
  changeOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<TOption>;
}

const OptionSelector = ({ options, currentOption, changeOption }: IProps) => {
  return (
    <div className="item select-wrapper">
      <select
        className="select-tag"
        value={currentOption}
        onChange={changeOption}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="select-tag-arrow" />
    </div>
  );
};

export default OptionSelector;
