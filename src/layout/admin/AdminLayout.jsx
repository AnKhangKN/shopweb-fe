import React, { useState } from "react";
import HeaderComponent from "../../components/admin/HeaderComponent/HeaderComponent";
import SidebarComponent from "../../components/admin/SidebarComponent/SidebarComponent";

const AdminLayout = ({ children }) => {
  const [isShowSidebar, setIsShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setIsShowSidebar((prev) => !prev);
  };

  return (
    <div style={{ display: "flex" }}>
      <SidebarComponent isVisible={isShowSidebar} />

      <div style={{ width: "100%" }}>
        <HeaderComponent
          toggleSidebar={toggleSidebar}
          isVisible={isShowSidebar}
        />
        <div
          style={{
            padding: "30px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
