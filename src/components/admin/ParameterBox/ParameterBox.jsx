import React from "react";
import { TbCurrencyDollar } from "react-icons/tb";
import { Box, IconWrapper, Parameter, Title, ValueRow } from "./style";

const ParameterBox = ({
  title = "Title",
  parameter = "0",
  icon: Icon = TbCurrencyDollar,
}) => {
  return (
    <Box>
      <Title>{title}</Title>
      <ValueRow>
        <IconWrapper>
          <Icon size={20} color="#0070ba" />
        </IconWrapper>
        <Parameter>{parameter}</Parameter>
      </ValueRow>
    </Box>
  );
};

export default ParameterBox;
