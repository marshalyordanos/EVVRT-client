import React, { useEffect, useRef, useState } from "react";
import CommonTable from "../../components/commons/CommonTable";
import { MoreOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input } from "antd";
import styled from "styled-components";
import CommonModal from "../../components/commons/CommonModel";

import sitesService from "./SitesService";
import SitesEdit from "./SitesEdit";
import { NavLink, useSearchParams } from "react-router-dom";
import {
  HeaderStyle,
  SearchInputStyle,
} from "../../components/commons/CommonStyles";
import CommonDeleteModal from "../../components/commons/CommonDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { searchSites, updateSitesState, sitesSearchText } from "./SitesRedux";
import { IoMdAdd } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { selectCurrentUser } from "../../redux/auth/authSlice";

const SitesList = () => {
  const [sitesData, setSitesData] = useState([]);
  const [total, setTotal] = useState(0);

  const searchText = useSelector(sitesSearchText);
  const [loading, setLoading] = useState();
  const [sitesSelection, setSitesSelection] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [modeID, setModeID] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const delayTimerRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const getPaginationInfo = () => {
    return [searchParams.get("page") || 1, searchParams.get("limit") || 5];
  };

  useEffect(() => {
    const [page, limit] = getPaginationInfo();
    dispatch(updateSitesState({ page: page, limit: limit }));
    // setSearchParams({ ...Object.fromEntries(searchParams), 'searchText': e.target.value })
    searchData();
  }, []);

  async function searchData() {
    try {
      setLoading(true);
      const { payload } = await dispatch(searchSites());
      console.log("paylod", payload);
      setSitesData(payload.data);
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
    dispatch(updateSitesState({ page: page, limit: limit, searchText: value }));
    clearTimeout(delayTimerRef.current);
    delayTimerRef.current = setTimeout(() => {
      searchData();
    }, 500);
  };

  const handlePagination = async (page, pageSize) => {
    // permmission exmple

    // if (!(await authService.checkPermmision('sites', 'read'))) {
    //     return message.error('You have not a permmission');
    // }

    setSearchParams({ page: page, limit: pageSize });
    dispatch(updateSitesState({ page: page, limit: pageSize }));

    searchData();
  };

  const tableChange = (pagination, filters, sorter) => {
    const { field, order } = sorter;
    dispatch(updateSitesState({ sort: field, order: order }));

    searchData();
  };

  const handleReload = () => {
    const [page, limit] = getPaginationInfo();

    setSearchParams({ page: 1, limit: 5 });
    dispatch(
      updateSitesState({
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
      const data = await sitesService.deleteSite(modeID);
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
      title: "Name",
      dataIndex: "name",
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
      title: "Coordinator",
      dataIndex: "coordinatorId",
      render: (text, recored) => {
        return <p>{recored?.coordinatorId?.username}</p>;
      },
      sorter: true,
    },
    {
      title: "Region",
      dataIndex: "regionId",
      render: (text, recored) => {
        return <p>{recored?.regionId?.name}</p>;
      },
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, recored) => {
        return (
          <div className="flex g-2">
            <Button
              disabled={user?.user.role != "admin"}
              type="text"
              style={{ border: "1px solid ligthgray", width: 50 }}
              icon={<FiEdit size={20} />}
              onClick={() => {
                setModeID(recored._id);
                setIsModalOpen(true);
              }}
              dis
            ></Button>
            <di className="mx-1"></di>
            <Button
              type="text"
              disabled={user?.user.role != "admin"}
              icon={<IoTrashOutline size={20} />}
              style={{ border: "1px solid ligthgray", width: 50 }}
              onClick={() => {
                setModeID(recored._id);
                setIsDeleteModalOpen(true);
              }}
            ></Button>
          </div>
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
          <SitesEdit
            sitesData={sitesData}
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
                {total || 0}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-lg leading-4">Number of Branch</p>
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
              <p className="text-lg leading-4">Add New Branch</p>
            </div>
          </div>
        </div>
      </div>

      <CommonTable
        rowSelectionType={"checkbox"}
        data={sitesData}
        columns={columns}
        setSelection={setSitesSelection}
        handlePagination={handlePagination}
        total={total}
        loadding={loading}
        tableChange={tableChange}
      />
    </div>
  );
};

export default SitesList;
