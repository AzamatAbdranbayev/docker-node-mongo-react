import React from "react";
import { Button } from "antd";
import { NavLink } from "react-router-dom";
const AnonymousMenu = () => {
  return (
    <>
      <Button type="primary" ghost>
        <NavLink to="/login"> Sign in</NavLink>
      </Button>
      <Button type="primary" ghost>
        <NavLink to="/register"> Sign up</NavLink>
      </Button>
    </>
  );
};

export default AnonymousMenu;
