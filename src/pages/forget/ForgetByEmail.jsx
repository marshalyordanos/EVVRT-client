import { Form, Input, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import instance from "../../api/api";

const ForgetByEmail = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("values", values);
    try {
      setLoading(true);
      const res = await instance.post("/auth/forgot-password", values);
      console.log("res", res);
      // if (res.type == "auth/login/rejected") {
      //   setErr("");
      // }

      message.success("Reset link is successfully sent!");
      //   navigate("/blood/dashboard");

      setLoading(false);
      form.resetFields();
    } catch (error) {
      setLoading(false);

      console.log("error", error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="max-w-[500px] mx-auto my-10">
      <p className="my-5 text-sky-900 text-lg">
        Enter the email address associated with your account, and we'll send you
        a link to reset your password.
      </p>
      <div className="mb-10">
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            //   label="Username"
            //   style={{ border: "2px solid" }}
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input valid email!",
              },
            ]}
          >
            <Input placeholder="email" className="py-2" />
          </Form.Item>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-700 text-white py-2 px-8 rounded hover:bg-red-900"
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgetByEmail;
