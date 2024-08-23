
    import React, { useEffect, useRef, useState } from 'react'
    import { useSearchParams } from 'react-router-dom'
    import indicatorsService from './IndicatorsService';
    import CommonTable from '../../components/commons/CommonTable';
    import { ButtonStyle, SearchInputStyle } from '../../components/commons/CommonStyles';
    import { Divider, Input } from 'antd';
    import { searchIndicators, updateIndicatorsState, indicatorsSearchText } from './IndicatorsRedux';//** */
    import { useDispatch, useSelector } from 'react-redux'; /*** */

    
    const IndicatorsPick = ({setIsModalOpen,selectHandler}) => {
    const [indicatorsData, setIndicatorsData] = useState([])
    const [total, setTotal] = useState()
    const [searchParams,setSearchParams] = useSearchParams()
    const dispatch = useDispatch(); /*** */
    const searchText = useSelector(indicatorsSearchText); //** */
    
    
    const [loading, setLoading] = useState();
    const [indicatorsSelection, setIndicatorsSelection] = useState([])
    const delayTimerRef = useRef(null);
    
    const getPaginationInfo = () => {

        return [searchParams.get('page') || 1, searchParams.get('limit') || 5]
    }


    useEffect(() => {
        const [page, limit] = getPaginationInfo();
        dispatch(updateIndicatorsState({ page: page, limit: limit }))

        searchData();
    }, [])

    async function searchData() {
        try {
            setLoading(true)
            const { payload } = await dispatch(searchIndicators());
            setIndicatorsData(payload.data)
            setTotal(payload.total)
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }
    const searchHandler = (e) => {
        const { value } = e.target;
        const [page, limit] = getPaginationInfo();

        dispatch(updateIndicatorsState({ page: page, limit: limit, searchText: value }))
        clearTimeout(delayTimerRef.current);
        delayTimerRef.current = setTimeout(() => {


            searchData()
        }, 500);


    }

    const handlePagination = (page, pageSize) => {
        
        setSearchParams({page:page,limit:pageSize})
        searchData()
    }
    
    
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

<div >
                <SearchInputStyle>
                    <Input onChange={searchHandler}
                        placeholder="Search"
                        value={searchText}
                        allowClear />
                </SearchInputStyle>


    <CommonTable
                rowSelectionType={"radio"}
                data={indicatorsData}
                columns={columns}
                setSelection={setIndicatorsSelection}
                handlePagination={handlePagination}
                total={total}
                loadding={loading}

            />
            <Divider style={{margin:15}}/>

<ButtonStyle>
     <button    onClick={()=>setIsModalOpen(false)} >
        cancel
      </button>
      <button disabled={indicatorsSelection.length==0} className={indicatorsSelection.length>0?'':'disable'} onClick={()=>selectHandler(indicatorsSelection[0])}>
        Return
      </button>
     </ButtonStyle>     

    </div>
  )
}
    
    

    export default IndicatorsPick
    