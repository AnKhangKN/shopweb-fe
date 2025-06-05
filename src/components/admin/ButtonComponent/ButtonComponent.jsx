import React from "react";
import { Wrapper } from "./style";

const ButtonComponent = ({ name = "Tên button", style, onClick, icon }) => {
  return (
    <Wrapper onClick={onClick} style={style}>
      {icon && (
        <div style={{ marginRight: 4, display: "flex", alignItems: "center" }}>
          {icon}
        </div>
      )}
      {name}
    </Wrapper>
  );
};

export default ButtonComponent;
