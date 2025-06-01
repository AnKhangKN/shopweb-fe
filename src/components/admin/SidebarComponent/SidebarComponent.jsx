import React from "react";
import {
  Wrapper,
  IconButton,
  ContainerLink,
  LogoWrapper,
  Label,
} from "./style.js";
import { MdDashboard, MdLocalShipping } from "react-icons/md";
import { FaChartPie, FaUser } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import { PiInstagramLogo } from "react-icons/pi";

const SidebarComponent = ({ isVisible }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: <MdDashboard />, label: "Trang chủ" },
    {
      path: "/admin/product",
      icon: <AiFillProduct />,
      label: "Quản lý sản phẩm",
    },
    { path: "/admin/user", icon: <FaUser />, label: "Quản lý người dùng" },
    {
      path: "/admin/order",
      icon: <MdLocalShipping />,
      label: "Quản lý đơn hàng",
    },
    {
      path: "/admin/statistics",
      icon: <FaChartPie />,
      label: "Thống kê báo cáo",
    },
  ];

  return (
    <Wrapper $isVisible={isVisible}>
      <LogoWrapper $isVisible={isVisible}>
        {isVisible ? "Shop Mini App" : <PiInstagramLogo size={24} />}
      </LogoWrapper>

      {menuItems.map((item, index) => {
        const isActive = location.pathname === item.path;

        return (
          <ContainerLink
            key={index}
            onClick={() => navigate(item.path)}
            $isActive={isActive}
            title={!isVisible ? item.label : undefined}
          >
            <IconButton>{item.icon}</IconButton>
            {isVisible && <Label>{item.label}</Label>}
          </ContainerLink>
        );
      })}
    </Wrapper>
  );
};

export default SidebarComponent;
