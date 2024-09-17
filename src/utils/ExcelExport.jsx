import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const ExcelExport = ({ regionId,regionsData,formDate,toDate, reportData,data, fileName }) => {
  const [exelData,setExelData] = useState([])
  const [region,setRegion] = useState([])

 useEffect(()=>{
  const reg = regionsData.find((region) => region._id == regionId);
  //   let col = ""
  console.log("res",reg)
  setRegion(reg)
    console.log("reg",reportData,reg)
    let result = data.map(obj => {
      let newObj = { name: obj.name};
      reportData.forEach((key, index) => {
        newObj[key?.siteName] = obj[`value${index + 1}`] || null; // Dynamically assign value or null if missing
      });
      newObj["total"]= obj.total 
      return newObj;
    });
   setExelData(result)
 },[regionId,formDate,toDate])
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(exelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob, `${region?.name}${formDate}_to_${toDate}.xlsx`);
  };

  return (
    <button
    onClick={() => exportToExcel()}
    className="bg-green-700 text-white py-1 px-8 rounded-lg mr-2"
  >
    Excel
  </button>
  );
}

export default ExcelExport;