import React, { useEffect, useState } from "react";
import indicatorsService from "./indicators/IndicatorsService";
import { indicators } from "../utils/indicators";
import styled from "styled-components";
import { Empty, Spin } from "antd";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    searchReport();
  }, []);
  async function searchReport(type, siteId, regionId) {
    try {
      setLoading(true);
      const res = await indicatorsService.getHomeReport(
        "all",
        siteId,
        regionId
      );
      console.log(" console.log(res.data);,", res[0]);
      const x = Object.keys(res[0]).map((key) => ({
        name: key,
        val: res[0][key],
      }));
      console.log(x);
      setData(x);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  return (
    <div className="flex flex-wrap justify-center gap-12 max-w-[1200px] m-5 md:mx-auto">
      {loading ? (
        <SpinContainer className="spin_con flex justify-center items-center">
          <Spin size="large" />
        </SpinContainer>
      ) : (
        <>
          {data.length == 0 ? (
            <Empty />
          ) : (
            data.map((d) => <Card num={d?.val} title={d?.name} />)
          )}
        </>
      )}
    </div>
  );
};

const Card = ({ num, title }) => {
  return (
    <div className="bg-gray-300 w-[300px] h-48 rounded-xl">
      <p className="text-5xl text-center pt-7">{num}</p>
      <p className="text-xl text-center pt-1 mx-1">{indicators[title]}</p>
    </div>
  );
};
const SpinContainer = styled.div`
  height: calc(100vh - 200px);
  .ant-spin-dot-item {
    background-color: #be0a0a;
  }
`;

export default Home;
