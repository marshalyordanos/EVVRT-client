import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { indicators } from "./indicators";

const ExcelExportIndicators = ({ data }) => {
  console.log("indicators excel data: ", data);
  const report = Object.keys(data?.indicators).map((key) => ({
    name: indicators[key],
    value: data?.indicators[key],
  }));
  console.log("indicators excel data222: ", data?.indicators);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(report);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${data?.siteId?.name}_${data?.date}.xlsx`);
  };

  return (
    <button
      onClick={() => exportToExcel()}
      className="bg-green-700 text-white py-1 px-4 text-sm rounded-lg mr-2"
    >
      Excel
    </button>
  );
};

export default ExcelExportIndicators;
