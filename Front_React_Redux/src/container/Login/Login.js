import React from "react";
import { Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorLogin,
  fetchLoginUser,
} from "../../store/actions/User/UserActions";

const Login = () => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.user.errorLogin);
  const onFinish = (values) => {
    dispatch(fetchLoginUser(values));
  };
  return (
    <>
      {errors ? (
        <Alert
          message="Error text"
          description={errors.error}
          type="error"
          action={
            <Button
              size="small"
              danger
              type="ghost"
              onClick={() => dispatch(clearErrorLogin())}
            >
              Close
            </Button>
          }
          showIcon
        />
      ) : null}
      <Form
        style={{ maxWidth: "300px" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "please input your username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "please input your password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", margin: "15px 0" }}
          >
            Log In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
