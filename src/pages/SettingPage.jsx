import { InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import instance from "../api/api";

const SettingPage = () => {
  const [date, setDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);

  const [data, setData] = useState(null);
  const onChange = (value) => {
    console.log("changed", value);
    setDate(value);
    updateSetting(value, dueDate);
  };
  const onChangeTwo = (value) => {
    console.log("changed", value);
    setDueDate(value);
    updateSetting(date, value);
  };
  useEffect(() => {
    feactSetting();
  }, []);
  const feactSetting = async () => {
    try {
      const setting = await instance.get("/setting");
      console.log("setting", setting.data?.data[0]);
      setData(setting.data?.data[0]);
      setDate(setting.data?.data[0].date);
      setDueDate(setting.data?.data[0].dueDate);
    } catch (error) {
      console.log(error);
    }
  };
  const updateSetting = async (date, dueDate) => {
    try {
      const setting = await instance.post("/setting", { date, dueDate });
      console.log("setting", setting.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="gap-14  max-w-[1200px] m-5 md:mx-auto">
      <div className="ml-10">
        <div className="flex gap-8 items-center mt-10">
          <p className="text-xl w-[270px] bg-gray-200  px-5 rounded-lg ">
            Report form visibility start 1 date in the month
          </p>

          {date && <InputNumber defaultValue={date} onChange={onChange} />}
          {!date && <InputNumber onChange={onChange} />}
        </div>
        <div className="flex gap-8 items-center mt-5 ">
          <p className="text-xl w-[270px] bg-gray-200 px-5 rounded-lg ">
            Duration of report form online in days
          </p>
          {dueDate && (
            <InputNumber defaultValue={dueDate} onChange={onChangeTwo} />
          )}
          {!dueDate && <InputNumber onChange={onChangeTwo} />}
        </div>
      </div>
      {/* {JSON.stringify(form)} */}
    </div>
  );
};

export default SettingPage;
