import React from "react";
import { Layout as LayoutAntD, Button, Space } from "antd";
import { NavLink } from "react-router-dom";
import FMLogo from "../../image/radiologo.png";
import { gold } from "@ant-design/colors";
import { useSelector } from "react-redux";
import AnonymousMenu from "../AnonymousMenu/AnonymousMenu";
import UserMenu from "../UserMenu/UserMenu";
const { Header, Content } = LayoutAntD;

const Layout = (props) => {
  const user = useSelector((state) => state.user.userLogin);
  return (
    <>
      <LayoutAntD>
        <Header style={{ background: gold.primary }}>
          <Space size={[100]} align="center">
            <NavLink to="/">
              <img
                src={FMLogo}
                alt="logofm"
                style={{ display: "block", width: "50px" }}
              />
            </NavLink>

            {user ? (
              <UserMenu user={user}/>
            ) : (
              <AnonymousMenu/>
            )}
          </Space>
        </Header>
        <Content style={{ padding: "10px" }}>{props.children}</Content>
      </LayoutAntD>
    </>
  );
};

export default Layout;
