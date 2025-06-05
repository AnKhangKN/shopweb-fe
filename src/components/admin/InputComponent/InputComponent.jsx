import styled from "styled-components";

const Container = styled.div`
  position: relative;
  margin: 20px 0;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 10px 10px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #000000;
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: 0px;
    font-size: 12px;
    color: #000000;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  background: white;
  padding: 0 5px;
  color: #aaa;
  font-size: 16px;
  pointer-events: none;
  transition: 0.3s ease;
`;

const InputComponent = ({
  autoComplete,
  name,
  id,
  onChange,
  styleContainer,
  value,
  placeholder = " ",
}) => {
  return (
    <Container style={styleContainer}>
      <Input
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        autoComplete={autoComplete}
        required
      />
      <Label htmlFor={id}>{name}</Label>
    </Container>
  );
};

export default InputComponent;
