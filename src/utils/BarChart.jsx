import React, { Component, useEffect, useState } from "react";
import Chart from "react-apexcharts";

const ChatApp = ({ data, type }) => {
  console.log("ChatApp", data, type);
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={data.options}
            series={data.series}
            type={type}
            width="500"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
