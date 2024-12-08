import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import regionsService from "./RegionsService";
import CommonTable from "../../components/commons/CommonTable";
import {
  ButtonStyle,
  SearchInputStyle,
} from "../../components/commons/CommonStyles";
import { Divider, Input } from "antd";
import {
  searchRegions,
  updateRegionsState,
  regionsSearchText,
} from "./RegionsRedux"; //** */
import { useDispatch, useSelector } from "react-redux"; /*** */

const RegionsPick = ({ setIsModalOpen, selectHandler }) => {
  const [regionsData, setRegionsData] = useState([]);
  const [total, setTotal] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch(); /*** */
  const searchText = useSelector(regionsSearchText); //** */

  const [loading, setLoading] = useState();
  const [regionsSelection, setRegionsSelection] = useState([]);
  const delayTimerRef = useRef(null);

  const getPaginationInfo = () => {
    return [searchParams.get("page") || 1, searchParams.get("limit") || 5];
  };

  useEffect(() => {
    const [page, limit] = getPaginationInfo();
    dispatch(updateRegionsState({ page: page, limit: limit }));

    searchData();
  }, []);

  async function searchData() {
    try {
      setLoading(true);
      const { payload } = await dispatch(searchRegions());
      setRegionsData(payload.data);
      setTotal(payload.total);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }
  const searchHandler = (e) => {
    const { value } = e.target;
    const [page, limit] = getPaginationInfo();

    dispatch(
      updateRegionsState({ page: page, limit: limit, searchText: value })
    );
    clearTimeout(delayTimerRef.current);
    delayTimerRef.current = setTimeout(() => {
      searchData();
    }, 500);
  };

  const handlePagination = (page, pageSize) => {
    setSearchParams({ page: page, limit: pageSize });
    dispatch(updateRegionsState({ page: page, limit: pageSize }));

    searchData();
  };

  const columns = [
    {
      title: "name",
      dataIndex: "name",
    },

    {
      title: "managerid",
      dataIndex: "managerid",
    },
  ];

  return (
    <div>
      <SearchInputStyle>
        <Input
          onChange={searchHandler}
          placeholder="Search"
          value={searchText}
          allowClear
        />
      </SearchInputStyle>

      <CommonTable
        rowSelectionType={"radio"}
        data={regionsData}
        columns={columns}
        setSelection={setRegionsSelection}
        handlePagination={handlePagination}
        total={total}
        loadding={loading}
      />
      <Divider style={{ margin: 15 }} />

      <ButtonStyle>
        <button onClick={() => setIsModalOpen(false)}>cancel</button>
        <button
          disabled={regionsSelection.length == 0}
          className={regionsSelection.length > 0 ? "" : "disable"}
          onClick={() => selectHandler(regionsSelection[0])}
        >
          Submit
        </button>
      </ButtonStyle>
    </div>
  );
};

export default RegionsPick;
