import React from "react";
import { Menu, Button, Dropdown } from "antd";
import { NavLink } from "react-router-dom";
import {
  DownOutlined,
  HistoryOutlined,
  LogoutOutlined,
  InteractionOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/actions/User/UserActions";

const { SubMenu } = Menu;

const UserMenu = ({ user }) => {
  const dispatch = useDispatch();

  const menu = (
    <Menu>
      <Menu.ItemGroup title="User Actions" icon={<UserSwitchOutlined />}>
        <Menu.Item icon={<HistoryOutlined />}>
          <NavLink to="/trackHistory">trackHistory</NavLink>
        </Menu.Item>
        <Menu.Item
          icon={<LogoutOutlined />}
          onClick={() => dispatch(logoutUser())}
        >
          Logout
        </Menu.Item>
      </Menu.ItemGroup>
      <SubMenu title="General Actions" icon={<InteractionOutlined />}>
        <Menu.Item>General Action 1</Menu.Item>
        <Menu.Item> General Action 2</Menu.Item>
      </SubMenu>
    </Menu>
  );

  return (
    <div style={{ position: "absolute", top: "10px", right: "10px" }}>
      <Dropdown overlay={menu}>
        <Button type="primary">
          Hello {user.username} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
