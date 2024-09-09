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
import { Modal } from "antd";
import { ButtonStyle } from "./commons/CommonStyles";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  console.log("user", user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/login");
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Styled>
      <Modal
        title="Logout"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className="text-2xl">Are you sure you want to logout?</p>
      </Modal>
      <AppDrawer
        closable={true}
        placement={"right"}
        open={openDrawer}
        setOpen={setOpenDrawer}
      >
        <div className="links_small">
          {" "}
          <li>
            <NavLink to="/">Home</NavLink>{" "}
          </li>
          {/* {user?.user.role == "admin" && ( */}
          <li>
            <NavLink to="/admin">Report</NavLink>{" "}
          </li>
          {/* )} */}
          <li>
            <NavLink to="/indicators">Indicators</NavLink>{" "}
          </li>
          {user?.user?.role == "admin" && (
            <li>
              <NavLink to="/users">User</NavLink>{" "}
            </li>
          )}
          {user?.user?.role == "admin" && (
            <li>
              <NavLink to="/regions">Region</NavLink>{" "}
            </li>
          )}
          <li>
            <NavLink to="/sites">Branch</NavLink>{" "}
          </li>
          {user?.user?.role == "admin" && (
            <li>
              <NavLink to="/">Setting</NavLink>{" "}
            </li>
          )}
          <li>
            <button
              className="logut_link"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Log out
            </button>
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
              <NavLink to="/">Home</NavLink>{" "}
            </li>
            {/* {user?.user.role == "admin" && ( */}
            <li>
              <NavLink to="/admin">Report</NavLink>{" "}
            </li>
            {/* )} */}
            <li>
              <NavLink to="/indicators">Indicators</NavLink>{" "}
            </li>
            {user?.user?.role == "admin" && (
              <li>
                <NavLink to="/users">User</NavLink>{" "}
              </li>
            )}
            {user?.user?.role == "admin" && (
              <li>
                <NavLink to="/regions">Region</NavLink>{" "}
              </li>
            )}
            <li>
              <NavLink to="/sites">Branch</NavLink>{" "}
            </li>
            {user?.user?.role == "admin" && (
              <li>
                <NavLink to="/report-setting">Setting</NavLink>{" "}
              </li>
            )}
            <li>
              <button
                className="logut_link"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Log out
              </button>
            </li>
          </div>
        )}

        {user ? (
          <div
            onClick={() => {
              navigate("/setting/profile");
            }}
            className="button_con"
          >
            <FaRegUserCircle size={30} color="white" />
            <button>{user?.user?.username}</button>
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
      .active {
        color: #b81010;
        /* background-color: red; */
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
