import { Input, InputNumber, message } from "antd";
import React, { useEffect, useState } from "react";
import instance from "../api/api";

const TargetSettingPage = () => {
  const [date, setDate] = useState(null);
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState(null);

  useEffect(() => {
    feactSetting();
  }, []);

  const feactSetting = async () => {
    try {
      const setting = await instance.get("/sites");
      console.log("setting", setting.data);
      setData(setting.data?.data);
      const x = {};
      setting.data?.data?.forEach((d) => {
        x[d?._id] = d.target;
      });

      setInputs(x);
    } catch (error) {
      console.log(error);
    }
  };
  const updateSetting = async (id, e) => {
    console.log(id, e.target.value);
    try {
      const setting = await instance.patch("/sites/" + id, {
        target: e.target.value,
      });
      console.log("setting", setting.data);
      message.success("updated successfully");
    } catch (error) {
      console.log(error);
    }
  };
  console.log("inputs", inputs);
  return (
    <div className="gap-14  max-w-[500px] m-5 md:mx-auto">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                name
              </th>
              <th scope="col" class="px-6 py-3">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((d, i) => (
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <td class="px-6 py-4">{d?.name}</td>
                {/* <p className="min-w-fit p-2 float-right">{d?.name}</p> */}
                <td class="px-6 py-4">
                  <InputNumber
                    onChange={(e) => setInputs({ [d._id]: e.target.value })}
                    value={inputs[d._id]}
                    onBlur={(e) => updateSetting(d._id, e)}
                    className="max-w-[250px]"
                  />
                </td>
              </tr>
            ))}
            {/* <td class="px-6 py-4">{"KLml"}</td>
              <td class="px-6 py-4">{"lk"}</td> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TargetSettingPage;
