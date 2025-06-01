import React from "react";
import ParameterBox from "../../../components/admin/ParameterBox/ParameterBox";
import { BsBoxSeam } from "react-icons/bs";
import { GoPerson } from "react-icons/go";

const Dashboard = () => {
  return (
    <>
      <div className="d-flex gap-3">
        <div>
          <ParameterBox title="Người dùng" parameter="1200" icon={GoPerson} />
        </div>
        <div>
          <ParameterBox title="Doanh thu" parameter="1200" />
        </div>
        <div>
          <ParameterBox title="Sản phẩm" parameter="1200" icon={BsBoxSeam} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
