import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  Switch,
  DatePicker,
  Divider,
} from "antd";
import styled from "styled-components";
import {
  ButtonStyle,
  FlexStyle,
  FormStyle,
} from "../components/commons/CommonStyles";
import usersService from "./users/UsersService";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, updateUser } from "../redux/auth/authSlice";

const { Option } = Select;

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const ProfilePage = ({}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState("");
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    form.setFieldsValue({
      user: { ...user?.user },
    });
  }, [user]);

  const onUpdate = async (datas) => {
    try {
      console.log("+=====");
      setLoading(true);

      const data = await usersService.updateUser(datas.user, user?.user._id);

      setLoading(false);
      console.log("yyy", {
        ...user,
        user: { ...datas?.user, _id: user?.user._id },
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          user: { ...datas?.user, _id: user?.user._id },
        })
      );
      dispatch(updateUser({ user: { ...datas?.user, _id: user?.user._id } }));
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const onFinish = (values) => {
    onUpdate(values);
  };

  return (
    <div>
      {loading ? (
        <SpinStyle>
          <Spin style={{ color: "#fff" }} size="large" />
        </SpinStyle>
      ) : (
        ""
      )}
      {/* <button onClick={() => setUserPick(true)}>hhhhhh</button> */}

      <div className="border-b-2 border-gray-200 mt-5 mb-10 pb-5">
        <p className="text-3xl">Profile</p>
      </div>
      <FormStyle
        form={form}
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        onError={() => {}}
        validateMessages={validateMessages}
      >
        <FlexStyle>
          <Form.Item
            className=" flex-1"
            name={["user", "firstName"]}
            label="First Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className="border-gray-400 py-2" />
          </Form.Item>

          <Form.Item
            className=" flex-1"
            name={["user", "lastName"]}
            label="Last Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className="border-gray-400 py-2" />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className=" flex-1"
            name={["user", "username"]}
            label="Username"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className="border-gray-400 py-2" />
          </Form.Item>

          <Form.Item
            className=" flex-1"
            name={["user", "email"]}
            label="Email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className="border-gray-400 py-2" />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className=" flex-1"
            name={["user", "phoneNumber"]}
            label="Phone Number"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className="border-gray-400 py-2" />
          </Form.Item>
        </FlexStyle>

        <ButtonStyle>
          <button onClick={() => setIsModalOpen(false)}>cancel</button>
          <button type="submit">Submit</button>
        </ButtonStyle>
      </FormStyle>
    </div>
  );
};

const SpinStyle = styled.div`
  /* border: 1px solid; */
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 100;
  display: flex;
  border-radius: 120px;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 40%;

  .ant-spin-dot .ant-spin-dot-spin {
    background-color: red;
  }
`;

export default ProfilePage;
