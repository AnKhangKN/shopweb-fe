import { WrapperSelect } from "./style";

const SortSelectComponent = ({
  value,
  id,
  onChange,
  children,
  defaultOptionText = "Tất cả",
  style,
}) => {
  return (
    <WrapperSelect id={id} value={value} onChange={onChange} style={style}>
      <option value="all">{defaultOptionText}</option>
      {children}
    </WrapperSelect>
  );
};

export default SortSelectComponent;
