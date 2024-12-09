import React, { useEffect, useState } from "react";
import indicatorsService from "./indicators/IndicatorsService";
import { indicators } from "../utils/indicators";
import styled from "styled-components";
import { DatePicker, Empty, Spin } from "antd";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
const { RangePicker } = DatePicker;

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exelData, setExelData] = useState([]);
  const [forms, setForms] = useState({
    regionId: null,
    toDate: "9999-09-03",
    formDate: "1970-09-03",
  });
  useEffect(() => {
    searchReport(null, null, null, "9999-09-03", "1970-09-03");
  }, []);
  async function searchReport(type, siteId, regionId, toDate, formDate) {
    try {
      setLoading(true);
      const res = await indicatorsService.getHomeReport(
        "all",
        siteId,
        regionId,
        toDate,
        formDate
      );
      console.log(" console.log(res.data);,", res);
      const x = Object.keys(res[0]).map((key) => ({
        name: key,
        val: res[0][key],
      }));
      const y = x.map((data) => ({
        name: indicators[data.name],
        value: data.val,
      }));
      console.log("yyyyyyyyyyyyyy::", y);
      setData(x);
      setExelData(y);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(exelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `data-${new Date()}.xlsx`);
  };
  const onChangeFromDate = (date, dateString) => {
    console.log(date, dateString);
    if (dateString[0] == "" && dateString[1] == "") {
      setForms({ ...forms, toDate: "9999-09-03", formDate: "1970-09-03" });
      searchReport(null, null, null, "9999-09-03", "1970-09-03");
    } else {
      setForms({ ...forms, formDate: dateString[0], toDate: dateString[1] });
      searchReport(null, null, null, dateString[1], dateString[0]);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row  justify-between mx-10 max-w-[1000px] m-5 md:mx-auto">
        <RangePicker
          // defaultValue={[
          //   dayjs("2019-09-03", dateFormat),
          //   dayjs("2019-11-22", dateFormat),
          // ]}
          onChange={onChangeFromDate}
        />
        <button
          onClick={() => exportToExcel()}
          className="flex  bg-green-600 text-white py-2 px-10 rounded-full flex-wrap justify-center gap-12 "
        >
          Download Exel{" "}
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-12 max-w-[1200px] m-5 md:mx-auto">
        {loading ? (
          <SpinContainer className="spin_con flex justify-center items-center">
            <Spin size="large" />
          </SpinContainer>
        ) : (
          <>
            {data.length == 0 ? (
              <Empty />
            ) : (
              data.map((d) => <Card num={d?.val} title={d?.name} />)
            )}
          </>
        )}
      </div>
    </div>
  );
};

const Card = ({ num, title }) => {
  return (
    <div className="bg-blue-200 w-[300px] h-48 rounded-xl">
      <p className="text-5xl text-center pt-7">{num}</p>
      <p className="text-xl text-center pt-1 mx-1">{indicators[title]}</p>
    </div>
  );
};
const SpinContainer = styled.div`
  height: calc(100vh - 200px);
  .ant-spin-dot-item {
    background-color: #be0a0a;
  }
`;

export default Home;
