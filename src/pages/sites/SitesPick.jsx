import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import sitesService from "./SitesService";
import CommonTable from "../../components/commons/CommonTable";
import {
  ButtonStyle,
  SearchInputStyle,
} from "../../components/commons/CommonStyles";
import { Divider, Input } from "antd";
import { searchSites, updateSitesState, sitesSearchText } from "./SitesRedux"; //** */
import { useDispatch, useSelector } from "react-redux"; /*** */

const SitesPick = ({ setIsModalOpen, selectHandler }) => {
  const [sitesData, setSitesData] = useState([]);
  const [total, setTotal] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch(); /*** */
  const searchText = useSelector(sitesSearchText); //** */

  const [loading, setLoading] = useState();
  const [sitesSelection, setSitesSelection] = useState([]);
  const delayTimerRef = useRef(null);

  const getPaginationInfo = () => {
    return [searchParams.get("page") || 1, searchParams.get("limit") || 5];
  };

  useEffect(() => {
    const [page, limit] = getPaginationInfo();
    dispatch(updateSitesState({ page: 1, limit: 5 }));

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

    dispatch(updateSitesState({ page: page, limit: limit, searchText: value }));
    clearTimeout(delayTimerRef.current);
    delayTimerRef.current = setTimeout(() => {
      searchData();
    }, 500);
  };

  const handlePagination = async (page, pageSize) => {
    console.log("============");

    // setSearchParams({ page: page, limit: pageSize })
    dispatch(updateSitesState({ page: page, limit: pageSize }));

    searchData();
  };

  const columns = [
    {
      title: "name",
      dataIndex: "name",
    },

    {
      title: "coordinatorid",
      dataIndex: "coordinatorid",
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
        data={sitesData}
        columns={columns}
        setSelection={setSitesSelection}
        handlePagination={handlePagination}
        total={total}
        loadding={loading}
      />
      <Divider style={{ margin: 15 }} />

      <ButtonStyle>
        <button onClick={() => setIsModalOpen(false)}>cancel</button>
        <button
          disabled={sitesSelection.length == 0}
          className={sitesSelection.length > 0 ? "" : "disable"}
          onClick={() => selectHandler(sitesSelection[0])}
        >
          Submit
        </button>
      </ButtonStyle>
    </div>
  );
};

export default SitesPick;
