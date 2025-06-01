import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  font-size: 17px;
  background-color: #f5f5f5;
  overflow: hidden;
  transition: all 0.3s ease;
  width: ${(props) => (props.$isVisible ? "320px" : "100px")};
`;

export const LogoWrapper = styled.div`
  padding: 25px;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  justify-content: ${(props) => (props.$isVisible ? "flex-start" : "center")};
  align-items: center;
  color: #333;
`;

export const ContainerLink = styled.div`
  padding: 15px 20px;
  margin: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  gap: 20px;
  background-color: ${(props) => (props.$isActive ? "#fff" : "transparent")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffffff;
  }
`;

export const IconButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  color: #444;
`;

export const Label = styled.div`
  transition: opacity 0.3s ease;
  white-space: nowrap;
  color: #333;
`;
