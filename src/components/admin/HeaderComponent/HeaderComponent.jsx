import { Wrapper } from "./style";
import { Col, Row } from "antd";
import { FaBars, FaBarsStaggered } from "react-icons/fa6";

const HeaderComponent = ({ toggleSidebar, isVisible }) => {
  return (
    <Wrapper>
      <Row>
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
            hihi
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default HeaderComponent;
