import React from "react";
import mainLogo from "../assets/main-logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import styled from "styled-components";
import TobBarLine from "./ui/TobBarLine";
const Navbar = () => {
  return (
    <Styled>
      <div className="navbar">
        <img src={mainLogo} width={200} alt="" />
        <div className="links">
          <li>
            <a href="/">Admin Report</a>{" "}
          </li>
          <li>
            <a href="/">Branch</a>{" "}
          </li>
          <li>
            <a href="/">User</a>{" "}
          </li>
          <li>
            <a href="/">Setting</a>{" "}
          </li>
        </div>

        <div className="button_con">
          <FaRegUserCircle size={30} color="white" />
          <button>Jhon dow</button>
        </div>
      </div>
      <TobBarLine />
    </Styled>
  );
};

const Styled = styled.div`
  .navbar {
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .links {
    display: flex;
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

    button {
      background-color: transparent;
      border: none;
      color: white;
      /* font-weight: bold; */
      font-size: 20px;
    }

    /* @media only screen and (max-width: 600px) {
  .links {
    display: none;
  }
  .munu_icon {
    display: block;
  } */
    /* } */
  }
`;
export default Navbar;
