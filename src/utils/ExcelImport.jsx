import React from "react";
import * as XLSX from "xlsx";

function FileInput({
  data,
  setData,
  setIsModalOpen,
  setModalImport,
  setType,
  id,
  setModeID,
}) {
  // const [data, setData] = React.useState(null);
  console.log("mode file:", id);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      setType("imported");
      event.preventDefault();
      // setModeID(id);
      setIsModalOpen(true);
      setModalImport(false);
      // setModeID(id);

      setData(sheetData);
      e.target.value = ""; // This clears the file input
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <label htmlFor="fileInput">
        <p className="bg-green-700 w-[115px] text-white rounded-lg p-[1px] text-center px-2 mx-2 border">
          {" "}
          Import Excel
        </p>
      </label>
      <input
        id="fileInput"
        className="hidden"
        type="file"
        onChange={handleFileUpload}
      />

      {/* {data && (
        <div>
          <h2>Imported Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
}

export default FileInput;
