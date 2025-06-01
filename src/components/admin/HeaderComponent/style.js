import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 0px 30px;
`;

export const ModalInfo = styled.div`
  position: absolute;
  visibility: hidden;
  top: 60px;
  right: 0;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 10;

  &::before {
    content: "";
    position: absolute;
    height: 20px;
    width: 20px;
    background: white; /* Cùng màu với Modal */
    right: 25px;
    top: -10px; /* Điều chỉnh lại để mũi tên nằm sát mép trên */
    transform: rotate(45deg);
    box-shadow: -1px -1px 3px rgba(0, 0, 0, 0.05);
  }
`;

export const ContainerInfo = styled.div`
  position: relative;
  cursor: pointer;

  &:hover > ${ModalInfo} {
    visibility: visible;
  }
`;

export const ItemModalInfo = styled.div`
  padding: 0px 10px;
  border-radius: 4px;

  &:hover {
    background-color: #ccc;
    cursor: pointer;
  }
`;
