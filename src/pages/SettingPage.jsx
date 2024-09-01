import { InputNumber } from "antd";
import React from "react";

const SettingPage = () => {
  const onChange = (value) => {
    console.log("changed", value);
  };
  return (
    <div className="gap-14  max-w-[1200px] m-5 md:mx-auto">
      <div className="ml-10">
        <div className="flex gap-8 items-center mt-10">
          <p className="text-xl w-[270px] bg-gray-200  px-5 rounded-lg ">
            Report form visibility start 1 date in the month
          </p>
          <InputNumber onChange={onChange} />
        </div>
        <div className="flex gap-8 items-center mt-5 ">
          <p className="text-xl w-[270px] bg-gray-200 px-5 rounded-lg ">
            Duration of report form online in days
          </p>
          <InputNumber onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
