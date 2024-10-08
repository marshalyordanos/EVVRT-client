import React, { useEffect, useState } from "react";
import ChatApp from "../../utils/BarChart";
import indicatorsService from "../indicators/IndicatorsService";

const DashBoard = () => {
  const [forms, setForms] = useState({
    regionId: null,
    toDate: "9999-09-03",
    formDate: "1970-09-03",
  });
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);

  useEffect(() => {
    searchReport(forms.toDate, forms.formDate);
  }, []);

  async function searchReport(toDate, formDate, regionId, reg) {
    try {
      const res = await indicatorsService.getRegionReport(toDate, formDate);
      console.log(" console.log(res.data);,", res);
      const x = res.map((r) => r?.regionName);
      const y = res.map((r) => r?.total_blood_donations);

      console.log(" console.log(res.data);,", x, y);

      setData({
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: x,
          },
          title: {
            text: "Monthly Sales Data",
            align: "center",
          },
          plotOptions: {
            bar: {
              horizontal: false,
              endingShape: "rounded",
            },
          },
        },
        series: [
          {
            name: "Sales",
            data: y, // Data for each month
          },
        ],
      });
      // setData2({
      //   options: {
      //     chart: {
      //       id: "basic-pie",
      //     },
      //     labels: ["Category A", "Category B", "Category C"],
      //     responsive: [{
      //       breakpoint: 480,
      //       options: {
      //         chart: {
      //           width: 200
      //         },
      //         legend: {
      //           position: 'bottom'
      //         }
      //       }
      //     }]
      //   },
      //   series: [44, 55, 41], // Data for each category
      // })
    } catch (err) {
      console.log(err);
    }
  }
  console.log("data: ", data);
  return (
    <div className=" max-w-[1200px] m-auto ">
      <div className="bg-slate-100 m-10 p-6 rounded-xl">
        <p className="text-2xl">Region total blood donations </p>
        {data && <ChatApp type={"bar"} data={data} />}
        {/* {data2 && <ChatApp type={"pie"} data={data2} />} */}
      </div>
    </div>
  );
};

export default DashBoard;
