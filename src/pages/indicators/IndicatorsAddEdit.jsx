
    
import React, { useEffect, useState } from 'react'
import { Button, Divider, Dropdown, Form, Input, InputNumber, Select, Spin, Switch,DatePicker } from 'antd';
import styled from 'styled-components';
import { ButtonStyle, FlexStyle, FormStyle } from '../../components/commons/CommonStyles';
import indicatorsService from './IndicatorsService';
import CommonModal from '../../components/commons/CommonModel';
import IndicatorsPick from './IndicatorsPick';
import dayjs from 'dayjs';
import CommonTable from '../../components/commons/CommonTable';
import {
  MoreOutlined,
  ReloadOutlined
} from '@ant-design/icons';

import { NavLink } from 'react-router-dom';
    const { Option } = Select;

    const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
    };
    
    
    
    const IndicatorsEdit = ({setIsModalOpen,isModelOpen,mode,setMode,indicatorsData,searchData}) => {
      const [indicatorsData2, setIndicatorsData2] = useState([])

      const [form] = Form.useForm();
      const [switch2,setSwitch2] = useState("")
      const [loading,setLoading] = useState("")
      const [indicatorPick,setIndicatorPick] = useState(false)


    
    useEffect(()=>{
        const featchData = async()=>{
        try{

            const data = await indicatorsService.getIndicator(mode);
            form.setFieldsValue({ indicator: {...data,updatedAt:dayjs(data.updatedAt)} });
            
    
        }catch(err){
        }
        }
        if (mode==''){
        
        } else{
        
        featchData()
        }
    },[])


    const handleReset = () => {
        form.resetFields();
    }; 

    const indicatorPickHandler=(data)=>{
        console.log('indicatorPickHandler',data)
        
        setIndicatorPick(false)
        
    }


    const onAdd = async(e)=>{
      e.preventDefault();
        try{

        setLoading(true);

        const data = await indicatorsService.indicatorsDo({method:'add_list_to_indicator',payload:{data:indicatorsData2}})
        setIsModalOpen(false)
        
        searchData()
        setLoading(false);

        }catch(err){
        setLoading(false);
        }
    } 

    const onUpdate = async(datas)=>{
        
        try{

        setLoading(true);

        const data = await indicatorsService.updateIndicator(datas.indicator,mode)
        searchData()
        setIsModalOpen(false)
        setLoading(false);

        }catch(err){
        setLoading(false);
        }
    }
    

    const onFinish = (values) => {
      console.log("===========")
        mode == ''? handleAddToList(values):onUpdate(values)
    };
    const handleAddToList = (e)=>{
      // e.preventDefault()
      setIndicatorsData2([{...form.getFieldsValue()?.indicator,_id:new Date().getTime()},...indicatorsData2])
      handleReset()
    }
    
    
    const onClick = ({ key }, record) => {
      if (key == 'edit') {
        console.log("========",record)

        form.setFieldsValue({indicator:record})
        const data = indicatorsData2.filter((indicator)=>indicator._id !== record._id)
        setIndicatorsData2(data)

      } else if (key === 'delete') {
        console.log("========",record)
          const data = indicatorsData2.filter((indicator)=>indicator._id !== record._id)
          setIndicatorsData2(data)
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
                title: 'siteid',
                dataIndex: 'siteid',

            },
             
            {
                title: 'duedate',
                dataIndex: 'duedate',

            },
             
            {
                title: 'date',
                dataIndex: 'date',

            },
             
            {
                title: 'ispublish',
                dataIndex: 'ispublish',
                render: (text, recored) => {
                    return recored.ispublish ? <p>true</p> : <p>false</p>
                },
            },
             
            {
                title: 'total_blood_donations',
                dataIndex: 'total_blood_donations',

            },
             
            {
                title: 'familyr_eplacement_donations',
                dataIndex: 'familyr_eplacement_donations',

            },
             
            {
                title: 'first_time_donors',
                dataIndex: 'first_time_donors',

            },
             
            {
                title: 'repeat_donors',
                dataIndex: 'repeat_donors',

            },
             
            {
                title: 'student_donors',
                dataIndex: 'student_donors',

            },
             
            {
                title: 'government_employee_donors',
                dataIndex: 'government_employee_donors',

            },
             
            {
                title: 'private_employee_donors',
                dataIndex: 'private_employee_donors',

            },
             
            {
                title: 'self_employed_donors',
                dataIndex: 'self_employed_donors',

            },
             
            {
                title: 'unemployed_donors',
                dataIndex: 'unemployed_donors',

            },
             
            {
                title: 'other_donors',
                dataIndex: 'other_donors',

            },
             
            {
                title: 'male_donors',
                dataIndex: 'male_donors',

            },
             
            {
                title: 'female_donors',
                dataIndex: 'female_donors',

            },
             
            {
                title: 'under18_donors',
                dataIndex: 'under18_donors',

            },
             
            {
                title: 'age18to24_donors',
                dataIndex: 'age18to24_donors',

            },
             
            {
                title: 'age25to34_donors',
                dataIndex: 'age25to34_donors',

            },
             
            {
                title: 'age35to44_donors',
                dataIndex: 'age35to44_donors',

            },
             
            {
                title: 'age45to54_donors',
                dataIndex: 'age45to54_donors',

            },
             
            {
                title: 'age55to64_donors',
                dataIndex: 'age55to64_donors',

            },
             
            {
                title: 'over65_donors',
                dataIndex: 'over65_donors',

            },
             
            {
                title: 'apheresis_donations',
                dataIndex: 'apheresis_donations',

            },
             
            {
                title: 'donations_fromcenter',
                dataIndex: 'donations_fromcenter',

            },
             
            {
                title: 'donations_from_mobile',
                dataIndex: 'donations_from_mobile',

            },
             
            {
                title: 'mobile_sessions_conducted',
                dataIndex: 'mobile_sessions_conducted',

            },
             
            {
                title: 'active_blood_donor_clubs',
                dataIndex: 'active_blood_donor_clubs',

            },
             
            {
                title: 'adr_fainting',
                dataIndex: 'adr_fainting',

            },
             
            {
                title: 'adr_fainting_withloss_of_consciousness',
                dataIndex: 'adr_fainting_withloss_of_consciousness',

            },
             
            {
                title: 'adr_seizure',
                dataIndex: 'adr_seizure',

            },
             
            {
                title: 'adr_technical_problem',
                dataIndex: 'adr_technical_problem',

            },
             
            {
                title: 'donor_refusals',
                dataIndex: 'donor_refusals',

            },
             
            {
                title: 'other_adrs',
                dataIndex: 'other_adrs',

            },
             
            {
                title: 'permanent_deferrals_duetottis',
                dataIndex: 'permanent_deferrals_duetottis',

            },
             
            {
                title: 'deferrals_by_lowweight',
                dataIndex: 'deferrals_by_lowweight',

            },
             
            {
                title: 'deferrals_by_age',
                dataIndex: 'deferrals_by_age',

            },
             
            {
                title: 'deferrals_by_pregnancy_lactation',
                dataIndex: 'deferrals_by_pregnancy_lactation',

            },
             
            {
                title: 'deferrals_by_blood_pressure',
                dataIndex: 'deferrals_by_blood_pressure',

            },
             
            {
                title: 'deferrals_by_low_hemoglobin',
                dataIndex: 'deferrals_by_low_hemoglobin',

            },
             
            {
                title: 'deferrals_by_other_medical_conditions',
                dataIndex: 'deferrals_by_other_medical_conditions',

            },
             
            {
                title: 'deferrals_by_high_risk_behavior',
                dataIndex: 'deferrals_by_high_risk_behavior',

            },
             
            {
                title: 'deferrals_by_travel_history',
                dataIndex: 'deferrals_by_travel_history',

            },
             
            {
                title: 'deferrals_by_other_reasons',
                dataIndex: 'deferrals_by_other_reasons',

            },
             
            {
                title: 'post_donation_counselling_system',
                dataIndex: 'post_donation_counselling_system',
                render: (text, recored) => {
                    return recored.post_donation_counselling_system ? <p>true</p> : <p>false</p>
                },
            },
             
            {
                title: 'referral_for_positive_ttis_donors',
                dataIndex: 'referral_for_positive_ttis_donors',
                render: (text, recored) => {
                    return recored.referral_for_positive_ttis_donors ? <p>true</p> : <p>false</p>
                },
            },
             
            {
                title: 'pre_donation_information_given',
                dataIndex: 'pre_donation_information_given',

            },
             
            {
                title: 'pre_donation_counselling',
                dataIndex: 'pre_donation_counselling',

            },
             
            {
                title: 'post_donation_counselling_service',
                dataIndex: 'post_donation_counselling_service',

            },
             
            {
                title: 'post_donation_counselling_from_mobile',
                dataIndex: 'post_donation_counselling_from_mobile',

            },
             
            {
                title: 'post_donation_counselling_from_center',
                dataIndex: 'post_donation_counselling_from_center',

            },
             
            {
                title: 'non_reactive_donors_receiving_pdc',
                dataIndex: 'non_reactive_donors_receiving_pdc',

            },
             
            {
                title: 'reactive_donors_receiving_pdc',
                dataIndex: 'reactive_donors_receiving_pdc',

            },
             
            {
                title: 'referred_reactive_donors_receiving_pdc',
                dataIndex: 'referred_reactive_donors_receiving_pdc',

            },
             
            {
                title: 'donations_screened_for_ttis',
                dataIndex: 'donations_screened_for_ttis',

            },
             
            {
                title: 'samples_screened_for_ttis',
                dataIndex: 'samples_screened_for_ttis',

            },
             
            {
                title: 'samples_screened_for_blood_group',
                dataIndex: 'samples_screened_for_blood_group',

            },
             
            {
                title: 'samples_screened_for_blood_group_quality_assured',
                dataIndex: 'samples_screened_for_blood_group_quality_assured',

            },
             
            {
                title: 'ttis_positive',
                dataIndex: 'ttis_positive',

            },
             
            {
                title: 'hiv_positive',
                dataIndex: 'hiv_positive',

            },
             
            {
                title: 'hepatitis_b_positive',
                dataIndex: 'hepatitis_b_positive',

            },
             
            {
                title: 'hepatitis_c_positive',
                dataIndex: 'hepatitis_c_positive',

            },
             
            {
                title: 'syphilis_positive',
                dataIndex: 'syphilis_positive',

            },
             
            {
                title: 'donors_positive_for_ttis',
                dataIndex: 'donors_positive_for_ttis',

            },
             
            {
                title: 'component_processing_system',
                dataIndex: 'component_processing_system',
                render: (text, recored) => {
                    return recored.component_processing_system ? <p>true</p> : <p>false</p>
                },
            },
             
            {
                title: 'whole_blood_separated_into_components',
                dataIndex: 'whole_blood_separated_into_components',

            },
             
            {
                title: 'crc_units_repared',
                dataIndex: 'crc_units_repared',

            },
             
            {
                title: 'platelets_prepared',
                dataIndex: 'platelets_prepared',

            },
             
            {
                title: 'ffp_prepared',
                dataIndex: 'ffp_prepared',

            },
             
            {
                title: 'cryoprecipitate_prepared',
                dataIndex: 'cryoprecipitate_prepared',

            },
             
            {
                title: 'discarded_units_overweight_crc',
                dataIndex: 'discarded_units_overweight_crc',

            },
             
            {
                title: 'discarded_units_overweight_platelets',
                dataIndex: 'discarded_units_overweight_platelets',

            },
             
            {
                title: 'discarded_units_overweight_ffp',
                dataIndex: 'discarded_units_overweight_ffp',

            },
             
            {
                title: 'discarded_units_overweight_cryoprecipitate',
                dataIndex: 'discarded_units_overweight_cryoprecipitate',

            },
             
            {
                title: 'discarded_units_collection_problem',
                dataIndex: 'discarded_units_collection_problem',

            },
             
            {
                title: 'discarded_units_expired',
                dataIndex: 'discarded_units_expired',

            },
             
            {
                title: 'discarded_pnits_processing_problems',
                dataIndex: 'discarded_pnits_processing_problems',

            },
             
            {
                title: 'discarded_units_reactive_ttis',
                dataIndex: 'discarded_units_reactive_ttis',

            },
             
            {
                title: 'discarded_units_hemolyzed',
                dataIndex: 'discarded_units_hemolyzed',

            },
             
            {
                title: 'discarded_units_clotted',
                dataIndex: 'discarded_units_clotted',

            },
             
            {
                title: 'discarded_units_storage_problems',
                dataIndex: 'discarded_units_storage_problems',

            },
             
            {
                title: 'discarded_units_transportation_problems',
                dataIndex: 'discarded_units_transportation_problems',

            },
             
            {
                title: 'discarded_units_highod',
                dataIndex: 'discarded_units_highod',

            },
             
            {
                title: 'discarded_units_others',
                dataIndex: 'discarded_units_others',

            },
             
            {
                title: 'requested_aplus_wb_crc',
                dataIndex: 'requested_aplus_wb_crc',

            },
             
            {
                title: 'requested_bplus_wbcrc',
                dataIndex: 'requested_bplus_wbcrc',

            },
             
            {
                title: 'requested_abplus_wb_crc',
                dataIndex: 'requested_abplus_wb_crc',

            },
             
            {
                title: 'requested_oplus_wb_crc',
                dataIndex: 'requested_oplus_wb_crc',

            },
             
            {
                title: 'requested_aminus_wb_crc',
                dataIndex: 'requested_aminus_wb_crc',

            },
             
            {
                title: 'requested_bminus_wb_crc',
                dataIndex: 'requested_bminus_wb_crc',

            },
             
            {
                title: 'requested_abminus_wb_crc',
                dataIndex: 'requested_abminus_wb_crc',

            },
             
            {
                title: 'requested_ominus_wb_crc',
                dataIndex: 'requested_ominus_wb_crc',

            },
             
            {
                title: 'requested_ffp_units',
                dataIndex: 'requested_ffp_units',

            },
             
            {
                title: 'requested_platelets_units',
                dataIndex: 'requested_platelets_units',

            },
             
            {
                title: 'distributed_aplus_wb_crc',
                dataIndex: 'distributed_aplus_wb_crc',

            },
             
            {
                title: 'distributed_bplus_wb_crc',
                dataIndex: 'distributed_bplus_wb_crc',

            },
             
            {
                title: 'distributed_abplus_wb_crc',
                dataIndex: 'distributed_abplus_wb_crc',

            },
             
            {
                title: 'distributed_oplus_wb_crc',
                dataIndex: 'distributed_oplus_wb_crc',

            },
             
            {
                title: 'distributed_aminus_wb_crc',
                dataIndex: 'distributed_aminus_wb_crc',

            },
             
            {
                title: 'distributed_bminus_wb_crc',
                dataIndex: 'distributed_bminus_wb_crc',

            },
             
            {
                title: 'distributed_abminus_wb_crc',
                dataIndex: 'distributed_abminus_wb_crc',

            },
             
            {
                title: 'distributed_ominus_wb_crc',
                dataIndex: 'distributed_ominus_wb_crc',

            },
             
            {
                title: 'distributed_ffp_units',
                dataIndex: 'distributed_ffp_units',

            },
             
            {
                title: 'distributed_platelets_units',
                dataIndex: 'distributed_platelets_units',

            },
             
            {
                title: 'transferred_aplus_wb_crc',
                dataIndex: 'transferred_aplus_wb_crc',

            },
             
            {
                title: 'transferred_bplus_wb_crc',
                dataIndex: 'transferred_bplus_wb_crc',

            },
             
            {
                title: 'transferred_abplus_wb_crc',
                dataIndex: 'transferred_abplus_wb_crc',

            },
             
            {
                title: 'transferred_oplus_wb_crc',
                dataIndex: 'transferred_oplus_wb_crc',

            },
             
            {
                title: 'transferred_aminus_wb_crc',
                dataIndex: 'transferred_aminus_wb_crc',

            },
             
            {
                title: 'transferred_bminus_wb_crc',
                dataIndex: 'transferred_bminus_wb_crc',

            },
             
            {
                title: 'transferred_abminus_wb_crc',
                dataIndex: 'transferred_abminus_wb_crc',

            },
             
            {
                title: 'transferred_ominus_wb_crc',
                dataIndex: 'transferred_ominus_wb_crc',

            },
             
            {
                title: 'transferred_ffp_units',
                dataIndex: 'transferred_ffp_units',

            },
             
            {
                title: 'transferred_platelets_units',
                dataIndex: 'transferred_platelets_units',

            },
             
            {
                title: 'health_facilities_performing_transfusion',
                dataIndex: 'health_facilities_performing_transfusion',

            },
             
            {
                title: 'health_facilities_with_htc',
                dataIndex: 'health_facilities_with_htc',

            },
             
            {
                title: 'health_facilities_performing_clinical_audit',
                dataIndex: 'health_facilities_performing_clinical_audit',

            },
             
            {
                title: 'male_patients_transfused',
                dataIndex: 'male_patients_transfused',

            },
             
            {
                title: 'female_patients_transfused',
                dataIndex: 'female_patients_transfused',

            },
             
            {
                title: 'patients_under5_transfused',
                dataIndex: 'patients_under5_transfused',

            },
             
            {
                title: 'patients5_to14_transfused',
                dataIndex: 'patients5_to14_transfused',

            },
             
            {
                title: 'patients15_to44_transfused',
                dataIndex: 'patients15_to44_transfused',

            },
             
            {
                title: 'patients45_to59_transfused',
                dataIndex: 'patients45_to59_transfused',

            },
             
            {
                title: 'patients60_or_older_transfused',
                dataIndex: 'patients60_or_older_transfused',

            },
             
            {
                title: 'whole_blood_transfused',
                dataIndex: 'whole_blood_transfused',

            },
             
            {
                title: 'redcells_transfused',
                dataIndex: 'redcells_transfused',

            },
             
            {
                title: 'platelets_transfused',
                dataIndex: 'platelets_transfused',

            },
             
            {
                title: 'ffp_transfused',
                dataIndex: 'ffp_transfused',

            },
             
            {
                title: 'cryoprecipitate_transfused',
                dataIndex: 'cryoprecipitate_transfused',

            },
             
            {
                title: 'immunological_hemolysis_abo_tncompatibility',
                dataIndex: 'immunological_hemolysis_abo_tncompatibility',

            },
             
            {
                title: 'suspected_hemolysis_other_allo_antibody',
                dataIndex: 'suspected_hemolysis_other_allo_antibody',

            },
             
            {
                title: 'nonimmunological_hemolysis',
                dataIndex: 'nonimmunological_hemolysis',

            },
             
            {
                title: 'post_transfusion_purpura',
                dataIndex: 'post_transfusion_purpura',

            },
             
            {
                title: 'anaph_ylaxis_hypersensitivity',
                dataIndex: 'anaph_ylaxis_hypersensitivity',

            },
             
            {
                title: 'transfusion_related_lung_injury',
                dataIndex: 'transfusion_related_lung_injury',

            },
             
            {
                title: 'graft_versushost_disease',
                dataIndex: 'graft_versushost_disease',

            },
             
            {
                title: 'suspected_transfusion_associated_hiv',
                dataIndex: 'suspected_transfusion_associated_hiv',

            },
             
            {
                title: 'suspected_transfusion_associated_hbv',
                dataIndex: 'suspected_transfusion_associated_hbv',

            },
             
            {
                title: 'suspected_transfusion_associated_hcv',
                dataIndex: 'suspected_transfusion_associated_hcv',

            },
             
            {
                title: 'suspected_sepsis_donor_unit',
                dataIndex: 'suspected_sepsis_donor_unit',

            },
             
            {
                title: 'suspected_transfusion_associated_malaria',
                dataIndex: 'suspected_transfusion_associated_malaria',

            },
             
            {
                title: 'suspected_other_parasiticinfection',
                dataIndex: 'suspected_other_parasiticinfection',

            },
             
            {
                title: 'transfusion_associated_circulatory_overload',
                dataIndex: 'transfusion_associated_circulatory_overload',

            },
             
            {
                title: 'other_serious_atr',
                dataIndex: 'other_serious_atr',

            },
             
            {
                title: 'hiv_elisa_kits_stock',
                dataIndex: 'hiv_elisa_kits_stock',

            },
             
            {
                title: 'hbv_elisa_kits_stock',
                dataIndex: 'hbv_elisa_kits_stock',

            },
             
            {
                title: 'hcv_elisa_kits_stock',
                dataIndex: 'hcv_elisa_kits_stock',

            },
             
            {
                title: 'syphilis_elisa_kits_stock',
                dataIndex: 'syphilis_elisa_kits_stock',

            },
             
            {
                title: 'blood_bag350ml_stock',
                dataIndex: 'blood_bag350ml_stock',

            },
             
            {
                title: 'blood_bag450ml_single_stock',
                dataIndex: 'blood_bag450ml_single_stock',

            },
             
            {
                title: 'blood_bag450ml_triple_stock',
                dataIndex: 'blood_bag450ml_triple_stock',

            },
             
            {
                title: 'transfusion_set_stock',
                dataIndex: 'transfusion_set_stock',

            },
             
            {
                title: 'elisa_kits_stock_out_days',
                dataIndex: 'elisa_kits_stock_out_days',

            },
             
            {
                title: 'blood_bag_stock_out_days',
                dataIndex: 'blood_bag_stock_out_days',

            },
            
         
         ];
    
    
  
  
  
    return (
    <div>
      {/*******  picks **********/}
      {indicatorPick ? <CommonModal
        width={700}
        isModalOpen={indicatorPick}
        setIsModalOpen={setIndicatorPick}
      >
        <IndicatorsPick
          setIsModalOpen={setIndicatorPick}
          selectHandler={indicatorPickHandler}
        />
      </CommonModal> : ""}


      {loading ? <SpinStyle>
        <Spin style={{ color: "#fff" }} size="large" />
      </SpinStyle> : ""}
      <button onClick={() => setIndicatorPick(true)}>hhhhhh</button>
      
      
      
    <FormStyle
        form={form}
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        onError={() => {} }

        validateMessages={validateMessages}
      >
      
      

        
            <Form.Item
            className=' flex-1'
            name={['indicator', 'siteid']}
            label="siteid"
            rules={[
                {
                required: true,
                },
            ]}
            >
            <Input  
            className='border-gray-400 py-2'
            />
            </Form.Item>
            
                <Form.Item name={['indicator', 'duedate']}  label="duedate">
            <DatePicker format={'YYYY/MM/DD'} />
        </Form.Item>
            
                <Form.Item name={['indicator', 'date']}  label="date">
            <DatePicker format={'YYYY/MM/DD'} />
        </Form.Item>
            
                <Form.Item name={['indicator', 'ispublish']} label="ispublish" >
                    <Switch checked={switch2} onChange={(value)=>setSwitch2(value)} style={{background:switch2?'blue':'gray'}} />
                </Form.Item>
            
            <Form.Item
      
            name={['indicator', 'total_blood_donations']}
            label="total_blood_donations"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'familyr_eplacement_donations']}
            label="familyr_eplacement_donations"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'first_time_donors']}
            label="first_time_donors"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'repeat_donors']}
            label="repeat_donors"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'student_donors']}
            label="student_donors"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'government_employee_donors']}
            label="government_employee_donors"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'private_employee_donors']}
            label="private_employee_donors"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'self_employed_donors']}
            label="self_employed_donors"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'unemployed_donors']}
            label="unemployed_donors"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'other_donors']}
            label="other_donors"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'male_donors']}
            label="male_donors"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'female_donors']}
            label="female_donors"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'under18_donors']}
            label="under18_donors"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'age18to24_donors']}
            label="age18to24_donors"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'age25to34_donors']}
            label="age25to34_donors"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'age35to44_donors']}
            label="age35to44_donors"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'age45to54_donors']}
            label="age45to54_donors"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'age55to64_donors']}
            label="age55to64_donors"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'over65_donors']}
            label="over65_donors"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'apheresis_donations']}
            label="apheresis_donations"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'donations_fromcenter']}
            label="donations_fromcenter"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'donations_from_mobile']}
            label="donations_from_mobile"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'mobile_sessions_conducted']}
            label="mobile_sessions_conducted"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'active_blood_donor_clubs']}
            label="active_blood_donor_clubs"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'adr_fainting']}
            label="adr_fainting"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'adr_fainting_withloss_of_consciousness']}
            label="adr_fainting_withloss_of_consciousness"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'adr_seizure']}
            label="adr_seizure"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'adr_technical_problem']}
            label="adr_technical_problem"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'donor_refusals']}
            label="donor_refusals"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'other_adrs']}
            label="other_adrs"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'permanent_deferrals_duetottis']}
            label="permanent_deferrals_duetottis"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'deferrals_by_lowweight']}
            label="deferrals_by_lowweight"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'deferrals_by_age']}
            label="deferrals_by_age"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'deferrals_by_pregnancy_lactation']}
            label="deferrals_by_pregnancy_lactation"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'deferrals_by_blood_pressure']}
            label="deferrals_by_blood_pressure"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'deferrals_by_low_hemoglobin']}
            label="deferrals_by_low_hemoglobin"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'deferrals_by_other_medical_conditions']}
            label="deferrals_by_other_medical_conditions"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'deferrals_by_high_risk_behavior']}
            label="deferrals_by_high_risk_behavior"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'deferrals_by_travel_history']}
            label="deferrals_by_travel_history"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'deferrals_by_other_reasons']}
            label="deferrals_by_other_reasons"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
                <Form.Item name={['indicator', 'post_donation_counselling_system']} label="post_donation_counselling_system" >
                    <Switch checked={switch2} onChange={(value)=>setSwitch2(value)} style={{background:switch2?'blue':'gray'}} />
                </Form.Item>
            
                <Form.Item name={['indicator', 'referral_for_positive_ttis_donors']} label="referral_for_positive_ttis_donors" >
                    <Switch checked={switch2} onChange={(value)=>setSwitch2(value)} style={{background:switch2?'blue':'gray'}} />
                </Form.Item>
            
            <Form.Item
      
            name={['indicator', 'pre_donation_information_given']}
            label="pre_donation_information_given"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'pre_donation_counselling']}
            label="pre_donation_counselling"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'post_donation_counselling_service']}
            label="post_donation_counselling_service"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'post_donation_counselling_from_mobile']}
            label="post_donation_counselling_from_mobile"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'post_donation_counselling_from_center']}
            label="post_donation_counselling_from_center"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'non_reactive_donors_receiving_pdc']}
            label="non_reactive_donors_receiving_pdc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'reactive_donors_receiving_pdc']}
            label="reactive_donors_receiving_pdc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'referred_reactive_donors_receiving_pdc']}
            label="referred_reactive_donors_receiving_pdc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'donations_screened_for_ttis']}
            label="donations_screened_for_ttis"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'samples_screened_for_ttis']}
            label="samples_screened_for_ttis"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'samples_screened_for_blood_group']}
            label="samples_screened_for_blood_group"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'samples_screened_for_blood_group_quality_assured']}
            label="samples_screened_for_blood_group_quality_assured"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'ttis_positive']}
            label="ttis_positive"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'hiv_positive']}
            label="hiv_positive"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'hepatitis_b_positive']}
            label="hepatitis_b_positive"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'hepatitis_c_positive']}
            label="hepatitis_c_positive"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'syphilis_positive']}
            label="syphilis_positive"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'donors_positive_for_ttis']}
            label="donors_positive_for_ttis"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
                <Form.Item name={['indicator', 'component_processing_system']} label="component_processing_system" >
                    <Switch checked={switch2} onChange={(value)=>setSwitch2(value)} style={{background:switch2?'blue':'gray'}} />
                </Form.Item>
            
            <Form.Item
      
            name={['indicator', 'whole_blood_separated_into_components']}
            label="whole_blood_separated_into_components"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'crc_units_repared']}
            label="crc_units_repared"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'platelets_prepared']}
            label="platelets_prepared"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'ffp_prepared']}
            label="ffp_prepared"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'cryoprecipitate_prepared']}
            label="cryoprecipitate_prepared"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'discarded_units_overweight_crc']}
            label="discarded_units_overweight_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'discarded_units_overweight_platelets']}
            label="discarded_units_overweight_platelets"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'discarded_units_overweight_ffp']}
            label="discarded_units_overweight_ffp"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'discarded_units_overweight_cryoprecipitate']}
            label="discarded_units_overweight_cryoprecipitate"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'discarded_units_collection_problem']}
            label="discarded_units_collection_problem"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'discarded_units_expired']}
            label="discarded_units_expired"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'discarded_pnits_processing_problems']}
            label="discarded_pnits_processing_problems"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'discarded_units_reactive_ttis']}
            label="discarded_units_reactive_ttis"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'discarded_units_hemolyzed']}
            label="discarded_units_hemolyzed"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'discarded_units_clotted']}
            label="discarded_units_clotted"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'discarded_units_storage_problems']}
            label="discarded_units_storage_problems"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'discarded_units_transportation_problems']}
            label="discarded_units_transportation_problems"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'discarded_units_highod']}
            label="discarded_units_highod"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'discarded_units_others']}
            label="discarded_units_others"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'requested_aplus_wb_crc']}
            label="requested_aplus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'requested_bplus_wbcrc']}
            label="requested_bplus_wbcrc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'requested_abplus_wb_crc']}
            label="requested_abplus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'requested_oplus_wb_crc']}
            label="requested_oplus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'requested_aminus_wb_crc']}
            label="requested_aminus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'requested_bminus_wb_crc']}
            label="requested_bminus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'requested_abminus_wb_crc']}
            label="requested_abminus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'requested_ominus_wb_crc']}
            label="requested_ominus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'requested_ffp_units']}
            label="requested_ffp_units"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'requested_platelets_units']}
            label="requested_platelets_units"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'distributed_aplus_wb_crc']}
            label="distributed_aplus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'distributed_bplus_wb_crc']}
            label="distributed_bplus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'distributed_abplus_wb_crc']}
            label="distributed_abplus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'distributed_oplus_wb_crc']}
            label="distributed_oplus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'distributed_aminus_wb_crc']}
            label="distributed_aminus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'distributed_bminus_wb_crc']}
            label="distributed_bminus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'distributed_abminus_wb_crc']}
            label="distributed_abminus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'distributed_ominus_wb_crc']}
            label="distributed_ominus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'distributed_ffp_units']}
            label="distributed_ffp_units"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'distributed_platelets_units']}
            label="distributed_platelets_units"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'transferred_aplus_wb_crc']}
            label="transferred_aplus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'transferred_bplus_wb_crc']}
            label="transferred_bplus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'transferred_abplus_wb_crc']}
            label="transferred_abplus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'transferred_oplus_wb_crc']}
            label="transferred_oplus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'transferred_aminus_wb_crc']}
            label="transferred_aminus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'transferred_bminus_wb_crc']}
            label="transferred_bminus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'transferred_abminus_wb_crc']}
            label="transferred_abminus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'transferred_ominus_wb_crc']}
            label="transferred_ominus_wb_crc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'transferred_ffp_units']}
            label="transferred_ffp_units"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'transferred_platelets_units']}
            label="transferred_platelets_units"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'health_facilities_performing_transfusion']}
            label="health_facilities_performing_transfusion"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'health_facilities_with_htc']}
            label="health_facilities_with_htc"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'health_facilities_performing_clinical_audit']}
            label="health_facilities_performing_clinical_audit"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'male_patients_transfused']}
            label="male_patients_transfused"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'female_patients_transfused']}
            label="female_patients_transfused"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'patients_under5_transfused']}
            label="patients_under5_transfused"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'patients5_to14_transfused']}
            label="patients5_to14_transfused"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'patients15_to44_transfused']}
            label="patients15_to44_transfused"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'patients45_to59_transfused']}
            label="patients45_to59_transfused"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'patients60_or_older_transfused']}
            label="patients60_or_older_transfused"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'whole_blood_transfused']}
            label="whole_blood_transfused"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'redcells_transfused']}
            label="redcells_transfused"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'platelets_transfused']}
            label="platelets_transfused"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'ffp_transfused']}
            label="ffp_transfused"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'cryoprecipitate_transfused']}
            label="cryoprecipitate_transfused"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'immunological_hemolysis_abo_tncompatibility']}
            label="immunological_hemolysis_abo_tncompatibility"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'suspected_hemolysis_other_allo_antibody']}
            label="suspected_hemolysis_other_allo_antibody"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'nonimmunological_hemolysis']}
            label="nonimmunological_hemolysis"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'post_transfusion_purpura']}
            label="post_transfusion_purpura"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'anaph_ylaxis_hypersensitivity']}
            label="anaph_ylaxis_hypersensitivity"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'transfusion_related_lung_injury']}
            label="transfusion_related_lung_injury"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'graft_versushost_disease']}
            label="graft_versushost_disease"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'suspected_transfusion_associated_hiv']}
            label="suspected_transfusion_associated_hiv"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'suspected_transfusion_associated_hbv']}
            label="suspected_transfusion_associated_hbv"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'suspected_transfusion_associated_hcv']}
            label="suspected_transfusion_associated_hcv"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'suspected_sepsis_donor_unit']}
            label="suspected_sepsis_donor_unit"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'suspected_transfusion_associated_malaria']}
            label="suspected_transfusion_associated_malaria"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'suspected_other_parasiticinfection']}
            label="suspected_other_parasiticinfection"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'transfusion_associated_circulatory_overload']}
            label="transfusion_associated_circulatory_overload"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'other_serious_atr']}
            label="other_serious_atr"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'hiv_elisa_kits_stock']}
            label="hiv_elisa_kits_stock"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'hbv_elisa_kits_stock']}
            label="hbv_elisa_kits_stock"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'hcv_elisa_kits_stock']}
            label="hcv_elisa_kits_stock"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'syphilis_elisa_kits_stock']}
            label="syphilis_elisa_kits_stock"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'blood_bag350ml_stock']}
            label="blood_bag350ml_stock"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'blood_bag450ml_single_stock']}
            label="blood_bag450ml_single_stock"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'blood_bag450ml_triple_stock']}
            label="blood_bag450ml_triple_stock"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'transfusion_set_stock']}
            label="transfusion_set_stock"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'elisa_kits_stock_out_days']}
            label="elisa_kits_stock_out_days"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
            <Form.Item
      
            name={['indicator', 'blood_bag_stock_out_days']}
            label="blood_bag_stock_out_days"
            rules={[
            {
                type: 'number',
                min: 0,
                max: 99,
            },

            ]}
            
            >
            <InputNumber 
            className='border-gray-400 py-1'
            style={{
                minWidth:150
            }} 
            />
            </Form.Item>
                    
      
      
    {indicatorsData2.length>0 && <CommonTable
                    rowSelectionType={"checkbox"}
                    data={indicatorsData2}
                    columns={columns}
                    total={indicatorsData2.lenght}
                    loadding={loading}
                    type={true}

                />}

                <Divider/>
            
      
      <ButtonStyle>
          <button onClick={() => setIsModalOpen(false)} >
            cancel
          </button>

          {mode?<button type='submit'  >
           Submit
          </button>:<button type='submit'  >
            Add List
          </button>}

          {!mode&&<button disabled={indicatorsData2.length==0} onClick={onAdd} className={indicatorsData2.length>0?"":'disable'} type='submit'  >
            Submit
          </button>}
        </ButtonStyle>
      </FormStyle>
    
      
       
      </div>
  )
    
    
  
   }  
   
   
  const SpinStyle = styled.div`
  /* border: 1px solid; */
  width: 50px;
  height:  50px;
  background-color: rgba(0,0,0,0.2);
  z-index: 100;
  display: flex;
  border-radius:  120px;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 40%;

  .ant-spin-dot .ant-spin-dot-spin {
    background-color: red; 
  }
 


`



export default IndicatorsEdit
    
    