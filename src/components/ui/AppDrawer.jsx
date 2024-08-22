import React, { useState } from "react";
import { Button, Drawer } from "antd";
import styled from "styled-components";
const AppDrawer = ({
  children,
  closable,
  getContainer,
  open,
  placement,
  setOpen,
}) => {
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      getContainer={getContainer}
      placement={placement}
      title="Menu"
      onClose={onClose}
      closable={closable}
      open={open}
    >
      <Container>{children}</Container>
    </Drawer>
  );
};
const Container = styled.div`
  .links_small {
    display: flex;
    flex-direction: column;
    li {
      list-style: none;
      a {
        text-decoration: none;
        display: block;
        padding: 14px;
        font-size: 18px;
        color: black;
        /* margin: 0 20px; */
      }
      a:hover {
        color: #bb2424;
      }
    }
  }
  .button_con {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* width: 140px; */
    background-color: #b81010;
    padding: 13px 37px;
    border-radius: 100px;
    gap: 10px;
    max-width: 200px;

    button {
      background-color: transparent;
      border: none;
      color: white;
      /* font-weight: bold; */
      font-size: 20px;
    }
  }
`;
export default AppDrawer;
