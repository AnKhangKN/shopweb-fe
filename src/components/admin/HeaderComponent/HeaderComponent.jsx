import { ContainerInfo, ItemModalInfo, ModalInfo, Wrapper } from "./style";
import { Col, Row } from "antd";
import { FaBars, FaBarsStaggered } from "react-icons/fa6";
import anhtest from "../../../assets/images/test/anh-test.webp";
import { useNavigate } from "react-router-dom";

const HeaderComponent = ({ toggleSidebar, isVisible }) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Row style={{ lineHeight: "50px" }}>
        <Col span={12}>
          <div
            className="d-flex align-items-center"
            style={{ fontSize: "18px", gap: "20px" }}
          >
            <div onClick={toggleSidebar} style={{ cursor: "pointer" }}>
              {isVisible ? <FaBarsStaggered /> : <FaBars />}
            </div>
            <div>Home</div>
          </div>
        </Col>
        <Col span={12}>
          <div className="d-flex align-items-center justify-content-end">
            <div></div>

            {/* user */}
            <ContainerInfo>
              <div className="d-flex align-items-center gap-4">
                <div>User</div>
                <div
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    border: "0.5px solid #ccc",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    className="w-100 object-fit-cover"
                    src={anhtest}
                    alt=""
                  />
                </div>
              </div>

              {/* info modal */}
              <ModalInfo>
                <div
                  style={{
                    backgroundColor: "#fff",
                    lineHeight: "30px",
                    width: "150px",
                    display: "flex",
                    gap: "10px",
                    flexFlow: "column",
                  }}
                >
                  <ItemModalInfo
                    onClick={() => {
                      navigate("/admin/information");
                    }}
                  >
                    Thông tin cá nhân
                  </ItemModalInfo>
                  <ItemModalInfo>Đăng xuất</ItemModalInfo>
                </div>
              </ModalInfo>
            </ContainerInfo>
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default HeaderComponent;
