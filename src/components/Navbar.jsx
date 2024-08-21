import React, { useState } from "react";
import mainLogo from "../assets/main-logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import styled from "styled-components";
import TobBarLine from "./ui/TobBarLine";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenuFold } from "react-icons/ai";
import AppDrawer from "./ui/AppDrawer";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "../redux/auth/authSlice";
import { FaLongArrowAltLeft } from "react-icons/fa";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  console.log("user", user);

  return (
    <Styled>
      <AppDrawer open={openDrawer} setOpen={setOpenDrawer}>
        <div className="links_small">
          <li>
            <NavLink to="/">Admin Report</NavLink>{" "}
          </li>
          <li>
            <NavLink to="/">Branch</NavLink>{" "}
          </li>
          <li>
            <NavLink to="/users">User</NavLink>{" "}
          </li>
          <li>
            <NavLink to="/">Setting</NavLink>{" "}
          </li>
        </div>
        <div className="button_con">
          <FaRegUserCircle size={30} color="white" />
          <button>Jhon dow</button>
        </div>
      </AppDrawer>
      <div className="navbar">
        <img src={mainLogo} className="w-[130px] md:w-[200px]" alt="" />
        {user && (
          <div className="links">
            <li>
              <NavLink to="/">Admin Report</NavLink>{" "}
            </li>
            <li>
              <NavLink to="/">Branch</NavLink>{" "}
            </li>
            <li>
              <NavLink to="/users">User</NavLink>{" "}
            </li>
            <li>
              <NavLink to="/">Setting</NavLink>{" "}
            </li>
            <li>
              <button
                className="logut_link"
                onClick={() => {
                  dispatch(logout());
                  localStorage.removeItem("user");
                  navigate("/login");
                }}
              >
                Log out
              </button>
            </li>
          </div>
        )}

        {user ? (
          <div className="button_con">
            <FaRegUserCircle size={30} color="white" />
            <button>{user?.user.username}</button>
          </div>
        ) : (
          <div className="button_con">
            <FaLongArrowAltLeft size={20} color="white" />
            <button>Back to main</button>
          </div>
        )}
        <div
          onClick={() => setOpenDrawer(true)}
          className=" mx-5 cursor-pointer block md:hidden"
        >
          <AiOutlineMenuFold size={43} color="#a80e0e" />
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
      a,
      .logut_link {
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
  }
  @media only screen and (max-width: 768px) {
    .links,
    .button_con {
      display: none;
    }
    .munu_icon {
      display: block;
    }
  }
`;
export default Navbar;
