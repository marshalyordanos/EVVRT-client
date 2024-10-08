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
} from "../../components/commons/CommonStyles";
import regionsService from "./RegionsService";
import CommonModal from "../../components/commons/CommonModel";
import RegionsPick from "./RegionsPick";
import dayjs from "dayjs";
import { IoSearchOutline } from "react-icons/io5";
import UsersPick from "../users/UsersPick";

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

const RegionsEdit = ({
  setIsModalOpen,
  isModelOpen,
  mode,
  setMode,
  regionsData,
  searchData,
}) => {
  const [form] = Form.useForm();
  const [switch2, setSwitch2] = useState("");
  const [loading, setLoading] = useState("");
  const [regionPick, setRegionPick] = useState(false);
  const [userPick, setUserPick] = useState(false);
  const [selectedUser, setSelecteduser] = useState(null);

  useEffect(() => {
    const featchData = async () => {
      try {
        const data = await regionsService.getRegion(mode);
        console.log("region edit data: ", data);
        form.setFieldsValue({
          region: {
            name: data?.name,
            managerId: data?.managerId?._id,
            updatedAt: dayjs(data.updatedAt),
          },
        });
        setSelecteduser(data?.managerId);
      } catch (err) {}
    };
    if (mode == "") {
    } else {
      featchData();
    }
  }, []);

  const handleReset = () => {
    form.resetFields(); // Reset form fields
  };

  const regionPickHandler = (data) => {
    console.log("regionPickHandler", data);

    setRegionPick(false);
  };
  const userPickHandler = (data) => {
    setSelecteduser(data);
    form.setFieldsValue({
      region: {
        ...form.getFieldsValue().region,
        managerId: data?._id,
      },
    });
    setUserPick(false);
  };

  const onAdd = async (datas) => {
    try {
      setLoading(true);

      const data = await regionsService.createRegion(datas.region);
      setIsModalOpen(false);
      searchData();

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const onUpdate = async (datas) => {
    try {
      setLoading(true);

      const data = await regionsService.updateRegion(datas.region, mode);
      searchData();
      setIsModalOpen(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const onFinish = (values) => {
    mode == "" ? onAdd(values) : onUpdate(values);
  };

  return (
    <div>
      {/*******  picks **********/}
      {userPick ? (
        <CommonModal
          width={700}
          isModalOpen={userPick}
          setIsModalOpen={setUserPick}
        >
          <UsersPick
            setIsModalOpen={setUserPick}
            selectHandler={userPickHandler}
            type={"regional_manager"}
          />
        </CommonModal>
      ) : (
        ""
      )}

      {loading ? (
        <SpinStyle>
          <Spin style={{ color: "#fff" }} size="large" />
        </SpinStyle>
      ) : (
        ""
      )}

      <FormStyle
        form={form}
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        onError={() => {}}
        validateMessages={validateMessages}
      >
        <Form.Item
          className=" flex-1"
          name={["region", "name"]}
          label="name"
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
          name={["region", "managerId"]}
          label="managerid"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <div className=" flex bg-slate-200 border-gray-200 border-[1px] rounded ">
            <Input
              disabled
              value={selectedUser?.username}
              className="border-none flex-1 disabled:text-black"
            />
            <div
              onClick={() => setUserPick(true)}
              className="flex justify-center items-center py-2 px-4 hover:bg-red-700"
            >
              <IoSearchOutline size={18} />
            </div>
          </div>
        </Form.Item>

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

export default RegionsEdit;
