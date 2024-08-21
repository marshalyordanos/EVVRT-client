import os
def list(model,fields,folder_path):
    # model = model
    smodel = model.lower()
    # fields = fields
    # start = True
    # count = 1
    # while start:
    #     key = input(f"Enter your field name {count}: ")
    #     if key == 'q':
    #         start =False
    #         break
            
    #     val = input(f"Enter the yupe of {key} [string, bool, enum, date, number]: ")
    #     fields[key.lower()]=val
    #     count +=1
        
        

    # folder_path = os.path.join(os.path.dirname(__file__), 'src',smodel)
    # if not os.path.exists(folder_path):
    #     os.makedirs(folder_path)

    file_path = os.path.join(folder_path,f'{model}List.jsx')

    imports =  f"""
    import React, {{ useEffect, useRef, useState }} from 'react'
    import CommonTable from '../../components/commons/CommonTable'
    import {{
        MoreOutlined,
        ReloadOutlined
    }} from '@ant-design/icons';
    import {{ Button, Dropdown, Input }} from 'antd';
    import styled from 'styled-components';
    import CommonModal from '../../components/commons/CommonModel';

    import {smodel}Service from './{model}Service';
    import {model}Edit from './{model}Edit';
    import {{ NavLink, useSearchParams }} from 'react-router-dom';
    import {{ HeaderStyle, SearchInputStyle }} from '../../components/commons/CommonStyles';
    import CommonDeleteModal from '../../components/commons/CommonDeleteModal';
    import {{ useDispatch, useSelector }} from 'react-redux';
    import {{ search{model}, update{model}State, {smodel}SearchText }} from './{model}Redux';

    const {model}List = () => {{
        const [{smodel}Data, set{model}Data] = useState([])
        const [total, setTotal] = useState()

        const searchText = useSelector({smodel}SearchText);
        const [loading, setLoading] = useState();
        const [{smodel}Selection, set{model}Selection] = useState([])
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

        const [modeID, setModeID] = useState('');
        const [searchParams, setSearchParams] = useSearchParams()

        const delayTimerRef = useRef(null);
        const dispatch = useDispatch();

        const getPaginationInfo = () => {{

            return [searchParams.get('page') || 1, searchParams.get('limit') || 5]
        }}


        useEffect(() => {{
            const [page, limit] = getPaginationInfo();
            dispatch(update{model}State({{ page: page, limit: limit }}))
            // setSearchParams({{ ...Object.fromEntries(searchParams), 'searchText': e.target.value }})
            searchData()
        }}, [])
        

    async function searchData() {{
            try {{
                setLoading(true)
                const {{ payload }} = await dispatch(search{model}());
                set{model}Data(payload.data)
                setTotal(payload.total)
                setLoading(false)
            }} catch (err) {{
                setLoading(false)
            }}
        }}


        const searchHandler = (e) => {{
            const {{ value }} = e.target;
            const [page, limit] = getPaginationInfo();

            // setSearchParams({{ page: page, limit: limit }})
            dispatch(update{model}State({{ page: page, limit: limit, searchText: value }}))
            clearTimeout(delayTimerRef.current);
            delayTimerRef.current = setTimeout(() => {{
                searchData()
            }}, 500);
        }}

        const handlePagination = async (page, pageSize) => {{
            // permmission exmple

            // if (!(await authService.checkPermmision('{smodel}', 'read'))) {{
            //     return message.error('You have not a permmission');
            // }}

            setSearchParams({{ page: page, limit: pageSize }})
            dispatch(update{model}State({{ page: page, limit: pageSize }}))

            searchData()
        }}

        const tableChange = (pagination, filters, sorter) => {{
            const {{ field, order }} = sorter;
            dispatch(update{model}State({{ sort: field, order: order }}))

            searchData()
        }}
        
        const handleReload = () => {{
            const [page, limit] = getPaginationInfo();

            setSearchParams({{ page: 1, limit: 5 }})
            dispatch(update{model}State({{ page: 1, limit: 5, sort: '', order: '', searchText: '' }}))
            searchData();
        }}
        

        const handleDelete = async () => {{
            try {{
                setLoading(true)
                const data = await {smodel}Service.delete{model[:-1]}(modeID);
                setIsDeleteModalOpen(false)

                searchData()
                setLoading(false)
            }}catch (err) {{
                setLoading(false)
            }}
        }}
        
        const onClick = ({{ key }}, record) => {{
            if (key == 'edit') {{

                setIsModalOpen(true)
            }} else if (key === 'delete') {{
                setIsDeleteModalOpen(true)
            }}
        }};
        
        
        const items = [
            {{
                key: 'edit',
                label: (
                    <Button type="text">Edit</Button>
                ),


            }},
            {{
                key: 'delete',
                label: (
                    <Button type="text"> Delete</Button>
                ),
            }},
            {{
                key: '3',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                        3rd menu item
                    </a>
                ),
            }},
        ];
        
        
        
    """

    column = f"""
                {{
                title: ' ',
                dataIndex: 'action',
                render: (_, recored) => {{
                    return (
                        <Dropdown
                            menu={{{{
                                items,
                                onClick: (value) => onClick(value, recored)
                            }}}}
                            trigger={{['click']}}

                            placement="bottomLeft"
                        >
                            <Button type='text' icon={{<MoreOutlined style={{{{ fontSize: 20 }}}} />}} onClick={{() => {{
                                setModeID(recored._id)
                            }}}}>

                            </Button>
                        </Dropdown>
                    )
                }},

            }},
            
    """


    for i,(k,v) in enumerate(fields.items()):
        if i == 0 :
            column += f""" 
            {{
                title: '{k}',
                dataIndex: '{k}',
                render: (text, recored) => {{
                    return <NavLink style={{{{ color: "#2f1dca" }}}} state={{recored}} to={{`${{recored._id}}`}}>{{text}}</NavLink>
                }},
                sorter: true
            }},
            """
        elif v=='bool':
            column += f""" 
            {{
                title: '{k}',
                dataIndex: '{k}',
                render: (text, recored) => {{
                    return recored.{k} ? <p>true</p> : <p>false</p>
                }},
            }},
            """
        else:
            column += f""" 
            {{
                title: '{k}',
                dataIndex: '{k}',
                sorter: true

            }},
            """
                
            
                

    columns = f"""
    const columns = [
        {column}
    ];
    """
    returns = f"""
    return (
            <div>

                {{
                    isModalOpen ? <CommonModal width={{1000}} isModalOpen={{isModalOpen}} setIsModalOpen={{setIsModalOpen}} >
                    <{model}Edit {smodel}Data={{{smodel}Data}} searchData={{searchData}} setMode={{setModeID}} mode={{modeID}} isModelOpen={{isModalOpen}} setIsModalOpen={{setIsModalOpen}} />
                    </CommonModal> : ""
                }}

                {{
                    isDeleteModalOpen ?
                        <CommonDeleteModal setIsModalOpen={{setIsDeleteModalOpen}}
                            handleDelete={{handleDelete}}
                            loading={{loading}}
                            isModalOpen={{isDeleteModalOpen}}  >
                            <h1 className=' text-2xl'>Are you sure?</h1>
                        </CommonDeleteModal> : ""
                }}

                <HeaderStyle>
                    <div className='header_left'>
                        <p>{model}</p>
                    </div>

                    <Button onClick={{handleReload}} size='large' >
                        <ReloadOutlined size={{25}} style={{{{ color: 'white', fontSize: 20 }}}} />
                    </Button>


                    <div className='header_right'>
                        <Button onClick={{() => {{
                            setModeID('')
                            setIsModalOpen(true)
                        }}}} size='large' >Add</Button>

                    </div>

                </HeaderStyle>


                <div className='flex flex-row gap-6'>
                    <SearchInputStyle>
                        <Input onChange={{searchHandler}}
                            placeholder="Search"
                            value={{searchText}}
                            allowClear />
                    </SearchInputStyle>
                </div>

                <CommonTable
                    rowSelectionType={{"checkbox"}}
                    data={{{smodel}Data}}
                    columns={{columns}}
                    setSelection={{set{model}Selection}}
                    handlePagination={{handlePagination}}
                    total={{total}}
                    loadding={{loading}}
                    tableChange={{tableChange}}

                />
            </div>
        )
    }}
    
    export default {model}List
    """
   


    imports += columns + returns 

    with open(file_path, 'w') as file:
        file.write(imports)
