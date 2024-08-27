import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AppDrawer from "../ui/AppDrawer";
import SettingSide from "./SettingSide";
import styled from "styled-components";
import { AiOutlineMenuUnfold } from "react-icons/ai";

const SettingLayout = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Container className="flex max-w-[1400px] m-auto">
      <div
        className="side-bar border-r-2 border-gray-700"
        style={{
          height: "calc(100vh - 200px)",

          minWidth: 300,
          marginTop: 20,
        }}
      >
        <SettingSide />
      </div>
      <div
        onClick={() => setOpenDrawer(true)}
        className=" block cursor-pointer  md:hidden p-4"
      >
        <p className="bg-red-700 text-white p-2 rounded mt-5">Open the menu</p>
      </div>
      <AppDrawer
        closable={true}
        placement={"right"}
        open={openDrawer}
        setOpen={setOpenDrawer}
      >
        <SettingSide setOpenDrawer={setOpenDrawer} />
      </AppDrawer>
      <div className="flex-1 m-5 p-5">
        <Outlet />
      </div>
    </Container>
  );
};

const Container = styled.div`
  .side-bar {
    display: block;
  }
  @media only screen and (max-width: 768px) {
    .side-bar {
      display: none;
    }
  }
`;

export default SettingLayout;
