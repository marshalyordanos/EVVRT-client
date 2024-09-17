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
import sitesService from "./SitesService";
import CommonModal from "../../components/commons/CommonModel";
import SitesPick from "./SitesPick";
import dayjs from "dayjs";
import UsersPick from "../users/UsersPick";
import { IoSearchOutline } from "react-icons/io5";
import RegionsPick from "../regions/RegionsPick";

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

const SitesEdit = ({
  setIsModalOpen,
  isModelOpen,
  mode,
  setMode,
  sitesData,
  searchData,
}) => {
  const [form] = Form.useForm();
  const [switch2, setSwitch2] = useState("");
  const [loading, setLoading] = useState("");
  const [sitePick, setSitePick] = useState(false);
  const [userPick, setUserPick] = useState(false);
  const [selectedUser, setSelecteduser] = useState(null);
  const [regionPick, setRegionPick] = useState(false);
  const [selectedRegion, setSelectedregion] = useState(null);

  useEffect(() => {
    const featchData = async () => {
      try {
        const data = await sitesService.getSite(mode);
        form.setFieldsValue({
          site: {
            ...data,
            coordinatorId: data?.coordinatorId?._id,
            regionId:data?.regionId?._id,
            updatedAt: dayjs(data.updatedAt),
          },
        });
        setSelecteduser(data?.coordinatorId);
        setSelectedregion(data?.regionId);
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

  const sitePickHandler = (data) => {
    console.log("sitePickHandler", data);

    setSitePick(false);
  };
  const userPickHandler = (data) => {
    setSelecteduser(data);
    form.setFieldsValue({
      site: {
        ...form.getFieldsValue().site,
        coordinatorId: data?._id,
      },
    });
    setUserPick(false);
  };
  const regionPickHandler = (data) => {
    setSelectedregion(data);
    form.setFieldsValue({
      site: {
        ...form.getFieldsValue().site,
        regionId: data?._id,
      },
    });
    setRegionPick(false);
  };
  console.log("data", selectedUser?.username);

  const onAdd = async (datas) => {
    try {
      setLoading(true);

      const data = await sitesService.createSite(datas.site);
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

      const data = await sitesService.updateSite(datas.site, mode);
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
          />
        </CommonModal>
      ) : (
        ""
      )}
      {regionPick ? (
        <CommonModal
          width={700}
          isModalOpen={regionPick}
          setIsModalOpen={setRegionPick}
        >
          <RegionsPick
            setIsModalOpen={setRegionPick}
            selectHandler={regionPickHandler}
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
          name={["site", "name"]}
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
          name={["site", "coordinatorId"]}
          label="Coordinator"
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
        <Form.Item
          className=" flex-1"
          name={["site", "regionId"]}
          label="Region"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <div className=" flex bg-slate-200 border-gray-200 border-[1px] rounded ">
            <Input
              disabled
              value={selectedRegion?.name}
              className="border-none flex-1 disabled:text-black"
            />
            <div
              onClick={() => setRegionPick(true)}
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

export default SitesEdit;
