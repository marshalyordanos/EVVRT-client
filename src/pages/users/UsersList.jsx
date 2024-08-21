import React, { useEffect, useRef, useState } from "react";
import CommonTable from "../../components/commons/CommonTable";
import { MoreOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input } from "antd";
import styled from "styled-components";
import CommonModal from "../../components/commons/CommonModel";
import { IoMdAdd } from "react-icons/io";

import usersService from "./UsersService";
import UsersEdit from "./UsersEdit";
import { NavLink, useSearchParams } from "react-router-dom";
import {
  HeaderStyle,
  SearchInputStyle,
} from "../../components/commons/CommonStyles";
import CommonDeleteModal from "../../components/commons/CommonDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers, updateUsersState, usersSearchText } from "./UsersRedux";

const UsersList = () => {
  const [usersData, setUsersData] = useState([]);
  const [total, setTotal] = useState();

  const searchText = useSelector(usersSearchText);
  const [loading, setLoading] = useState();
  const [usersSelection, setUsersSelection] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [modeID, setModeID] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const delayTimerRef = useRef(null);
  const dispatch = useDispatch();

  const getPaginationInfo = () => {
    return [searchParams.get("page") || 1, searchParams.get("limit") || 5];
  };

  useEffect(() => {
    const [page, limit] = getPaginationInfo();
    dispatch(updateUsersState({ page: page, limit: limit }));
    // setSearchParams({ ...Object.fromEntries(searchParams), 'searchText': e.target.value })
    searchData();
  }, []);

  async function searchData() {
    try {
      setLoading(true);
      const { payload } = await dispatch(searchUsers());
      setUsersData(payload.data);
      setTotal(payload.total);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  const searchHandler = (e) => {
    const { value } = e.target;
    const [page, limit] = getPaginationInfo();

    // setSearchParams({ page: page, limit: limit })
    dispatch(updateUsersState({ page: page, limit: limit, searchText: value }));
    clearTimeout(delayTimerRef.current);
    delayTimerRef.current = setTimeout(() => {
      searchData();
    }, 500);
  };

  const handlePagination = async (page, pageSize) => {
    // permmission exmple

    // if (!(await authService.checkPermmision('users', 'read'))) {
    //     return message.error('You have not a permmission');
    // }

    setSearchParams({ page: page, limit: pageSize });
    dispatch(updateUsersState({ page: page, limit: pageSize }));

    searchData();
  };

  const tableChange = (pagination, filters, sorter) => {
    const { field, order } = sorter;
    dispatch(updateUsersState({ sort: field, order: order }));

    searchData();
  };

  const handleReload = () => {
    const [page, limit] = getPaginationInfo();

    setSearchParams({ page: 1, limit: 5 });
    dispatch(
      updateUsersState({
        page: 1,
        limit: 5,
        sort: "",
        order: "",
        searchText: "",
      })
    );
    searchData();
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const data = await usersService.deleteUser(modeID);
      setIsDeleteModalOpen(false);

      searchData();
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const onClick = ({ key }, record) => {
    if (key == "edit") {
      setIsModalOpen(true);
    } else if (key === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  const items = [
    {
      key: "edit",
      label: <Button type="text">Edit</Button>,
    },
    {
      key: "delete",
      label: <Button type="text"> Delete</Button>,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      render: (text, recored) => {
        return (
          <NavLink
            style={{ color: "#2f1dca" }}
            state={recored}
            to={`${recored._id}`}
          >
            {text}
          </NavLink>
        );
      },
      sorter: true,
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },

    {
      title: "First name",
      dataIndex: "firstName",
      sorter: true,
    },

    {
      title: "Last name",
      dataIndex: "lastName",
      sorter: true,
    },

    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      sorter: true,
    },

    {
      title: "role",
      dataIndex: "role",
      sorter: true,
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, recored) => {
        return (
          <Dropdown
            menu={{
              items,
              onClick: (value) => onClick(value, recored),
            }}
            trigger={["click"]}
            placement="bottomLeft"
          >
            <Button
              type="text"
              icon={<MoreOutlined style={{ fontSize: 20 }} />}
              onClick={() => {
                setModeID(recored._id);
              }}
            ></Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className=" max-w-[1200px] m-auto">
      {isModalOpen ? (
        <CommonModal
          width={1000}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        >
          <UsersEdit
            usersData={usersData}
            searchData={searchData}
            setMode={setModeID}
            mode={modeID}
            isModelOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </CommonModal>
      ) : (
        ""
      )}

      {isDeleteModalOpen ? (
        <CommonDeleteModal
          setIsModalOpen={setIsDeleteModalOpen}
          handleDelete={handleDelete}
          loading={loading}
          isModalOpen={isDeleteModalOpen}
        >
          <h1 className=" text-2xl">Are you sure?</h1>
        </CommonDeleteModal>
      ) : (
        ""
      )}

      <div className="flex flex-row gap-6 my-8 justify-between items-center">
        <SearchInputStyle>
          <Input
            onChange={searchHandler}
            placeholder="Search"
            value={searchText}
            allowClear
          />
        </SearchInputStyle>
        <div className="header_right flex gap-3">
          <div className="flex bg-gray-300 py-2 px-4 rounded-full w-[200px] gap-2">
            <div className="flex justify-center items-center">
              <p className="bg-gray-600 text-white py-2 px-7 rounded-full text-xl">
                55
              </p>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-lg leading-4">Number of user</p>
            </div>
          </div>
          <div
            onClick={() => {
              setModeID("");
              setIsModalOpen(true);
            }}
            className="flex bg-gray-300 py-2 px-4 rounded-full w-[200px] gap-2"
          >
            <div className="flex justify-center items-center">
              <div className="bg-gray-600 text-white py-2 px-7 rounded-full text-xl">
                <IoMdAdd size={30} />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-lg leading-4">Number of user</p>
            </div>
          </div>
        </div>
      </div>

      <CommonTable
        rowSelectionType={"checkbox"}
        data={usersData}
        columns={columns}
        setSelection={setUsersSelection}
        handlePagination={handlePagination}
        total={total}
        loadding={loading}
        tableChange={tableChange}
      />
    </div>
  );
};

export default UsersList;
