import React from "react";
import { Tabs } from "antd";
import AdminDashboard from "./AdminDashboard";
import DonatoinReport from "./DonatoinReport";
import Lab_Screening from "./Lab_Screening";
import ComponentProduction from "./ComponentProduction";
import Discharge from "./Discharge";
import RhplusVeBlood from "./RhplusVeBlood";
import RhMinusVeBlood from "./RhMinusVeBlood";
import BloodUtilization from "./BloodUtilization";
import PDC from "./PDC";
import Logstics from "./Logstics";

const ReportTab = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: <p className=" p-2 text-lg">Tab 1</p>,
      children: <AdminDashboard />,
    },
    {
      key: "2",
      label: <p className=" p-2 text-lg">Donation</p>,
      children: <DonatoinReport />,
    },
    {
      key: "3",
      label: <p className=" p-2 text-lg">Component Production</p>,
      children: <ComponentProduction />,
    },
    {
      key: "4",
      label: <p className=" p-2 text-lg">Lab Screenings</p>,
      children: <Lab_Screening />,
    },

    {
      key: "5",
      label: <p className=" p-2 text-lg">Discharge</p>,
      children: <Discharge />,
    },
    {
      key: "6",
      label: <p className=" p-2 text-lg"> RH+ve Blood Satisfaction </p>,
      children: <RhplusVeBlood />,
    },
    {
      key: "7",
      label: <p className=" p-2 text-lg">RH-ve Blood Satisfaction </p>,
      children: <RhMinusVeBlood />,
    },
    {
      key: "8",
      label: <p className=" p-2 text-lg">Blood Utilization</p>,
      children: <BloodUtilization />,
    },
    {
      key: "9",
      label: <p className=" p-2 text-lg">PDC</p>,
      children: <PDC />,
    },

    {
      key: "10",
      label: <p className=" p-2 text-lg"> Logstic</p>,
      children: <Logstics />,
    },
  ];

  return (
    <div>
      <div className=" m-5">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  );
};

export default ReportTab;
