import React, { useCallback, useEffect, useRef, useState } from 'react'
import CommonTable from '../../components/commons/CommonTable'
import {
    MoreOutlined,
    ReloadOutlined
} from '@ant-design/icons';
import { Button, Dropdown, Input, Select } from 'antd';
import styled from 'styled-components';
import CommonModal from '../../components/commons/CommonModel';

import userService from './UsersService';
import UsersEdit from './UsersEdit';
import { NavLink, useSearchParams } from 'react-router-dom';
import { SearchInputStyle } from '../../components/commons/CommonStyles';
import CommonDeleteModal from '../../components/commons/CommonDeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers, updateUsersState, usersSearchText } from './UsersRedux';



const UsersList = () => {
    const [usersData, setUsersData] = useState([])
    const [total, setTotal] = useState()
    const [totalv, setTotalv] = useState(false)

    const searchText = useSelector(usersSearchText);
    const [loading, setLoading] = useState();
    const [usersSelection, setUsersSelection] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [modeID, setModeID] = useState('');
    const [searchParams, setSearchParams] = useSearchParams()

    const delayTimerRef = useRef(null);
    const dispatch = useDispatch();

    const getPaginationInfo = () => {

        return [searchParams.get('page') || 1, searchParams.get('limit') || 5]
    }


    useEffect(() => {
        const [page, limit] = getPaginationInfo();
        dispatch(updateUsersState({ page: page, limit: limit }))
        // setSearchParams({ ...Object.fromEntries(searchParams), 'searchText': e.target.value })
        searchData()
    }, [])





    async function searchData() {
        try {
            setLoading(true)
            const { payload } = await dispatch(searchUsers());
            setUsersData(payload.data)
            setTotal(payload.total)
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }


    const searchHandler = (e) => {
        const { value } = e.target;
        const [page, limit] = getPaginationInfo();

        // setSearchParams({ page: page, limit: limit })
        dispatch(updateUsersState({ page: page, limit: limit, searchText: value }))
        clearTimeout(delayTimerRef.current);
        delayTimerRef.current = setTimeout(() => {


            searchData()
        }, 500);


    }

    const handlePagination =useCallback (async (page, pageSize) => {
        // permmission exmple

        // if (!(await authService.checkPermmision('users', 'read'))) {
        //     return message.error('You have not a permmission');
        // }

        setSearchParams({ page: page, limit: pageSize })
        dispatch(updateUsersState({ page: page, limit: pageSize }))

        searchData()
    })

    const tableChange = useCallback((pagination, filters, sorter) => {
        const { field, order } = sorter;
        dispatch(updateUsersState({ sort: field, order: order }))

        searchData()
    })


    const handleReload = () => {
        const [page, limit] = getPaginationInfo();

        setSearchParams({ page: 1, limit: 5 })
        dispatch(updateUsersState({ page: 1, limit: 5, sort: '', order: '', searchText: '' }))


        searchData();
    }
    

    const handleDelete = async () => {
        try {
            setLoading(true)
            const data = await userService.deleteUser(modeID);
            setIsDeleteModalOpen(false)

            searchData()
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }


    const onClick = ({ key }, record) => {
        if (key == 'edit') {

            setIsModalOpen(true)
        } else if (key === 'delete') {
            setIsDeleteModalOpen(true)
        }
    };




    const items = [
        {
            key: 'edit',
            label: (
                <Button type="text">Edit</Button>
            ),


        },
        {
            key: 'delete',
            label: (
                <Button type="text"> Delete</Button>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            ),
        },
    ];

    const columns = [

        {
            title: ' ',
            dataIndex: 'action',
            render: (_, recored) => {
                return (
                    <Dropdown
                        menu={{
                            items,
                            onClick: (value) => onClick(value, recored)
                        }}
                        trigger={['click']}

                        placement="bottomLeft"
                    >
                        <Button type='text' icon={<MoreOutlined style={{ fontSize: 20 }} />} onClick={() => {
                            setModeID(recored._id)
                        }}>

                        </Button>
                    </Dropdown>
                )
            },

        },

        {
            title: 'Username',
            dataIndex: 'username',
            render: (text, recored) => {
                return <NavLink style={{ color: "#2f1dca" }} state={recored} to={`${recored._id}`}>{text}</NavLink>
            },
            sorter: true




        },

        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true

        },
        {
            title: 'role',
            dataIndex: 'userType',
        },
        {
            title: 'isSystemAdmin',
            dataIndex: 'isSystemAdmin',
            render: (text, recored) => {
                return recored.isSystemAdmin ? <p>true</p> : <p>false</p>
            },
        },
        // {
        //     title: 'Branch',
        //     dataIndex: 'brnach',
        // },
        {
            title: 'Gender',
            dataIndex: 'gender',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, recored) => {Option
                return recored.status ? <p>true</p> : <p>false</p>
            },
        },
    ];




    return (
        <div  style={{maxWidth:1200,margin:"auto"}}>
{/* <button onClick={()=>setTotalv(!totalv)}>toggle state</button> */}
            {
                isModalOpen ? <CommonModal width={1000} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} >
                    <UsersEdit searchData={searchData} usersData={usersData} setUsersData={setUsersData} setMode={setModeID} mode={modeID} isModelOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                </CommonModal> : ""
            }

            {
                isDeleteModalOpen ?
                    <CommonDeleteModal setIsModalOpen={setIsDeleteModalOpen}
                        handleDelete={handleDelete}
                        loading={loading}
                        isModalOpen={isDeleteModalOpen}  >
                        <h1 className=' text-2xl'>Are you sure?</h1>
                    </CommonDeleteModal> : ""
            }



            <HeaderStyle>
                <div className='header_left'>
                    <p>Users</p>
                </div>

                <Button onClick={handleReload} size='large' >
                    <ReloadOutlined size={25} style={{ color: '#00365C', fontSize: 20 }} />
                </Button>


                <div className='header_right'>
                    <Button onClick={() => {
                        setModeID('')
                        setIsModalOpen(true)
                    }} size='large' >Add</Button>

                </div>

            </HeaderStyle>


            <div className='flex flex-row gap-6'>
                <SearchInputStyle>
                    <Input onChange={searchHandler}
                        placeholder="Search"
                        value={searchText}
                        allowClear />
                </SearchInputStyle>


          <Select
          onChange={(val)=>{
                dispatch(updateUsersState({role:val}));
                searchData()
          }}    
            className='border-gray-400 '
            placeholder="select your status">
            <Option value={''}>All</Option>
            <Option value={'sales'}>Sales</Option>
            <Option value={'store'}>Store</Option>
            <Option value={'manager'}>Manager</Option>
            <Option value={'admin'}>Admin</Option>


          </Select>
        
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
    )
}

const HeaderStyle = styled.div`
display: flex;
margin: 0;
padding:20px;
margin-bottom: 40px;
position: sticky;
top: 0px;
z-index: 100;
background-image: linear-gradient(to left, #00365C , white);
/* background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(217,217,217,1) 0%, rgba(0,0,0,1) 100%, rgba(0,212,255,1) 100%); */
.header_left{
    p{
        color: 1e2987;
        font-size: 20px;
    }
}

button{
    margin-left:15px;

}
.header_right{
            button{
                margin-left:15px;
                background: #096e30;
                padding: 7px 30px !important;
                color: wheat;
            }
            button:hover{
                color: white;
            }
        }
`

export default UsersList