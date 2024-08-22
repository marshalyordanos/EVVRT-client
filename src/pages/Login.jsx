import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Spin } from "antd";
import styled from "styled-components";
import BloodLoginImage from "../assets/blood1.webp";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await dispatch(login(values));
      console.log("res", res);
      navigate("/users");
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log("error", error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return !loading ? (
    <Container>
      <div className="login_con">
        <p>EVVRT Login</p>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
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
            <Input placeholder="email" className="input-style" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="password" className="input-style " />
          </Form.Item>
          <Link
            style={{
              textDecoration: "underline",
              margin: "10px 10px",
              display: "block",
            }}
            to={"/"}
          >
            Forget Password
          </Link>

          <Form.Item>
            <Button className="button-style" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="image_con">
        <img src={BloodLoginImage} alt="" />
        <div className="onTop_impage">
          <p className="image-text">
            Admin Login - Blood Donation Dashboard: Secure access to manage and
            monitor blood donation activities. Please enter your credentials to
            proceed.
          </p>
        </div>
      </div>
    </Container>
  ) : (
    <SpinContainer className="spin_con flex justify-center items-center">
      <Spin size="large" />
    </SpinContainer>
  );
};

const SpinContainer = styled.div`
  height: calc(100vh - 200px);
  .ant-spin-dot-item {
    background-color: #be0a0a;
  }
`;
const Container = styled.div`
  margin: auto;
  margin-top: 30px;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;

  .login_con {
    min-width: 400px;
  }

  p {
    font-size: 40px;
    font-weight: 400;
  }
  .input-style {
    /* border: 1px solid black; */
    background-color: #ededed;
    padding: 14px;
  }
  /* .input-style::placeholder {
    color: black;
  } */
  .button-style {
    background-color: #b81010;
    padding: 13px 37px;
    border-radius: 100px;
    height: 50px;
    width: 200px;

    color: white;
    font-size: 20px;
  }
  .image_con {
    position: relative;
    .onTop_impage {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      align-items: end;
      right: 0;
      border-radius: 20px;
      /* background-color: #b81010; */
      background-image: linear-gradient(transparent, #b81010);
      .image-text {
        font-size: 20px;
        margin: 30px;
        color: white;
      }
    }
    img {
      width: 700px;
    }
  }
`;

export default Login;
