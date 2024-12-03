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
const AdminDashboard = () => {
  const [loading, setLoading] = useState("false");
  const [regionsData, setRegionsData] = useState([]);
  const [reportData, setReportData] = useState([]);

  const user = useSelector(selectCurrentUser);

  const [columns, setColumns] = useState();

  const [forms, setForms] = useState({
    regionId: null,
    toDate: "9999-09-03",
    formDate: "1970-09-03",
  });
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    searchData();
  }, []);

  const transformData = (data) => {
    console.log("+++++++++++++++++++", data);
    const keys = Object.keys(data[0]).filter(
      (key) => key !== "siteId" && key !== "siteName"
    );

    const f_data = keys?.map((key) => {
      const values = data?.map((entry) => entry[key]);
      const total = values.reduce((acc, value) => acc + value, 0);
      return {
        name: key,
        ...values.reduce(
          (acc, value, index) => ({ ...acc, [`value${index + 1}`]: value }),
          {}
        ),
        total,
      };
    });
    console.log("final data", f_data);
    setData(f_data);
  };

  async function searchData() {
    try {
      setLoading(true);
      const { payload } = await dispatch(searchRegions("all"));
      setRegionsData(payload.data);

      if (payload.data?.length != 0) {
        setForms({ ...forms, regionId: payload.data[0]._id });
        searchReport(
          forms.toDate,
          forms.formDate,
          payload.data[0]?._id,
          payload.data
        );
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  async function searchReport(toDate, formDate, regionId, reg) {
    try {
      const res = await indicatorsService.getAdminReport(
        toDate,
        formDate,
        regionId
      );
      console.log(" console.log(res.data);,", res);
      setReportData(res);

      funcCol(regionId, res, reg);
      transformData(res);
    } catch (err) {
      console.log(err);
    }
  }

  const funcCol = (val, res, regionsData) => {
    console.log("val", val);
    const reg = regionsData.find((region) => region._id == val);
    console.log("reg", reg);
    const cols = [
      {
        title: "Indicators",
        dataIndex: "name",
        render: (text, recored) => {
          return <p>{indicators[recored?.name]}</p>;
        },
        sorter: false,
        width: 300,
      },
    ];
    const col = {
      title: reg?.name,
      children: [],
    };
    if (res.length != 0) {
      res.forEach((rep, index) => {
        col.children.push({
          title: rep.siteName,
          dataIndex: "value" + (index + 1),
          key: "value" + (index + 1),
          sorter: false,
          // render: (text, recored) => {
          //   return <p>{JSON.stringify(recored)}</p>;
          // },
          width: 100,
        });
      });
      col.children.push({
        title: "Total",
        dataIndex: "total",
        key: "total",
        sorter: false,

        width: 100,
      });
    }
    setColumns([...cols, col]);
  };
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
          {regionsData?.length != 0 && (
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
          )}
          <RangePicker
            // defaultValue={[
            //   dayjs("2019-09-03", dateFormat),
            //   dayjs("2019-11-22", dateFormat),
            // ]}
            onChange={onChangeFromDate}
          />
        </div>
        <div className="flex  gap-2">
          <div>
            <ExcelExport
              regionId={forms.regionId}
              regionsData={regionsData}
              formDate={forms.formDate}
              toDate={forms.toDate}
              data={data}
              reportData={reportData}
              fileName="employees"
            />
          </div>
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
export default AdminDashboard;
