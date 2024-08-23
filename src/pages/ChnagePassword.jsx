import React, { useState } from "react";
import { Alert, Button, Form, Input, message } from "antd";
import instance from "../api/api";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/auth/authSlice";

const ChnagePasswordPage = () => {
  const [form] = Form.useForm();
  const [msg, setMsg] = useState("");

  const user = useSelector(selectCurrentUser);
  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const data = await instance.post("users/change-password", {
        ...values,
        id: user?.user._id,
      });
      console.log(data.data?.msg);
      form.resetFields();
      setMsg(data.data?.msg);
    } catch (error) {
      console.log(error);
      form.resetFields();

      setMsg("");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      {msg && <Alert message={msg} type="success" closable />}
      <div className="border-b-2 border-gray-200 my-5 py-5">
        <h1 className="text-2xl">Chnage passwrd</h1>
      </div>
      <div>
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Please input your old Password!",
              },
            ]}
          >
            <Input.Password
              placeholder="old password"
              className="p-3 max-w-[400px]"
            />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
          >
            <Input.Password
              placeholder="new password"
              className="p-3 max-w-[400px]"
            />
          </Form.Item>
          <Form.Item
            label="Confirm new password"
            name="confirm"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
            ]}
          >
            <Input.Password
              placeholder="confirm password"
              className="p-3 max-w-[400px]"
            />
          </Form.Item>

          <div className="">
            <button
              typeof="submit"
              className="bg-[#0e0e0e] text-white py-4 px-20"
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChnagePasswordPage;
