import React from "react";
import { Form, Input, Button, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorsRegistration,
  fetchRegistrationUser,
} from "../../store/actions/User/UserActions";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const Authorization = () => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.user.errorRegistration);

  const onFinish = (values) => {
    dispatch(fetchRegistrationUser(values));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed", errorInfo);
  };

  return (
    <>
      {errors ? (
        <Alert
          message="Error text"
          description={errors.errors.username.message}
          type="error"
          action={
            <Button
              size="small"
              danger
              type="ghost"
              onClick={() => dispatch(clearErrorsRegistration())}
            >
              Close
            </Button>
          }
          showIcon
        />
      ) : null}
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input ypour password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Authorization;
