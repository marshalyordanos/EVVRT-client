import { Form, Input, message } from "antd";
import React, { useState } from "react";
import instance from "../../api/api";
import { useSearchParams } from "react-router-dom";
const PassowrdReset = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  let [searchParams, setSearchParams] = useSearchParams();
  const onFinish = async (values) => {
    console.log("values", values);
    try {
      setLoading(true);
      const res = await instance.post("/auth/reset-password", {
        ...values,
        token: searchParams.get("token"),
      });
      console.log("res", res);
      // if (res.type == "auth/login/rejected") {
      //   setErr("");
      // }

      message.success("your passowrd  is successfully reset!");
      // navigate("/login");

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
    <div>
      <div className=" my-10 max-w-[500px] mx-auto">
        <p className="my-5 text-sky-900 text-lg">
          Please enter a new password for your account.
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
            layout="vertical"
          >
            <Form.Item
              label="New Password"
              //   style={{ border: "2px solid" }}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input valid email!",
                },
              ]}
            >
              <Input.Password placeholder="password" className="py-2" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              //   style={{ border: "2px solid" }}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input valid email!",
                },
              ]}
            >
              <Input.Password placeholder="confirm password" className="py-2" />
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
    </div>
  );
};

export default PassowrdReset;
