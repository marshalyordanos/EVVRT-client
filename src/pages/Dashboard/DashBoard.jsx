import React, { useEffect, useState } from "react";
import ChatApp from "../../utils/BarChart";
import indicatorsService from "../indicators/IndicatorsService";
import { searchRegions } from "../regions/RegionsRedux";
import { useDispatch } from "react-redux";
import { DatePicker, Select } from "antd";
import Chart from "react-apexcharts";
import { indicators } from "../../utils/indicators";
const { RangePicker } = DatePicker;

const DashBoard = () => {
  const [forms, setForms] = useState({
    regionId: null,
    toDate: "9999-09-03",
    formDate: "1970-09-03",
  });
  const [loading, setLoading] = useState("false");
  const [ind, setInd] = useState(null);
  const [ind2, setInd2] = useState(null);
  const [resInd, setResInd] = useState(null);
  const [dataMonth, setDataMonth] = useState([]);

  const [regionsData, setRegionsData] = useState([]);

  const [data, setData] = useState(null);
  const [male_femaleData, setMale_femaleData] = useState(null);

  const [data2, setData2] = useState(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   searchReport(forms.toDate, forms.formDate);
  // }, []);
  useEffect(() => {
    console.log("statrt");
    searchReport(forms.toDate, forms.formDate);
    const currentYear = new Date().getFullYear().toString();

    searchMonthReport(currentYear);
  }, []);

  useEffect(() => {
    searchData();
  }, []);
  async function searchData() {
    try {
      setLoading(true);
      const { payload } = await dispatch(searchRegions("all"));
      console.log("payload", payload);
      setRegionsData(payload.data);

      if (payload.data?.length != 0) {
        setForms({ ...forms, regionId: payload.data[0]._id });
        searchReport(forms.toDate, forms.formDate, payload.data[0]?._id);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  async function searchMonthReport(year) {
    try {
      const res = await indicatorsService.getRegionReportMonth(year);
      console.log(
        " console.log(res.data): searchMonthReport:1 ",
        Object.keys(res[0])
          .filter((x) => x != "name" || x != "total")
          .map((x) => res[0][x])
      );
      setDataMonth(res);
      setMale_femaleData({
        options: {
          chart: {
            id: "basic-line",
          },
          xaxis: {
            categories: Object.keys(res[0]).filter(
              (x) => x != "name" && x != "total"
            ),
          },
          colors: ["#FF5733"], // Custom color for the line
        },
        series: [
          {
            name: "series-1",
            data: Object.keys(res[0])
              .filter((x) => x != "name" && x != "total")
              .map((x) => res[0][x]),
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  }
  async function searchReport(toDate, formDate, regionId) {
    try {
      const res = await indicatorsService.getAdminReport(
        toDate,
        formDate,
        regionId
      );
      if (res?.length > 0) {
        const xx = async (res) => {
          const d = Object.keys(res).filter((x) => {
            return indicators[x]?.startsWith("T");
          });
          return d;
        };
        const d = await xx(res[0]);
        console.log(" console.log(res.data);,11", d);

        setInd(d);
      }
      const x = res.map((r) => r?.siteName);
      const y = res.map((r) => r?.total_blood_donations);
      setResInd(res);
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
            text: "",
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
            name: "Total blood collection",
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
  const onRegionChange = (val) => {
    console.log(val);
    setForms({ ...forms, regionId: val });
    searchReport(forms.toDate, forms.formDate, val);
  };

  useEffect(() => {
    searchReportHome(null, null, null, "9999-09-03", "1970-09-03");
  }, []);
  async function searchReportHome(type, siteId, regionId, toDate, formDate) {
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
      // const x = Object.keys(res[0]).map((key) => ({
      //   name: key,
      //   val: res[0][key],
      // }));
      // const y = x.map((data) => ({
      //   name: indicators[data.name],
      //   value: data.val,
      // }));

      console.log("xxxxxxxxxxxxxx:", res[0]);

      // console.log("yyyyyyyyyyyyyy::", y);
      // setData(x);
      // setExelData(y);
      // setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  const onChangeFromDate = (date, dateString) => {
    console.log(date, dateString);
    if (dateString[0] == "" && dateString[1] == "") {
      setForms({ ...forms, toDate: "9999-09-03", formDate: "1970-09-03" });
      searchReport("9999-09-03", "1970-09-03", forms.regionId);
    } else {
      setForms({ ...forms, formDate: dateString[0], toDate: dateString[1] });
      searchReport(dateString[1], dateString[0], forms.regionId);
    }
  };
  const onIndChnage = (val) => {
    setInd2(val);
    console.log(
      "resInd::",
      val,
      dataMonth.find((x) => x.name == val)
    );
    const y = resInd.map((r) => r[val]);

    setMale_femaleData({
      options: {
        chart: {
          id: "basic-line",
        },
        xaxis: {
          categories: Object.keys(dataMonth.find((x) => x.name == val)).filter(
            (x) => x != "name" && x != "total"
          ),
        },
        colors: ["#FF5733"], // Custom color for the line
      },
      series: [
        {
          name: "series-1",
          data: Object.keys(dataMonth.find((x) => x.name == val))
            .filter((x) => x != "name" && x != "total")
            .map((x) => dataMonth.find((x) => x.name == val)[x]),
        },
      ],
    });
    setData({
      ...data,
      series: [
        {
          name: indicators[val],
          data: y, // Data for each month
        },
      ],
    });
  };
  return (
    <div className=" max-w-full m-auto flex flex-col items-center ">
      <div className="px-10 pt-10 self-start flex  gap-4 ">
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
          picker="month"
          // defaultValue={[
          //   dayjs("2019-09-03", dateFormat),
          //   dayjs("2019-11-22", dateFormat),
          // ]}
          onChange={onChangeFromDate}
        />
        <div className="">
          {ind?.length != 0 && (
            <Select
              onChange={onIndChnage}
              className="border-gray-400 w-[300px]"
              placeholder="select your role"
              defaultValue={regionsData && regionsData[0]?._id}
            >
              {ind?.map((d, i) => (
                <Option value={d}>{indicators[d]}</Option>
              ))}
            </Select>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="bg-slate-100 w-[700px] my-10 p-6 rounded-xl">
          <p className="text-2xl">Region total blood donations </p>

          <div className="flex gap-3">
            <div className="w-[700px]">
              {data && <ChatApp type={"bar"} data={data} />}
            </div>
          </div>
          {/* {data2 && <ChatApp type={"pie"} data={data2} />} */}
        </div>
        <div className="bg-slate-100 w-[700px] my-10 p-6 rounded-xl">
          <p className="text-2xl">Total Female and male Donors </p>

          <div className="mixed-chart  flex justify-center items-center">
            {male_femaleData && (
              <Chart
                options={male_femaleData?.options}
                series={male_femaleData?.series}
                type="line"
                width={500}
                height={400}
              />
            )}
          </div>
          {/* {data2 && <ChatApp type={"pie"} data={data2} />} */}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
