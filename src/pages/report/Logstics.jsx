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
const Logstics = () => {
  const [loading, setLoading] = useState("false");
  const [dataMonth, setDataMonth] = useState([]);
  const [isMonthly, setIsMonthly] = useState(false);
  const [forms, setForms] = useState({
    regionId: null,
    toDate: "9999-09-03",
    formDate: "1970-09-03",
  });
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    searchReport(forms.toDate, forms.formDate);
    const currentYear = new Date().getFullYear().toString();

    searchMonthReport(currentYear);
  }, []);
  async function searchMonthReport(year) {
    try {
      const res = await indicatorsService.getRegionReportMonth(year);
      console.log(" console.log(res.data);,", res);
      setDataMonth(res);

      //   funcCol(regionId, res, reg);
      // transformData(res);
    } catch (err) {
      console.log(err);
    }
  }
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
    // {
    //   title: "AVERAGE Monthly Collection ",
    //   dataIndex: "target",

    //   sorter: false,
    // },
    {
      title: "HIV ELISA kit at hand",
      dataIndex: "hiv_elisa_kits_stock",
      render: (_, record) => {
        return <p>{record.hiv_elisa_kits_stock}</p>;
      },
      sorter: false,
    },
    {
      title: "HBV ELISA kitat hand",
      dataIndex: "hbv_elisa_kits_stock",
      render: (_, record) => {
        return <p>{record.hbv_elisa_kits_stock}</p>;
      },
      sorter: false,
    },
    {
      title: "HCV ELISA kitat hand",
      dataIndex: "hcv_elisa_kits_stock",
      render: (_, record) => {
        return <p>{record.hcv_elisa_kits_stock}</p>;
      },
      sorter: false,
    },
    {
      title: "Syphilis ELISA kitat hand",
      dataIndex: "target",
      render: (_, record) => {
        return <p>{record.syphilis_elisa_kits_stock}</p>;
      },
      sorter: false,
    },
    {
      title: "350 ml Blood Bag at hand",
      dataIndex: "target",
      render: (_, record) => {
        return <p>{record.blood_bag350ml_stock}</p>;
      },
      sorter: false,
    },
    {
      title: "450 ml single Blood Bag at hand",
      dataIndex: "target",
      render: (_, record) => {
        return <p>{record.blood_bag450ml_single_stock}</p>;
      },
      sorter: false,
    },
    {
      title: "450 ml triple Blood Bag at hand",
      dataIndex: "target",
      render: (_, record) => {
        return <p>{record.blood_bag450ml_triple_stock}</p>;
      },
      sorter: false,
    },
    {
      title: "Transfusion set at hand",
      dataIndex: "target",
      render: (_, record) => {
        return <p>{record.transfusion_set_stock}</p>;
      },
      sorter: false,
    },
    {
      title: "Days of Stock out any ELISA kit",
      dataIndex: "target",
      render: (_, record) => {
        return <p>{record.elisa_kits_stock_out_days}</p>;
      },
      sorter: false,
    },
    {
      title: "Days of Stock out any Blood Bag",
      dataIndex: "target",
      render: (_, record) => {
        return <p>{record.blood_bag_stock_out_days}</p>;
      },
      sorter: false,
    },
    {
      title: "HIV ELISA kit Days of stock at Hand",
      dataIndex: "target",
      // render: (_, record) => {
      //   return <p>{record.pre_donation_information_given}</p>;
      // },
      sorter: false,
    },
    {
      title: "HBV ELISA kit Days of stock at Hand",
      dataIndex: "target",
      // render: (_, record) => {
      //   return <p>{record.pre_donation_information_given}</p>;
      // },
      sorter: false,
    },
    {
      title: "HCV ELISA kit Days of stock at Hand",
      dataIndex: "target",
      // render: (_, record) => {
      //   return <p>{record.pre_donation_information_given}</p>;
      // },
      sorter: false,
    },
    {
      title: "Syphilis ELISA kit Days of stock at Hand",
      dataIndex: "target",
      // render: (_, record) => {
      //   return <p>{record.pre_donation_information_given}</p>;
      // },
      sorter: false,
    },
    {
      title: "Blood Bags Days of stock at Hand",
      dataIndex: "target",
      // render: (_, record) => {
      //   return <p>{record.pre_donation_information_given}</p>;
      // },
      sorter: false,
    },
    {
      title: "Transfusion set days of stock at hand",
      dataIndex: "target",
      // render: (_, record) => {
      //   return <p>{record.pre_donation_information_given}</p>;
      // },
      sorter: false,
    },
  ];
  const handleYearSelect = (date, dateString) => {
    console.log(date, dateString);
    if (dateString == "") {
      const currentYear = new Date().getFullYear().toString();

      searchMonthReport(currentYear);
    } else {
      searchMonthReport(dateString);
    }
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
    <div>
      {isMonthly ? (
        <div>
          <div className="flex justify-between items-center">
            <DatePicker onChange={handleYearSelect} picker="year" />
            <button
              onClick={() => setIsMonthly(false)}
              className="py-3 px-10 bg-yellow-500 text-white rounded-lg my-3 hover:bg-yellow-700"
            >
              back
            </button>
          </div>
          <MonthlyReport data={dataMonth} />
        </div>
      ) : (
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
                picker="month"
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
                onClick={() => setIsMonthly(true)}
                className="py-3 px-10 bg-green-700 text-white rounded-lg my-3 hover:bg-green-900"
              >
                Total by month
              </button>
              {/* <button
            onClick={() => reportGenerator("print")}
            className="bg-red-700 text-white py-1 px-8 rounded-lg mr-8"
          >
            Print
          </button> */}
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
      )}{" "}
    </div>
  );
};
const MonthlyReport = ({ data }) => {
  console.log("data month: ", data);
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              name
            </th>
            <th scope="col" class="px-6 py-3">
              Jan
            </th>
            <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Feb
            </th>
            <th scope="col" class="px-6 py-3">
              Mar
            </th>
            <th scope="col" class="px-6 py-3">
              Apr
            </th>
            <th scope="col" class="px-6 py-3">
              May
            </th>
            <th scope="col" class="px-6 py-3">
              Jun
            </th>
            <th scope="col" class="px-6 py-3">
              Jul
            </th>
            <th scope="col" class="px-6 py-3">
              Aug
            </th>
            <th scope="col" class="px-6 py-3">
              Sep
            </th>
            <th scope="col" class="px-6 py-3">
              Oct
            </th>
            <th scope="col" class="px-6 py-3">
              Nov
            </th>
            <th scope="col" class="px-6 py-3">
              Dec
            </th>
            <th scope="col" class="px-6 py-3">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((d) => {
            if (
              d.name == "hiv_elisa_kits_stock" ||
              d.name == "hbv_elisa_kits_stock" ||
              d.name == "hcv_elisa_kits_stock" ||
              d.name == "syphilis_elisa_kits_stock" ||
              d.name == "blood_bag350ml_stock" ||
              d.name == "blood_bag450ml_single_stock" ||
              d.name == "blood_bag450ml_triple_stock" ||
              d.name == "transfusion_set_stock" ||
              d.name == "elisa_kits_stock_out_days" ||
              d.name == "blood_bag_stock_out_days"
            ) {
              return (
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    {indicators[d?.name]}
                  </th>
                  <td class="px-6 py-4">{d["Jun"]}</td>

                  <td class="px-6 py-4">{d["Feb"]}</td>
                  <td class="px-6 py-4">{d["Mar"]}</td>
                  <td class="px-6 py-4">{d["Apr"]}</td>
                  <td class="px-6 py-4">{d["May"]}</td>
                  <td class="px-6 py-4">{d["Jun"]}</td>
                  <td class="px-6 py-4">{d["Jul"]}</td>
                  <td class="px-6 py-4">{d["Aug"]}</td>
                  <td class="px-6 py-4">{d["Sep"]}</td>
                  <td class="px-6 py-4">{d["Oct"]}</td>
                  <td class="px-6 py-4">{d["Nov"]}</td>
                  <td class="px-6 py-4">{d["Dec"]}</td>
                  <td class="px-6 py-4">{d["total"]}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
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

export default Logstics;
