import { DatePicker, Empty, Select, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { searchRegions } from "../regions/RegionsRedux";
import indicatorsService from "../indicators/IndicatorsService";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import AdminPrintReport from "./AdminPrintReport";
import { indicators } from "../../utils/indicators";
import ExcelExport from "../../utils/ExcelExport";
import { selectCurrentUser } from "../../redux/auth/authSlice";
const { RangePicker } = DatePicker;
const { Option } = Select;

const dateFormat = "YYYY-MM-DD";
const PDC = () => {
  const [loading, setLoading] = useState("false");

  const [forms, setForms] = useState({
    regionId: null,
    toDate: "9999-09-03",
    formDate: "1970-09-03",
  });
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    searchReport(forms.toDate, forms.formDate);
  }, []);

  async function searchReport(toDate, formDate, regionId, reg) {
    try {
      const res = await indicatorsService.getRegionReport(toDate, formDate);
      console.log(" console.log(res.data);,", res);
      setData(res);

      //   funcCol(regionId, res, reg);
      // transformData(res);
    } catch (err) {
      console.log(err);
    }
  }

  const columns = [
    {
      title: "Blood bank",
      dataIndex: "regionName",

      sorter: false,
      width: 300,
    },
    {
      title: "Pre-donation information",
      dataIndex: "target",
      render: (_, record) => {
        return <p>{record.pre_donation_information_given}</p>;
      },
      sorter: false,
    },
    {
      title: "Donors presenting for pre-donation counselling",
      dataIndex: "target",
      render: (_, record) => {
        return <p>{record.pre_donation_counselling}</p>;
      },
      sorter: false,
    },
    {
      title: "Donation ",
      dataIndex: "target",
      render: (_, record) => {
        return <p>{record.male_patients_transfused}?</p>;
      },
      sorter: false,
    },
    {
      title: "Donors receiving PDC service",
      dataIndex: "target",
      render: (_, record) => {
        return <p>{record.male_patients_transfused}?</p>;
      },
      sorter: false,
    },
    {
      title: "Donors receiving PDC service from Mobile site",
      dataIndex: "target",
      render: (_, record) => {
        // return <p>{record.male_patients_transfused}</p>;
        return (
          <p>
            {" "}
            {(
              (100 * record.post_donation_counselling_from_mobile) /
              record.total_blood_donations
            ).toFixed(1)}
            %
          </p>
        );
      },
      sorter: false,
    },
    {
      title: "Donors receiving PDC service from Center",
      dataIndex: "target",
      render: (_, record) => {
        // return <p>{record.male_patients_transfused}</p>;
        return (
          <p>
            {" "}
            {(
              (100 * record.post_donation_counselling_from_center) /
              record.total_blood_donations
            ).toFixed(1)}
            %
          </p>
        );
      },
      sorter: false,
    },
    {
      title: "Non-Reactive donors who receive PDC",
      dataIndex: "target",
      render: (_, record) => {
        return <p>{record.non_reactive_donors_receiving_pdc}</p>;
      },
      sorter: false,
    },
    {
      title: "Reactive donors who receive PDC",
      dataIndex: "target",
      render: (_, record) => {
        return <p>{record.reactive_donors_receiving_pdc}</p>;
      },
      sorter: false,
    },
    {
      title: "Referred donors that was reactive",
      dataIndex: "target",
      render: (_, record) => {
        return <p>{record.referred_reactive_donors_receiving_pdc}</p>;
      },
      sorter: false,
    },
    {
      title: "Percentage of Self Deferral ",
      dataIndex: "target",
      render: (_, record) => {
        // return <p>{record.male_patients_transfused}</p>;
        return (
          <p>
            {" "}
            {(
              (100 * record.male_patients_transfused) /
              record.total_blood_donations
            ).toFixed(1)}
            % ??
          </p>
        );
      },
      sorter: false,
    },
    {
      title: "Deferral  Rate",
      dataIndex: "target",
      render: (_, record) => {
        // return <p>{record.male_patients_transfused}</p>;
        return (
          <p>
            {" "}
            {(
              (100 * record.male_patients_transfused) /
              record.total_blood_donations
            ).toFixed(1)}
            % ??
          </p>
        );
      },
      sorter: false,
    },
    {
      title: "PDC service Covarage",
      dataIndex: "target",
      render: (_, record) => {
        // return <p>{record.male_patients_transfused}</p>;
        return (
          <p>
            {" "}
            {(
              (100 * record.male_patients_transfused) /
              record.total_blood_donations
            ).toFixed(1)}
            % ??
          </p>
        );
      },
      sorter: false,
    },
  ];

  const onChangeToDate = (date, dateString) => {
    console.log(date, dateString);
    setForms({ ...forms, toDate: dateString });
  };
  const onChangeFromDate = (date, dateString) => {
    console.log(date, dateString);
    if (dateString[0] == "" && dateString[1] == "") {
      setForms({ ...forms, toDate: "9999-09-03", formDate: "1970-09-03" });
      searchReport("9999-09-03", "1970-09-03", forms.regionId, regionsData);
    } else {
      setForms({ ...forms, formDate: dateString[1], toDate: dateString[1] });
      searchReport(dateString[1], dateString[0], forms.regionId, regionsData);
    }
  };
  const onRegionChange = (val) => {
    console.log(val);
    setForms({ ...forms, regionId: val });
    searchReport(forms.toDate, forms.formDate, val, regionsData);
  };
  console.log("cols: ", columns);
  const reportGenerator = async () => {
    console.log("======-------", forms);
    AdminPrintReport(
      data,
      reportData,
      forms.formDate,
      forms.toDate,
      regionsData,
      forms.regionId,
      user?.user?.firstName + " " + user?.user?.lastName
    );
    message.success("Report printed successfully!");
  };
  return (
    <TableStyle className="gap-14  max-w-[1200px] m-5 md:mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex gap-10 my-5">
          {/* {regionsData?.length != 0 && (
            <Select
              onChange={onRegionChange}
              className="border-gray-400 w-[300px]"
              placeholder="select your role"
              defaultValue={regionsData && regionsData[0]?._id}
            >
              {regionsData?.map((region) => (
                <Option value={region._id}>{region.name}</Option>
              ))}
            </Select>
          )} */}
          <RangePicker
            // defaultValue={[
            //   dayjs("2019-09-03", dateFormat),
            //   dayjs("2019-11-22", dateFormat),
            // ]}
            onChange={onChangeFromDate}
          />
        </div>
        <div className="flex  gap-2">
          {/* <div>
            <ExcelExport
              regionId={forms.regionId}
              regionsData={regionsData}
              formDate={forms.formDate}
              toDate={forms.toDate}
              data={data}
              reportData={reportData}
              fileName="employees"
            />
          </div> */}
          <button
            onClick={() => reportGenerator("print")}
            className="bg-red-700 text-white py-1 px-8 rounded-lg mr-8"
          >
            Print
          </button>
          {/* <button className="bg-red-700 text-white py-1 px-8 rounded-lg">
            Get Exel
          </button> */}
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <Table
          scroll={{
            x: 700,
          }}
          loading={loading}
          rowKey={"_id"}
          locale={{
            emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />,
          }}
          columns={columns}
          dataSource={data}
          pagination={false}
          className=" text-base"
        />
      </div>
    </TableStyle>
  );
};
export const TableStyle = styled.div`
  th {
    font-size: 17px;

    background-color: #fafafa !important;
  }

  tr {
    font-size: 17px;
  }

  tr:n {
    font-size: 17px;
    background-color: #ffffff;
  }
`;

export default PDC;
