import styled from "styled-components";

export const Box = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 200px;
`;

export const Title = styled.div`
  font-size: 14px;
  color: #888;
`;

export const ValueRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const IconWrapper = styled.div`
  background-color: #e0f7fa;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Parameter = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;
