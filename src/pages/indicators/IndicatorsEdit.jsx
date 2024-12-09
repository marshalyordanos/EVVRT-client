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
  message,
  Steps,
  theme,
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
  type,
  importedData,
  setIMportedData,
}) => {
  const [form] = Form.useForm();
  const [switch2, setSwitch2] = useState("");
  const [loading, setLoading] = useState("");
  const [indicatorPick, setIndicatorPick] = useState(false);
  const [sitePick, setSitePick] = useState(false);
  const [selectedSite, setSelectedsite] = useState(null);
  const [selectedSites, setSelectedsites] = useState([]);

  const [forms, setForms] = useState(null);
  const first_time_donors =
    Number(Form.useWatch(["indicator", "first_time_donors"], form)) || 0;
  const repeat_donors =
    Number(Form.useWatch(["indicator", "repeat_donors"], form)) || 0;
  const student_donors =
    Number(Form.useWatch(["indicator", "student_donors"], form)) || 0;
  const government_employee_donors =
    Number(Form.useWatch(["indicator", "government_employee_donors"], form)) ||
    0;
  const private_employee_donors =
    Number(Form.useWatch(["indicator", "private_employee_donors"], form)) || 0;
  const self_employed_donors =
    Number(Form.useWatch(["indicator", "self_employed_donors"], form)) || 0;
  const unemployed_donors =
    Number(Form.useWatch(["indicator", "unemployed_donors"], form)) || 0;
  const other_donors =
    Number(Form.useWatch(["indicator", "other_donors"], form)) || 0;
  const male_donors =
    Number(Form.useWatch(["indicator", "male_donors"], form)) || 0;
  const female_donors =
    Number(Form.useWatch(["indicator", "female_donors"], form)) || 0;
  const component_processing_system =
    Number(Form.useWatch(["indicator", "component_processing_system"], form)) ||
    false;

  const post_donation_counselling_system =
    Number(
      Form.useWatch(["indicator", "post_donation_counselling_system"], form)
    ) || "no";

  const referral_for_positive_ttis_donors =
    Number(
      Form.useWatch(["indicator", "referral_for_positive_ttis_donors"], form)
    ) || "no";

  console.log("type", type);
  // *********************** steper****************************
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    // message.info(current);
    if (current < 14) {
      setCurrent(current + 1);
    }
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    // backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    // border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  // *********************** steper****************************

  useEffect(() => {
    const featchData = async () => {
      console.log("type::: ");
      try {
        console.log("mode: ", mode);
        const data = await indicatorsService.getIndicator(mode);
        console.log("one data:", data);
        setSelectedsite(data.siteId);
        setForms({
          siteId: data.siteId._id,
          dueDate: dayjs(data.dueDate),
          date: dayjs(data.date),
          submissionDate: dayjs(data.submissionDate),
          isPublished: data.isPublished,
        });

        if (type == "imported") {
          const objImpotred = {};
          importedData.forEach((x) => {
            objImpotred[[x["name"]]] = x["value"];
          });
          console.log("type::: ", data);

          form.setFieldsValue({
            form: {
              siteId: data.siteId._id,
              dueDate: dayjs(data.dueDate),
              date: dayjs(data.date),
              isPublished: data.isPublished,
              submissionDate: dayjs(data.submissionDate),
            },
            indicator: objImpotred,
          });
        } else {
          console.log("type::: ", data);
          form.setFieldsValue({
            form: {
              siteId: data.siteId._id,
              dueDate: dayjs(data.dueDate),
              date: dayjs(data.date),
              isPublished: data.isPublished,
              submissionDate: dayjs(data.submissionDate),
            },
            indicator: data.indicators,
          });
        }
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
    setSelectedsites(data);
    form.setFieldsValue({
      form: {
        ...form.getFieldsValue().form,
        siteId: data[0]?._id,
      },
    });
    setSitePick(false);
  };

  const onAdd = async (datas) => {
    try {
      // setLoading(true);
      console.log("datas", datas);

      // const data = await indicatorsService.createIndicator({
      //   ...datas.form,
      //   date: forms?.date,
      //   dueDate: forms?.dueDate,
      //   submissionDate: form?.submissionDate,
      // });

      selectedSites.forEach(async (data) => {
        const data2 = await indicatorsService.createIndicator({
          ...datas.form,
          siteId: data?._id,
          date: forms?.date,
          dueDate: forms?.dueDate,
          submissionDate: forms?.submissionDate,
        });

        searchData("9999-09-03", "1970-09-03");
      });
      setIsModalOpen(false);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }

    // try {
    //   // setLoading(true);
    //   console.log("datas", "===================================datas");

    //   const data2 = await indicatorsService.saveIndicator({
    //     ...datas.form,
    //     indicators: datas.indicator,
    //   });
    //   // console.lof("datas for save: ", data);
    //   // setIsModalOpen(false);
    //   // searchData();

    //   // setLoading(false);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const onUpdate = async (datas) => {
    if (type == "form") {
      try {
        // setLoading(true);
        console.log("datas||||", forms);

        const data = await indicatorsService.updateIndicator(
          {
            ...datas.form,
            date: forms?.date,
            dueDate: forms?.dueDate,
            isPublished: forms?.isPublished,
            submissionDate: forms?.submissionDate,
          },
          mode
        );

        setIsModalOpen(false);
        searchData("9999-09-03", "1970-09-03");

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    } else {
      try {
        // setLoading(true);
        console.log("datas", "===================================datas", datas);

        // selectedSites.forEach(async (data) => {
        const data2 = await indicatorsService.saveIndicator({
          ...forms,
          indicators: datas.indicator,
          next: current,
        });
        // });
        next();
        setIMportedData(null);
        if (current == 14) {
          setIsModalOpen(false);
        }
        searchData("9999-09-03", "1970-09-03");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onFinish = (values) => {
    console.log("(((((", values);
    mode == "" ? onAdd(values) : onUpdate(values);
  };

  const step_one = (
    <div>
      {" "}
      <FlexStyle>
        <Form.Item
          className="flex-1 "
          name={["indicator", "total_blood_donations"]}
          label="Total number of blood donations "
          // rules={[
          //   {
          //     validator: (_, value) => {
          //       const total = Number(value);
          //       const work_group =
          //         student_donors +
          //         government_employee_donors +
          //         private_employee_donors +
          //         self_employed_donors +
          //         unemployed_donors +
          //         other_donors;
          //       const total_sex = male_donors + female_donors;
          //       console.log(
          //         "total",
          //         total,
          //         first_time_donors,
          //         repeat_donors,
          //         work_group
          //       );
          //       if (!(total == first_time_donors + repeat_donors)) {
          //         return Promise.reject(
          //           new Error(
          //             "total blood donations must be equal to the Summation of first time donors and repeat donors!"
          //           )
          //         );
          //       }
          //       // else if (!(total == total_sex)) {
          //       //   return Promise.reject(
          //       //     new Error(
          //       //       "total blood donations must be equal to the Summation famle and male donors!"
          //       //     )
          //       //   );
          //       // }
          //       else if (!(total == work_group)) {
          //         return Promise.reject(
          //           new Error(
          //             "total blood donations must be equal to the Summation for each work group!"
          //           )
          //         );
          //       } else {
          //         return Promise.resolve();
          //       }
          //     },
          //   },
          // ]}
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
          label="Total number of blood donations collected from family
replacement"
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
          className="flex-1 "
          name={["indicator", "first_time_donors"]}
          label="Number of blood donations collected from 1st time
donors."
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
          label="Number of blood donations collected from repeat
donors."
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
          label="Number of blood donations collected from Student."
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
          label="Number of blood donations collected from
Government Employee."
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
          name={["indicator", "private_employee_donors"]}
          label="Number of blood donations collected from Private
Employee."
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
          label="Number of blood donations collected from Selfemployed."
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
          label="Number of blood donations collected from Unemployed"
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
          label="Number of blood donations collected from Others."
        >
          <InputNumber
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>
      </FlexStyle>
    </div>
  );
  const step_two = (
    <div>
      {" "}
      <FlexStyle>
        <Form.Item
          className="flex-1"
          name={["indicator", "male_donors"]}
          label=". Number of blood donations collected from Male donor "
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
          label="Number of blood donations collected from Female
donor"
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
          label="3. Number of blood donations collected from donor
under 18 years."
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
          label="Number of blood donations collected from donor 18 -
to- 24 years."
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
          name={["indicator", "age25to34_donors"]}
          label="Number of blood donations collected from donor 25 -
to- 34 years."
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
          label=".Number of blood donations collected from donor 35 -
to- 44 years."
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
          label="Number of blood donations collected from donor 45 -
to- 54 years"
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
          label=".Number of blood donations collected from donor 55 -
to- 64 years."
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
          name={["indicator", "over65_donors"]}
          label="Number of blood donations collected from donors 65
years or older."
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
          label="Total number of apheresis donations collected."
        >
          <InputNumber
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>
      </FlexStyle>
    </div>
  );
  const step_three = (
    <div>
      <FlexStyle>
        <Form.Item
          className="flex-1"
          name={["indicator", "donations_fromCenter"]}
          label="Number of donations from center "
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
          label="Number of donations from mobile"
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
          name={["indicator", "mobile_sessions_conducted"]}
          label="Total number of Mobile Session conducted"
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
          label="Total Number of active blood donors Club"
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
          label="Total number of ADR Fainting occur"
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
          name={["indicator", "adr_fainting_withLoss_of_consciousness"]}
          label="Total number of ADR Fainting with loss of
Consciousness"
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
          name={["indicator", "adr_seizure"]}
          label="Total number of ADR Loss of Consciousness with
Seizure"
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
          label="Total number of ADR due to technical problem"
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
          label="Total number of Donor Refusal "
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
          label="Total number of Others ADR"
        >
          <InputNumber
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>
      </FlexStyle>
    </div>
  );
  const step_four = (
    <div>
      {" "}
      <FlexStyle>
        <Form.Item
          className="flex-1"
          name={["indicator", "permanent_deferrals_dueToTtis"]}
          label="Number of blood donors who were permanently
deferred due to TTIs result"
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
          name={["indicator", "deferrals_by_low_weight"]}
          label="Number of deferrals by low weight / Under weight"
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
          label="Number of deferrals by Age (under 18 or above 65)"
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
          label="Number of deferrals by Pregnancy & Lactation"
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
          name={["indicator", "deferrals_by_blood_pressure"]}
          label="Number of deferrals by blood pressure "
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
          label="Number of deferrals by low hemoglobin /
Hematocrit"
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
          label="Number of deferrals by other medical condition /
Diseases"
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
          label="Number of deferrals by high-risk behavior"
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
          name={["indicator", "deferrals_by_travel_history"]}
          label="Number of deferrals by travel history"
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
          label="Number of deferrals by other reason"
        >
          <InputNumber
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>
      </FlexStyle>
    </div>
  );
  const step_five = (
    <div>
      <FlexStyle>
        <Form.Item
          name={["indicator", "post_donation_counselling_system"]}
          label="Is there a system of post donation counselling?"
        >
          <Select
            className="border-gray-400 h-10"
            placeholder="select your role"
          >
            <Option value={true}>Yes</Option>
            <Option value={false}>no</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name={["indicator", "referral_for_positive_ttis_donors"]}
          label="Is there a system of referral for blood donors who
positive for TTIs?"
        >
          <Select
            className="border-gray-400 h-10"
            placeholder="select your role"
          >
            <Option value={true}>Yes</Option>
            <Option value={false}>no</Option>
          </Select>
        </Form.Item>
      </FlexStyle>
      <FlexStyle>
        <Form.Item
          className="flex-1"
          name={["indicator", "pre_donation_information_given"]}
          label="Number of donors given pre-donation information."
        >
          <InputNumber
            disabled={
              post_donation_counselling_system == "no" &&
              referral_for_positive_ttis_donors == "no"
            }
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>

        <Form.Item
          className="flex-1"
          name={["indicator", "pre_donation_counselling"]}
          label="Total number of donors presenting for pre-donation
counselling."
        >
          <InputNumber
            disabled={
              post_donation_counselling_system == "no" &&
              referral_for_positive_ttis_donors == "no"
            }
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
          label="Total number of donors receiving post-donation
counselling service"
        >
          <InputNumber
            disabled={
              post_donation_counselling_system == "no" &&
              referral_for_positive_ttis_donors == "no"
            }
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>

        <Form.Item
          className="flex-1"
          name={["indicator", "post_donation_counselling_from_mobile"]}
          label="Number of donors receiving post-donation
counselling service from Mobile site"
        >
          <InputNumber
            disabled={
              post_donation_counselling_system == "no" &&
              referral_for_positive_ttis_donors == "no"
            }
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
          name={["indicator", "post_donation_counselling_from_center"]}
          label="Number of donors receiving post-donation
counselling service from Center. "
        >
          <InputNumber
            disabled={
              post_donation_counselling_system == "no" &&
              referral_for_positive_ttis_donors == "no"
            }
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>

        <Form.Item
          className="flex-1"
          name={["indicator", "non_reactive_donors_receiving_pdc"]}
          label="Number of Non-Reactive donors who receive PDC
service."
        >
          <InputNumber
            disabled={
              post_donation_counselling_system == "no" &&
              referral_for_positive_ttis_donors == "no"
            }
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
          label="Number of Reactive donors who receive PDC
service. "
        >
          <InputNumber
            disabled={
              post_donation_counselling_system == "no" &&
              referral_for_positive_ttis_donors == "no"
            }
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>

        <Form.Item
          className="flex-1"
          name={["indicator", "referred_reactive_donors_receiving_pdc"]}
          label="Number of referred donors that was reactive and
receive PDC service. "
        >
          <InputNumber
            disabled={
              post_donation_counselling_system == "no" &&
              referral_for_positive_ttis_donors == "no"
            }
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>
      </FlexStyle>
    </div>
  );
  const step_six = (
    <div>
      <FlexStyle>
        <Form.Item
          className="flex-1"
          name={["indicator", "donations_screened_for_ttis"]}
          label="Total number of donations that were screened for
TTIs"
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
          label="Total number of samples that were screened for TTIs
in a quality-assured manner"
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
          label="Total number of samples that were screened for
Blood Group"
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
          label="Total number of samples that were screened for
Blood Group in a quality-assured manner."
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
          name={["indicator", "ttis_positive"]}
          label="Total number of TTIs positive"
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
          label="Number of HIV positive"
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
          label="Number of Hepatitis B positive "
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
          label="Number of Hepatitis C positive"
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
          name={["indicator", "syphilis_positive"]}
          label="Number of Syphilis positive "
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
          label=". Total number of Donors positive for TTIS"
        >
          <InputNumber
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>
      </FlexStyle>
    </div>
  );
  const step_seven = (
    <div>
      <FlexStyle>
        <Form.Item
          name={["indicator", "component_processing_system"]}
          label="Is there a system of processing for component
  production?"
        >
          <Select
            className="border-gray-400 h-10"
            placeholder="select your role"
          >
            <Option value={true}>Yes</Option>
            <Option value={false}>no</Option>
          </Select>
        </Form.Item>

        <Form.Item
          className="flex-1"
          name={["indicator", "whole_blood_separated_into_components"]}
          label="Total number of whole blood donations separated
  into components"
        >
          <InputNumber
            disabled={!component_processing_system}
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
          name={["indicator", "crc_units_repared"]}
          label="Number of CRC units prepared"
        >
          <InputNumber
            disabled={!component_processing_system}
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>

        <Form.Item
          className="flex-1"
          name={["indicator", "platelets_prepared"]}
          label="Number of Platelet prepared"
        >
          <InputNumber
            disabled={!component_processing_system}
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
          label="Number of FFP prepared"
        >
          <InputNumber
            disabled={!component_processing_system}
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>

        <Form.Item
          className="flex-1"
          name={["indicator", "cryoprecipitate_prepared"]}
          label="Number of Cryoprecipitate prepared"
        >
          <InputNumber
            disabled={!component_processing_system}
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
          name={["indicator", "discarded_units_overweight_crc"]}
          label="Total number of discarded units by overweight/
  underweight CRC due to processing problem"
        >
          <InputNumber
            disabled={!component_processing_system}
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>

        <Form.Item
          className="flex-1"
          name={["indicator", "discarded_units_overweight_platelets"]}
          label="Total number of discarded units by overweight/
  underweight platelets due to processing problem"
        >
          <InputNumber
            disabled={!component_processing_system}
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
          label="Total number of discarded units by overweight/
  underweight FFP due to processing problem"
        >
          <InputNumber
            disabled={!component_processing_system}
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>

        <Form.Item
          className="flex-1"
          name={["indicator", "discarded_units_overweight_cryoprecipitate"]}
          label="Total number of discarded units by overweight/
  underweight cryoprecipitate due to processing
  problem"
        >
          <InputNumber
            disabled={!component_processing_system}
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>
      </FlexStyle>
    </div>
  );
  const step_eight = (
    <div>
      {" "}
      <FlexStyle>
        <Form.Item
          className="flex-1"
          name={["indicator", "discarded_units_collection_problem"]}
          label="Number of discarded units by overweight/
underweight due to collection problem"
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
          label="Number of discarded units by passed the expiry date"
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
          label="Number of discarded units by processing problems /
Lab Accident"
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
          label="Number of discarded units by reactive for TTIs /
Infectious Disease"
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
          name={["indicator", "discarded_units_hemolyzed"]}
          label="Number of discarded units by Hemolyzed "
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
          label="Number of discarded units by Clotted."
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
          label="Number of discarded units by storage problems"
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
          label="Number of discarded units by transportation problems"
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
          name={["indicator", "discarded_units_highod"]}
          label=". Number of discarded units by high OD"
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
          label="Number of discarded units by others"
        >
          <InputNumber
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>
      </FlexStyle>
    </div>
  );
  const step_nine = (
    <div>
      <FlexStyle>
        <Form.Item
          className="flex-1"
          name={["indicator", "requested_aplus_wb_crc"]}
          label="Number of A+ve WB & CRC requested by Health facility"
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
          name={["indicator", "requested_bplus_wbCrc"]}
          label="Number of B+ve WB & CRC requested by Health facility"
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
          name={["indicator", "requested_abplus_wb_crc"]}
          label="Number of AB+ve WB & CRC requested by Health facility"
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
          label="Number of O+ve WB & CRC requested by Health
facility"
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
          label="Number of A-ve WB & CRC requested by Health
facility"
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
          label="Number of B-ve WB & CRC requested by Health
facility. "
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
          name={["indicator", "requested_abminus_wb_crc"]}
          label=". Number of AB-ve WB & CRC requested by Health
facility. "
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
          label="reNumber of O-ve WB & CRC requested by Health
facility. quested_ominus_wb_crc"
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
          label="Total number of units of FFP requested by Health
facility. "
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
          label="Total number of units of Platelets requested by
Health facility. "
        >
          <InputNumber
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>
      </FlexStyle>
    </div>
  );
  const step_ten = (
    <div>
      {" "}
      <FlexStyle>
        <Form.Item
          className="flex-1"
          name={["indicator", "distributed_aplus_wb_crc"]}
          label="Number of A+ve WB & CRC distributed to Health
facility"
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
          label="Number of B+ve WB & CRC distributed to Health
facility"
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
          label="Number of AB+ve WB & CRC distributed to
Health facility."
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
          label="Number of O+ve WB & CRC distributed to Health
facility"
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
          name={["indicator", "distributed_aminus_wb_crc"]}
          label="Number of A-ve WB & CRC distributed to Health
facility."
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
          label="Number of B-ve WB & CRC distributed to Health
facility"
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
          label="Number of AB-ve WB & CRC distributed to
Health facility"
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
          label=". Number of O-ve WB & CRC distributed to Health
facility"
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
          name={["indicator", "distributed_ffp_units"]}
          label="Total number of units of FFP distributed to Health
facility."
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
          label="Total number of units of Platelets distributed to
Health facility."
        >
          <InputNumber
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>
      </FlexStyle>
    </div>
  );
  const step_eleven = (
    <div>
      <FlexStyle>
        <Form.Item
          className="flex-1"
          name={["indicator", "transferred_aplus_wb_crc"]}
          label="Number of A+ve WB & CRC transferred to other
blood banks"
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
          label="Number of B+ve WB & CRC transferred to other
blood banks"
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
          name={["indicator", "transferred_abplus_wb_crc"]}
          label="Number of AB+ve WB & CRC transferred to other
blood banks"
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
          label="Number of O+ve WB & CRC transferred to other
blood banks"
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
          label="Number of A-ve WB & CRC transferred to other
blood banks"
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
          label="Number of B-ve WB & CRC transferred to other
blood banks"
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
          name={["indicator", "transferred_abminus_wb_crc"]}
          label="Number of AB-ve WB & CRC transferred to other
blood banks"
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
          label="Number of O-ve WB & CRC transferred to other
blood banks"
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
          label="Total number of units of FFP transferred to other
blood banks"
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
          label="Total number of units of Platelets transferred to
other blood banks"
        >
          <InputNumber
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>
      </FlexStyle>
    </div>
  );
  const step_twelve = (
    <div>
      <FlexStyle>
        <Form.Item
          className="flex-1"
          name={["indicator", "health_facilities_performing_transfusion"]}
          label="Total number of HFs (Health Facilities) that perform
blood transfusion"
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
          label="Total number of HFs that have HTC"
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
          label="Number of HFs that perform clinical audit."
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
          label="Number of male patients transfused."
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
          name={["indicator", "female_patients_transfused"]}
          label="Number of female patients transfused."
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
          label="Number of patients transfused under 5 years"
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
          label="Number of patients transfused 5 to 14 years"
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
          label="Number of patients transfused 15 to 44 years"
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
          name={["indicator", "patients45_to59_transfused"]}
          label="Number of patients transfused 45 to 59 years."
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
          label=".Number of patients transfused 60 years or older."
        >
          <InputNumber
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>
      </FlexStyle>
    </div>
  );
  const step_thirteen = (
    <div>
      <FlexStyle>
        <Form.Item
          className="flex-1"
          name={["indicator", "whole_blood_transfused"]}
          label=".Number of units of whole blood transfused"
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
          name={["indicator", "redCells_transfused"]}
          label="Number of units of Red cells transfused"
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
          name={["indicator", "platelets_transfused"]}
          label="Number of units of Platelets transfused"
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
          label="Number of units of FFP transfused"
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
          label=".Number of units of cryoprecipitate transfused"
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
          label="Number of immunological hemolysis due to ABO
incompatibility"
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
          name={["indicator", "suspected_hemolysis_other_allo_antibody"]}
          label=".Number of SUSPECTED immunological hemolysis
due to other allo-antibody"
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
          name={["indicator", "nonImmunological_hemolysis"]}
          label="Number of non-immunological hemolysis"
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
          label="Number of post transfusion purpura"
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
          label="Number of anaphylaxis / hypersensitivities"
        >
          <InputNumber
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>
      </FlexStyle>
    </div>
  );

  const step_fourteen = (
    <div>
      <FlexStyle>
        <Form.Item
          className="flex-1"
          name={["indicator", "transfusion_related_lung_injury"]}
          label="Number of transfusion-related acute lung injury
(TRALI)"
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
          name={["indicator", "graft_versusHost_disease"]}
          label="Number of grafts versus host disease"
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
          label="Number of SUSPECTED transfusion-associated
HIV-1/2 infection"
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
          label="Number of SUSPECTED transfusion-associated
HBV infection"
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
          name={["indicator", "suspected_transfusion_associated_hcv"]}
          label="Number of SUSPECTED transfusion-associated
HCV infection"
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
          label=".Number of SUSPECTED sepsis due to bacterial
contamination of the donor unit."
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
          label="Number of SUSPECTED transfusion-associated
malaria infection"
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
          label="Number of SUSPECTED other transfusionassociated parasitic infection"
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
          name={["indicator", "transfusion_associated_circulatory_overload"]}
          label="Number of transfusion-associated circulatory
overload"
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
          label=".Number of other serious ATR"
        >
          <InputNumber
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>
      </FlexStyle>
    </div>
  );

  const step_fifteen = (
    <div>
      <FlexStyle>
        <Form.Item
          className="flex-1"
          name={["indicator", "hiv_elisa_kits_stock"]}
          label=".Number of HIV ELISA kit stock at hand"
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
          label="Number of HBV ELISA kit stock at hand"
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
          name={["indicator", "hcv_elisa_kits_stock"]}
          label="Number of HCV ELISA kit stock at hand"
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
          label="Number of Syphilis ELISA kit stock at hand"
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
          label=". Number of 350 ml Blood Bag stock at hand"
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
          label="Number of 450 ml single Blood Bag stock at hand"
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
          name={["indicator", "blood_bag450ml_triple_stock"]}
          label="Number of 450 ml triple Blood Bag stock at hand"
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
          label="Number of transfusions set stock at hand."
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
          label="Number of Days stock out any ELISA kit"
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
          label=".Number of Days stock out any Blood Bag"
        >
          <InputNumber
            className="border-gray-400 py-1 w-full"
            style={{
              minWidth: 150,
            }}
          />
        </Form.Item>
      </FlexStyle>
    </div>
  );
  const steps = [
    {
      title: "",
      content: step_one,
    },
    {
      title: "",
      content: step_two,
    },
    {
      title: "",
      content: step_three,
    },
    {
      title: "",
      content: step_four,
    },
    {
      title: "",
      content: step_five,
    },
    {
      title: "",
      content: step_six,
    },
    {
      title: "",
      content: step_seven,
    },
    {
      title: "",
      content: step_eight,
    },
    {
      title: "",
      content: step_nine,
    },
    {
      title: "",
      content: step_ten,
    },
    {
      title: "",
      content: step_eleven,
    },
    {
      title: "",
      content: step_twelve,
    },
    {
      title: "",
      content: step_thirteen,
    },
    {
      title: "",
      content: step_fourteen,
    },
    {
      title: "",
      content: step_fifteen,
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
    setForms({ ...forms, date: dateString });
  };
  const onChangeSubmissionDate = (date, dateString) => {
    console.log(date, dateString);
    setForms({ ...forms, submissionDate: dateString });
  };
  const onChangeDueDate = (date, dateString) => {
    console.log(date, dateString);
    setForms({ ...forms, dueDate: dateString });
  };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    setForms({ ...forms, isPublished: checked });
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

      {type == "form" ? (
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
            name={["form", "siteId"]}
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
                value={
                  mode
                    ? selectedSite?.name
                    : selectedSites?.length + " site are selected"
                }
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
            name={["form", "submissionDate"]}
            label="Report Date:"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker onChange={onChangeSubmissionDate} />
          </Form.Item>
          <Form.Item
            className="flex-1 "
            name={["form", "date"]}
            label="Start Date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker onChange={onChangeDate} />
          </Form.Item>
          <Form.Item
            className="flex-1 "
            name={["form", "dueDate"]}
            label="Due date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker onChange={onChangeDueDate} />
          </Form.Item>

          <Form.Item
            className="flex-1 "
            name={["form", "isPublished"]}
            label="Disabled"
          >
            <Switch onChange={onChange} />
          </Form.Item>

          {/* <Form.Item name={["indicator", "isPublish"]} label="Is publish">
          <Switch
            checked={switch2}
            onChange={(value) => setSwitch2(value)}
            style={{ background: switch2 ? "blue" : "gray" }}
          />
        </Form.Item> */}

          <ButtonStyle>
            <button onClick={() => setIsModalOpen(false)}>cancel</button>
            <button type="submit">Submit</button>
          </ButtonStyle>
        </FormStyle>
      ) : (
        <FormStyle
          form={form}
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
          onError={() => {}}
          validateMessages={validateMessages}
        >
          {/* **************************** steper ****************************** */}
          <>
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div
              style={{
                marginTop: 24,
              }}
            >
              {type != "imported" && (
                <>
                  {current < steps.length - 1 && (
                    <Button htmlType="submit" type="primary">
                      Next
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button
                      htmlType="submit"
                      type="primary"
                      onClick={() => message.success("Processing complete!")}
                    >
                      Done
                    </Button>
                  )}
                </>
              )}

              {type == "imported" && (
                <>
                  {current < steps.length - 1 && (
                    <Button htmlType="submit" type="primary">
                      Next
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button
                      htmlType="submit"
                      type="primary"
                      onClick={() => message.success("Processing complete!")}
                    >
                      Done
                    </Button>
                  )}
                </>
              )}

              {current > 0 && (
                <Button
                  style={{
                    margin: "0 8px",
                  }}
                  onClick={() => prev()}
                >
                  Previous
                </Button>
              )}

              {/* {type == "imported" && (
                <Button
                  htmlType="submit"
                  style={{
                    margin: "0 8px",
                  }}
                >
                  Save
                </Button>
              )} */}
            </div>
          </>
          {/* ******************************** steper *************************** */}

          {/* <ButtonStyle>
          <button onClick={() => setIsModalOpen(false)}>cancel</button>
          <button type="submit">Submit</button>
        </ButtonStyle> */}
        </FormStyle>
      )}
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
