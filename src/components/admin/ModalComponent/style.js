import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const ContainerWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  min-width: 500px;
`;

export const IconButton = styled.div`
  font-size: 30px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border-radius: 5px;
  margin-right: 12px;
  display: flex;

  &:hover {
    background-color: #ccc;
  }
`;

export const ChildrenContainer = styled.div`
  padding: 0px 15px 15px 15px;
`;
