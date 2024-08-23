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
import indicatorsService from "./IndicatorsService";
import CommonModal from "../../components/commons/CommonModel";
import IndicatorsPick from "./IndicatorsPick";
import dayjs from "dayjs";
import SitesPick from "../sites/SitesPick";
import { IoSearchOutline } from "react-icons/io5";

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

const IndicatorsEdit = ({
  setIsModalOpen,
  isModelOpen,
  mode,
  setMode,
  indicatorsData,
  searchData,
}) => {
  const [form] = Form.useForm();
  const [switch2, setSwitch2] = useState("");
  const [loading, setLoading] = useState("");
  const [indicatorPick, setIndicatorPick] = useState(false);
  const [sitePick, setSitePick] = useState(false);
  const [selectedSite, setSelectedsite] = useState(null);

  useEffect(() => {
    const featchData = async () => {
      try {
        const data = await indicatorsService.getIndicator(mode);
        form.setFieldsValue({
          indicator: { ...data, updatedAt: dayjs(data.updatedAt) },
        });
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

  const indicatorPickHandler = (data) => {
    console.log("indicatorPickHandler", data);

    setIndicatorPick(false);
  };
  const sitePickHandler = (data) => {
    setSelectedsite(data);
    form.setFieldsValue({
      indicator: {
        ...form.getFieldsValue().indicator,
        siteId: data?._id,
      },
    });
    setSitePick(false);
  };

  const onAdd = async (datas) => {
    try {
      setLoading(true);

      const data = await indicatorsService.createIndicator(datas.indicator);
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

      const data = await indicatorsService.updateIndicator(
        datas.indicator,
        mode
      );
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
      {sitePick ? (
        <CommonModal
          width={700}
          isModalOpen={sitePick}
          setIsModalOpen={setSitePick}
        >
          <SitesPick
            setIsModalOpen={setSitePick}
            selectHandler={sitePickHandler}
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
        <FlexStyle>
          <Form.Item
            className=" flex-1"
            name={["indicator", "siteId"]}
            label="Site"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <div className=" flex bg-slate-200 border-gray-200 border-[1px] rounded ">
              <Input
                disabled
                value={selectedSite?.name}
                className="border-none flex-1"
              />
              <div
                onClick={() => setSitePick(true)}
                className="flex justify-center items-center py-2 px-4 hover:bg-red-700"
              >
                <IoSearchOutline size={18} />
              </div>
            </div>
          </Form.Item>

          <Form.Item
            className="flex-1 "
            name={["indicator", "dueDate"]}
            label="Due date"
          >
            <DatePicker className="w-full" format={"YYYY/MM/DD"} />
          </Form.Item>

          <Form.Item
            className="flex-1 "
            name={["indicator", "date"]}
            label="Date"
          >
            <DatePicker className="w-full" format={"YYYY/MM/DD"} />
          </Form.Item>

          <Form.Item name={["indicator", "isPublish"]} label="Is publish">
            <Switch
              checked={switch2}
              onChange={(value) => setSwitch2(value)}
              style={{ background: switch2 ? "blue" : "gray" }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1 "
            name={["indicator", "total_blood_donations"]}
            label="total_blood_donations"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1 "
            name={["indicator", "familyr_eplacement_donations"]}
            label="familyr_eplacement_donations"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1 "
            name={["indicator", "first_time_donors"]}
            label="first_time_donors"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1 "
            name={["indicator", "repeat_donors"]}
            label="repeat_donors"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "student_donors"]}
            label="student_donors"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "government_employee_donors"]}
            label="government_employee_donors"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "private_employee_donors"]}
            label="private_employee_donors"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "self_employed_donors"]}
            label="self_employed_donors"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "unemployed_donors"]}
            label="unemployed_donors"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "other_donors"]}
            label="other_donors"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "male_donors"]}
            label="male_donors"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "female_donors"]}
            label="female_donors"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          {" "}
          <Form.Item
            className="flex-1"
            name={["indicator", "under18_donors"]}
            label="under18_donors"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
          <Form.Item
            className="flex-1"
            name={["indicator", "age18to24_donors"]}
            label="age18to24_donors"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
          <Form.Item
            className="flex-1"
            name={["indicator", "age25to34_donors"]}
            label="age25to34_donors"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
          <Form.Item
            className="flex-1"
            name={["indicator", "age35to44_donors"]}
            label="age35to44_donors"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "age45to54_donors"]}
            label="age45to54_donors"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "age55to64_donors"]}
            label="age55to64_donors"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "over65_donors"]}
            label="over65_donors"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "apheresis_donations"]}
            label="apheresis_donations"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "donations_fromcenter"]}
            label="donations_fromcenter"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "donations_from_mobile"]}
            label="donations_from_mobile"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "mobile_sessions_conducted"]}
            label="mobile_sessions_conducted"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "active_blood_donor_clubs"]}
            label="active_blood_donor_clubs"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "adr_fainting"]}
            label="adr_fainting"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "adr_fainting_withloss_of_consciousness"]}
            label="adr_fainting_withloss_of_consciousness"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "adr_seizure"]}
            label="adr_seizure"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "adr_technical_problem"]}
            label="adr_technical_problem"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "donor_refusals"]}
            label="donor_refusals"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "other_adrs"]}
            label="other_adrs"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "permanent_deferrals_duetottis"]}
            label="permanent_deferrals_duetottis"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "deferrals_by_lowweight"]}
            label="deferrals_by_lowweight"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "deferrals_by_age"]}
            label="deferrals_by_age"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "deferrals_by_pregnancy_lactation"]}
            label="deferrals_by_pregnancy_lactation"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "deferrals_by_blood_pressure"]}
            label="deferrals_by_blood_pressure"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "deferrals_by_low_hemoglobin"]}
            label="deferrals_by_low_hemoglobin"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "deferrals_by_other_medical_conditions"]}
            label="deferrals_by_other_medical_conditions"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "deferrals_by_high_risk_behavior"]}
            label="deferrals_by_high_risk_behavior"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "deferrals_by_travel_history"]}
            label="deferrals_by_travel_history"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "deferrals_by_other_reasons"]}
            label="deferrals_by_other_reasons"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            name={["indicator", "post_donation_counselling_system"]}
            label="post_donation_counselling_system"
          >
            <Switch
              checked={switch2}
              onChange={(value) => setSwitch2(value)}
              style={{ background: switch2 ? "blue" : "gray" }}
            />
          </Form.Item>

          <Form.Item
            name={["indicator", "referral_for_positive_ttis_donors"]}
            label="referral_for_positive_ttis_donors"
          >
            <Switch
              checked={switch2}
              onChange={(value) => setSwitch2(value)}
              style={{ background: switch2 ? "blue" : "gray" }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "pre_donation_information_given"]}
            label="pre_donation_information_given"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "pre_donation_counselling"]}
            label="pre_donation_counselling"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "post_donation_counselling_service"]}
            label="post_donation_counselling_service"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "post_donation_counselling_from_mobile"]}
            label="post_donation_counselling_from_mobile"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "post_donation_counselling_from_center"]}
            label="post_donation_counselling_from_center"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "non_reactive_donors_receiving_pdc"]}
            label="non_reactive_donors_receiving_pdc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "reactive_donors_receiving_pdc"]}
            label="reactive_donors_receiving_pdc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "referred_reactive_donors_receiving_pdc"]}
            label="referred_reactive_donors_receiving_pdc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "donations_screened_for_ttis"]}
            label="donations_screened_for_ttis"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "samples_screened_for_ttis"]}
            label="samples_screened_for_ttis"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "samples_screened_for_blood_group"]}
            label="samples_screened_for_blood_group"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={[
              "indicator",
              "samples_screened_for_blood_group_quality_assured",
            ]}
            label="samples_screened_for_blood_group_quality_assured"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "ttis_positive"]}
            label="ttis_positive"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "hiv_positive"]}
            label="hiv_positive"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "hepatitis_b_positive"]}
            label="hepatitis_b_positive"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "hepatitis_c_positive"]}
            label="hepatitis_c_positive"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "syphilis_positive"]}
            label="syphilis_positive"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "donors_positive_for_ttis"]}
            label="donors_positive_for_ttis"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>
        <FlexStyle>
          <Form.Item
            name={["indicator", "component_processing_system"]}
            label="component_processing_system"
          >
            <Switch
              checked={switch2}
              onChange={(value) => setSwitch2(value)}
              style={{ background: switch2 ? "blue" : "gray" }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "whole_blood_separated_into_components"]}
            label="whole_blood_separated_into_components"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "crc_units_repared"]}
            label="crc_units_repared"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "platelets_prepared"]}
            label="platelets_prepared"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>
        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "ffp_prepared"]}
            label="ffp_prepared"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "cryoprecipitate_prepared"]}
            label="cryoprecipitate_prepared"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "discarded_units_overweight_crc"]}
            label="discarded_units_overweight_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "discarded_units_overweight_platelets"]}
            label="discarded_units_overweight_platelets"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>
        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "discarded_units_overweight_ffp"]}
            label="discarded_units_overweight_ffp"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "discarded_units_overweight_cryoprecipitate"]}
            label="discarded_units_overweight_cryoprecipitate"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "discarded_units_collection_problem"]}
            label="discarded_units_collection_problem"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "discarded_units_expired"]}
            label="discarded_units_expired"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "discarded_pnits_processing_problems"]}
            label="discarded_pnits_processing_problems"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "discarded_units_reactive_ttis"]}
            label="discarded_units_reactive_ttis"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "discarded_units_hemolyzed"]}
            label="discarded_units_hemolyzed"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "discarded_units_clotted"]}
            label="discarded_units_clotted"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "discarded_units_storage_problems"]}
            label="discarded_units_storage_problems"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "discarded_units_transportation_problems"]}
            label="discarded_units_transportation_problems"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "discarded_units_highod"]}
            label="discarded_units_highod"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "discarded_units_others"]}
            label="discarded_units_others"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "requested_aplus_wb_crc"]}
            label="requested_aplus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "requested_bplus_wbcrc"]}
            label="requested_bplus_wbcrc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "requested_abplus_wb_crc"]}
            label="requested_abplus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "requested_oplus_wb_crc"]}
            label="requested_oplus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "requested_aminus_wb_crc"]}
            label="requested_aminus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "requested_bminus_wb_crc"]}
            label="requested_bminus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "requested_abminus_wb_crc"]}
            label="requested_abminus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "requested_ominus_wb_crc"]}
            label="requested_ominus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "requested_ffp_units"]}
            label="requested_ffp_units"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "requested_platelets_units"]}
            label="requested_platelets_units"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "distributed_aplus_wb_crc"]}
            label="distributed_aplus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "distributed_bplus_wb_crc"]}
            label="distributed_bplus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "distributed_abplus_wb_crc"]}
            label="distributed_abplus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "distributed_oplus_wb_crc"]}
            label="distributed_oplus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "distributed_aminus_wb_crc"]}
            label="distributed_aminus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "distributed_bminus_wb_crc"]}
            label="distributed_bminus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "distributed_abminus_wb_crc"]}
            label="distributed_abminus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "distributed_ominus_wb_crc"]}
            label="distributed_ominus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "distributed_ffp_units"]}
            label="distributed_ffp_units"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "distributed_platelets_units"]}
            label="distributed_platelets_units"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "transferred_aplus_wb_crc"]}
            label="transferred_aplus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "transferred_bplus_wb_crc"]}
            label="transferred_bplus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "transferred_abplus_wb_crc"]}
            label="transferred_abplus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "transferred_oplus_wb_crc"]}
            label="transferred_oplus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "transferred_aminus_wb_crc"]}
            label="transferred_aminus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "transferred_bminus_wb_crc"]}
            label="transferred_bminus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "transferred_abminus_wb_crc"]}
            label="transferred_abminus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "transferred_ominus_wb_crc"]}
            label="transferred_ominus_wb_crc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "transferred_ffp_units"]}
            label="transferred_ffp_units"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "transferred_platelets_units"]}
            label="transferred_platelets_units"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "health_facilities_performing_transfusion"]}
            label="health_facilities_performing_transfusion"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "health_facilities_with_htc"]}
            label="health_facilities_with_htc"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>
        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "health_facilities_performing_clinical_audit"]}
            label="health_facilities_performing_clinical_audit"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "male_patients_transfused"]}
            label="male_patients_transfused"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "female_patients_transfused"]}
            label="female_patients_transfused"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "patients_under5_transfused"]}
            label="patients_under5_transfused"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "patients5_to14_transfused"]}
            label="patients5_to14_transfused"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "patients15_to44_transfused"]}
            label="patients15_to44_transfused"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "patients45_to59_transfused"]}
            label="patients45_to59_transfused"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "patients60_or_older_transfused"]}
            label="patients60_or_older_transfused"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "whole_blood_transfused"]}
            label="whole_blood_transfused"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "redcells_transfused"]}
            label="redcells_transfused"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "platelets_transfused"]}
            label="platelets_transfused"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "ffp_transfused"]}
            label="ffp_transfused"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "cryoprecipitate_transfused"]}
            label="cryoprecipitate_transfused"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "immunological_hemolysis_abo_tncompatibility"]}
            label="immunological_hemolysis_abo_tncompatibility"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "suspected_hemolysis_other_allo_antibody"]}
            label="suspected_hemolysis_other_allo_antibody"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "nonimmunological_hemolysis"]}
            label="nonimmunological_hemolysis"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "post_transfusion_purpura"]}
            label="post_transfusion_purpura"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "anaph_ylaxis_hypersensitivity"]}
            label="anaph_ylaxis_hypersensitivity"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "transfusion_related_lung_injury"]}
            label="transfusion_related_lung_injury"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "graft_versushost_disease"]}
            label="graft_versushost_disease"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>

        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "suspected_transfusion_associated_hiv"]}
            label="suspected_transfusion_associated_hiv"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "suspected_transfusion_associated_hbv"]}
            label="suspected_transfusion_associated_hbv"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "suspected_transfusion_associated_hcv"]}
            label="suspected_transfusion_associated_hcv"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "suspected_sepsis_donor_unit"]}
            label="suspected_sepsis_donor_unit"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>
        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "suspected_transfusion_associated_malaria"]}
            label="suspected_transfusion_associated_malaria"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "suspected_other_parasiticinfection"]}
            label="suspected_other_parasiticinfection"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "transfusion_associated_circulatory_overload"]}
            label="transfusion_associated_circulatory_overload"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "other_serious_atr"]}
            label="other_serious_atr"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>
        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "hiv_elisa_kits_stock"]}
            label="hiv_elisa_kits_stock"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "hbv_elisa_kits_stock"]}
            label="hbv_elisa_kits_stock"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "hcv_elisa_kits_stock"]}
            label="hcv_elisa_kits_stock"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "syphilis_elisa_kits_stock"]}
            label="syphilis_elisa_kits_stock"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>
        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "blood_bag350ml_stock"]}
            label="blood_bag350ml_stock"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "blood_bag450ml_single_stock"]}
            label="blood_bag450ml_single_stock"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "blood_bag450ml_triple_stock"]}
            label="blood_bag450ml_triple_stock"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "transfusion_set_stock"]}
            label="transfusion_set_stock"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>
        </FlexStyle>
        <FlexStyle>
          <Form.Item
            className="flex-1"
            name={["indicator", "elisa_kits_stock_out_days"]}
            label="elisa_kits_stock_out_days"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
          </Form.Item>

          <Form.Item
            className="flex-1"
            name={["indicator", "blood_bag_stock_out_days"]}
            label="blood_bag_stock_out_days"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber
              className="border-gray-400 py-1 w-full"
              style={{
                minWidth: 150,
              }}
            />
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

export default IndicatorsEdit;
