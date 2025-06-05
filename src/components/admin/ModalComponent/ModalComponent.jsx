import { IoIosClose } from "react-icons/io";
import {
  ChildrenContainer,
  ContainerWrapper,
  IconButton,
  Wrapper,
} from "./style";

const ModalComponent = ({
  styleContainer,
  styleChildren,
  children,
  title = "Title Modal",
  onClose,
}) => {
  const handleContentClick = (e) => {
    e.stopPropagation(); // Ngăn click lan ra ngoài để tránh đóng modal
  };

  return (
    <>
      <Wrapper onClick={onClose}>
        <div onClick={handleContentClick}>
          <ContainerWrapper style={styleContainer}>
            <div className="d-flex align-items-center justify-content-between">
              <div style={{ fontSize: "20px" }} className="p-4">
                {title}
              </div>
              <IconButton onClick={onClose}>
                <IoIosClose />
              </IconButton>
            </div>

            <ChildrenContainer style={styleChildren}>
              {children}
            </ChildrenContainer>
          </ContainerWrapper>
        </div>
      </Wrapper>
    </>
  );
};

export default ModalComponent;
