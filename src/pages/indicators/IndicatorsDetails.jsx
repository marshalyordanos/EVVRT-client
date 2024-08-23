
    import { Divider } from 'antd'
    import React from 'react'
    import { useLocation } from 'react-router-dom'
    import styled from 'styled-components'


    
    const IndicatorsDetail = () => {
    const {state} = useLocation();
    return (
    <DetailStyle>
        <h1>User Detail</h1>
        <Divider  style={{margin:'15px 0 25px 0'}} />

    
    
    
                <div className='detail_child'>
                <p className='detail_key'>siteid:</p>
                <p className='detail_value'>{state?.siteid}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>duedate:</p>
                <p className='detail_value'>{state?.duedate}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>date:</p>
                <p className='detail_value'>{state?.date}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>ispublish:</p>
                <p className='detail_value'>{state?.ispublish?'true':'false'}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>total_blood_donations:</p>
                <p className='detail_value'>{state?.total_blood_donations}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>familyr_eplacement_donations:</p>
                <p className='detail_value'>{state?.familyr_eplacement_donations}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>first_time_donors:</p>
                <p className='detail_value'>{state?.first_time_donors}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>repeat_donors:</p>
                <p className='detail_value'>{state?.repeat_donors}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>student_donors:</p>
                <p className='detail_value'>{state?.student_donors}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>government_employee_donors:</p>
                <p className='detail_value'>{state?.government_employee_donors}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>private_employee_donors:</p>
                <p className='detail_value'>{state?.private_employee_donors}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>self_employed_donors:</p>
                <p className='detail_value'>{state?.self_employed_donors}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>unemployed_donors:</p>
                <p className='detail_value'>{state?.unemployed_donors}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>other_donors:</p>
                <p className='detail_value'>{state?.other_donors}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>male_donors:</p>
                <p className='detail_value'>{state?.male_donors}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>female_donors:</p>
                <p className='detail_value'>{state?.female_donors}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>under18_donors:</p>
                <p className='detail_value'>{state?.under18_donors}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>age18to24_donors:</p>
                <p className='detail_value'>{state?.age18to24_donors}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>age25to34_donors:</p>
                <p className='detail_value'>{state?.age25to34_donors}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>age35to44_donors:</p>
                <p className='detail_value'>{state?.age35to44_donors}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>age45to54_donors:</p>
                <p className='detail_value'>{state?.age45to54_donors}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>age55to64_donors:</p>
                <p className='detail_value'>{state?.age55to64_donors}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>over65_donors:</p>
                <p className='detail_value'>{state?.over65_donors}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>apheresis_donations:</p>
                <p className='detail_value'>{state?.apheresis_donations}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>donations_fromcenter:</p>
                <p className='detail_value'>{state?.donations_fromcenter}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>donations_from_mobile:</p>
                <p className='detail_value'>{state?.donations_from_mobile}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>mobile_sessions_conducted:</p>
                <p className='detail_value'>{state?.mobile_sessions_conducted}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>active_blood_donor_clubs:</p>
                <p className='detail_value'>{state?.active_blood_donor_clubs}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>adr_fainting:</p>
                <p className='detail_value'>{state?.adr_fainting}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>adr_fainting_withloss_of_consciousness:</p>
                <p className='detail_value'>{state?.adr_fainting_withloss_of_consciousness}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>adr_seizure:</p>
                <p className='detail_value'>{state?.adr_seizure}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>adr_technical_problem:</p>
                <p className='detail_value'>{state?.adr_technical_problem}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>donor_refusals:</p>
                <p className='detail_value'>{state?.donor_refusals}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>other_adrs:</p>
                <p className='detail_value'>{state?.other_adrs}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>permanent_deferrals_duetottis:</p>
                <p className='detail_value'>{state?.permanent_deferrals_duetottis}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>deferrals_by_lowweight:</p>
                <p className='detail_value'>{state?.deferrals_by_lowweight}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>deferrals_by_age:</p>
                <p className='detail_value'>{state?.deferrals_by_age}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>deferrals_by_pregnancy_lactation:</p>
                <p className='detail_value'>{state?.deferrals_by_pregnancy_lactation}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>deferrals_by_blood_pressure:</p>
                <p className='detail_value'>{state?.deferrals_by_blood_pressure}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>deferrals_by_low_hemoglobin:</p>
                <p className='detail_value'>{state?.deferrals_by_low_hemoglobin}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>deferrals_by_other_medical_conditions:</p>
                <p className='detail_value'>{state?.deferrals_by_other_medical_conditions}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>deferrals_by_high_risk_behavior:</p>
                <p className='detail_value'>{state?.deferrals_by_high_risk_behavior}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>deferrals_by_travel_history:</p>
                <p className='detail_value'>{state?.deferrals_by_travel_history}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>deferrals_by_other_reasons:</p>
                <p className='detail_value'>{state?.deferrals_by_other_reasons}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>post_donation_counselling_system:</p>
                <p className='detail_value'>{state?.post_donation_counselling_system?'true':'false'}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>referral_for_positive_ttis_donors:</p>
                <p className='detail_value'>{state?.referral_for_positive_ttis_donors?'true':'false'}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>pre_donation_information_given:</p>
                <p className='detail_value'>{state?.pre_donation_information_given}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>pre_donation_counselling:</p>
                <p className='detail_value'>{state?.pre_donation_counselling}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>post_donation_counselling_service:</p>
                <p className='detail_value'>{state?.post_donation_counselling_service}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>post_donation_counselling_from_mobile:</p>
                <p className='detail_value'>{state?.post_donation_counselling_from_mobile}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>post_donation_counselling_from_center:</p>
                <p className='detail_value'>{state?.post_donation_counselling_from_center}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>non_reactive_donors_receiving_pdc:</p>
                <p className='detail_value'>{state?.non_reactive_donors_receiving_pdc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>reactive_donors_receiving_pdc:</p>
                <p className='detail_value'>{state?.reactive_donors_receiving_pdc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>referred_reactive_donors_receiving_pdc:</p>
                <p className='detail_value'>{state?.referred_reactive_donors_receiving_pdc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>donations_screened_for_ttis:</p>
                <p className='detail_value'>{state?.donations_screened_for_ttis}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>samples_screened_for_ttis:</p>
                <p className='detail_value'>{state?.samples_screened_for_ttis}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>samples_screened_for_blood_group:</p>
                <p className='detail_value'>{state?.samples_screened_for_blood_group}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>samples_screened_for_blood_group_quality_assured:</p>
                <p className='detail_value'>{state?.samples_screened_for_blood_group_quality_assured}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>ttis_positive:</p>
                <p className='detail_value'>{state?.ttis_positive}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>hiv_positive:</p>
                <p className='detail_value'>{state?.hiv_positive}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>hepatitis_b_positive:</p>
                <p className='detail_value'>{state?.hepatitis_b_positive}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>hepatitis_c_positive:</p>
                <p className='detail_value'>{state?.hepatitis_c_positive}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>syphilis_positive:</p>
                <p className='detail_value'>{state?.syphilis_positive}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>donors_positive_for_ttis:</p>
                <p className='detail_value'>{state?.donors_positive_for_ttis}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>component_processing_system:</p>
                <p className='detail_value'>{state?.component_processing_system?'true':'false'}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>whole_blood_separated_into_components:</p>
                <p className='detail_value'>{state?.whole_blood_separated_into_components}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>crc_units_repared:</p>
                <p className='detail_value'>{state?.crc_units_repared}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>platelets_prepared:</p>
                <p className='detail_value'>{state?.platelets_prepared}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>ffp_prepared:</p>
                <p className='detail_value'>{state?.ffp_prepared}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>cryoprecipitate_prepared:</p>
                <p className='detail_value'>{state?.cryoprecipitate_prepared}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>discarded_units_overweight_crc:</p>
                <p className='detail_value'>{state?.discarded_units_overweight_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>discarded_units_overweight_platelets:</p>
                <p className='detail_value'>{state?.discarded_units_overweight_platelets}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>discarded_units_overweight_ffp:</p>
                <p className='detail_value'>{state?.discarded_units_overweight_ffp}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>discarded_units_overweight_cryoprecipitate:</p>
                <p className='detail_value'>{state?.discarded_units_overweight_cryoprecipitate}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>discarded_units_collection_problem:</p>
                <p className='detail_value'>{state?.discarded_units_collection_problem}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>discarded_units_expired:</p>
                <p className='detail_value'>{state?.discarded_units_expired}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>discarded_pnits_processing_problems:</p>
                <p className='detail_value'>{state?.discarded_pnits_processing_problems}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>discarded_units_reactive_ttis:</p>
                <p className='detail_value'>{state?.discarded_units_reactive_ttis}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>discarded_units_hemolyzed:</p>
                <p className='detail_value'>{state?.discarded_units_hemolyzed}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>discarded_units_clotted:</p>
                <p className='detail_value'>{state?.discarded_units_clotted}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>discarded_units_storage_problems:</p>
                <p className='detail_value'>{state?.discarded_units_storage_problems}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>discarded_units_transportation_problems:</p>
                <p className='detail_value'>{state?.discarded_units_transportation_problems}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>discarded_units_highod:</p>
                <p className='detail_value'>{state?.discarded_units_highod}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>discarded_units_others:</p>
                <p className='detail_value'>{state?.discarded_units_others}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>requested_aplus_wb_crc:</p>
                <p className='detail_value'>{state?.requested_aplus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>requested_bplus_wbcrc:</p>
                <p className='detail_value'>{state?.requested_bplus_wbcrc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>requested_abplus_wb_crc:</p>
                <p className='detail_value'>{state?.requested_abplus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>requested_oplus_wb_crc:</p>
                <p className='detail_value'>{state?.requested_oplus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>requested_aminus_wb_crc:</p>
                <p className='detail_value'>{state?.requested_aminus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>requested_bminus_wb_crc:</p>
                <p className='detail_value'>{state?.requested_bminus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>requested_abminus_wb_crc:</p>
                <p className='detail_value'>{state?.requested_abminus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>requested_ominus_wb_crc:</p>
                <p className='detail_value'>{state?.requested_ominus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>requested_ffp_units:</p>
                <p className='detail_value'>{state?.requested_ffp_units}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>requested_platelets_units:</p>
                <p className='detail_value'>{state?.requested_platelets_units}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>distributed_aplus_wb_crc:</p>
                <p className='detail_value'>{state?.distributed_aplus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>distributed_bplus_wb_crc:</p>
                <p className='detail_value'>{state?.distributed_bplus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>distributed_abplus_wb_crc:</p>
                <p className='detail_value'>{state?.distributed_abplus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>distributed_oplus_wb_crc:</p>
                <p className='detail_value'>{state?.distributed_oplus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>distributed_aminus_wb_crc:</p>
                <p className='detail_value'>{state?.distributed_aminus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>distributed_bminus_wb_crc:</p>
                <p className='detail_value'>{state?.distributed_bminus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>distributed_abminus_wb_crc:</p>
                <p className='detail_value'>{state?.distributed_abminus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>distributed_ominus_wb_crc:</p>
                <p className='detail_value'>{state?.distributed_ominus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>distributed_ffp_units:</p>
                <p className='detail_value'>{state?.distributed_ffp_units}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>distributed_platelets_units:</p>
                <p className='detail_value'>{state?.distributed_platelets_units}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>transferred_aplus_wb_crc:</p>
                <p className='detail_value'>{state?.transferred_aplus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>transferred_bplus_wb_crc:</p>
                <p className='detail_value'>{state?.transferred_bplus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>transferred_abplus_wb_crc:</p>
                <p className='detail_value'>{state?.transferred_abplus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>transferred_oplus_wb_crc:</p>
                <p className='detail_value'>{state?.transferred_oplus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>transferred_aminus_wb_crc:</p>
                <p className='detail_value'>{state?.transferred_aminus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>transferred_bminus_wb_crc:</p>
                <p className='detail_value'>{state?.transferred_bminus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>transferred_abminus_wb_crc:</p>
                <p className='detail_value'>{state?.transferred_abminus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>transferred_ominus_wb_crc:</p>
                <p className='detail_value'>{state?.transferred_ominus_wb_crc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>transferred_ffp_units:</p>
                <p className='detail_value'>{state?.transferred_ffp_units}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>transferred_platelets_units:</p>
                <p className='detail_value'>{state?.transferred_platelets_units}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>health_facilities_performing_transfusion:</p>
                <p className='detail_value'>{state?.health_facilities_performing_transfusion}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>health_facilities_with_htc:</p>
                <p className='detail_value'>{state?.health_facilities_with_htc}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>health_facilities_performing_clinical_audit:</p>
                <p className='detail_value'>{state?.health_facilities_performing_clinical_audit}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>male_patients_transfused:</p>
                <p className='detail_value'>{state?.male_patients_transfused}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>female_patients_transfused:</p>
                <p className='detail_value'>{state?.female_patients_transfused}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>patients_under5_transfused:</p>
                <p className='detail_value'>{state?.patients_under5_transfused}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>patients5_to14_transfused:</p>
                <p className='detail_value'>{state?.patients5_to14_transfused}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>patients15_to44_transfused:</p>
                <p className='detail_value'>{state?.patients15_to44_transfused}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>patients45_to59_transfused:</p>
                <p className='detail_value'>{state?.patients45_to59_transfused}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>patients60_or_older_transfused:</p>
                <p className='detail_value'>{state?.patients60_or_older_transfused}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>whole_blood_transfused:</p>
                <p className='detail_value'>{state?.whole_blood_transfused}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>redcells_transfused:</p>
                <p className='detail_value'>{state?.redcells_transfused}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>platelets_transfused:</p>
                <p className='detail_value'>{state?.platelets_transfused}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>ffp_transfused:</p>
                <p className='detail_value'>{state?.ffp_transfused}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>cryoprecipitate_transfused:</p>
                <p className='detail_value'>{state?.cryoprecipitate_transfused}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>immunological_hemolysis_abo_tncompatibility:</p>
                <p className='detail_value'>{state?.immunological_hemolysis_abo_tncompatibility}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>suspected_hemolysis_other_allo_antibody:</p>
                <p className='detail_value'>{state?.suspected_hemolysis_other_allo_antibody}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>nonimmunological_hemolysis:</p>
                <p className='detail_value'>{state?.nonimmunological_hemolysis}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>post_transfusion_purpura:</p>
                <p className='detail_value'>{state?.post_transfusion_purpura}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>anaph_ylaxis_hypersensitivity:</p>
                <p className='detail_value'>{state?.anaph_ylaxis_hypersensitivity}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>transfusion_related_lung_injury:</p>
                <p className='detail_value'>{state?.transfusion_related_lung_injury}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>graft_versushost_disease:</p>
                <p className='detail_value'>{state?.graft_versushost_disease}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>suspected_transfusion_associated_hiv:</p>
                <p className='detail_value'>{state?.suspected_transfusion_associated_hiv}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>suspected_transfusion_associated_hbv:</p>
                <p className='detail_value'>{state?.suspected_transfusion_associated_hbv}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>suspected_transfusion_associated_hcv:</p>
                <p className='detail_value'>{state?.suspected_transfusion_associated_hcv}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>suspected_sepsis_donor_unit:</p>
                <p className='detail_value'>{state?.suspected_sepsis_donor_unit}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>suspected_transfusion_associated_malaria:</p>
                <p className='detail_value'>{state?.suspected_transfusion_associated_malaria}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>suspected_other_parasiticinfection:</p>
                <p className='detail_value'>{state?.suspected_other_parasiticinfection}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>transfusion_associated_circulatory_overload:</p>
                <p className='detail_value'>{state?.transfusion_associated_circulatory_overload}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>other_serious_atr:</p>
                <p className='detail_value'>{state?.other_serious_atr}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>hiv_elisa_kits_stock:</p>
                <p className='detail_value'>{state?.hiv_elisa_kits_stock}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>hbv_elisa_kits_stock:</p>
                <p className='detail_value'>{state?.hbv_elisa_kits_stock}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>hcv_elisa_kits_stock:</p>
                <p className='detail_value'>{state?.hcv_elisa_kits_stock}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>syphilis_elisa_kits_stock:</p>
                <p className='detail_value'>{state?.syphilis_elisa_kits_stock}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>blood_bag350ml_stock:</p>
                <p className='detail_value'>{state?.blood_bag350ml_stock}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>blood_bag450ml_single_stock:</p>
                <p className='detail_value'>{state?.blood_bag450ml_single_stock}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>blood_bag450ml_triple_stock:</p>
                <p className='detail_value'>{state?.blood_bag450ml_triple_stock}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>transfusion_set_stock:</p>
                <p className='detail_value'>{state?.transfusion_set_stock}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>elisa_kits_stock_out_days:</p>
                <p className='detail_value'>{state?.elisa_kits_stock_out_days}</p>  
            </div>
            
                <div className='detail_child'>
                <p className='detail_key'>blood_bag_stock_out_days:</p>
                <p className='detail_value'>{state?.blood_bag_stock_out_days}</p>  
            </div>
            

    </DetailStyle>
  )
}
    


    const DetailStyle = styled.div`
        border: 1px lightgray;
        margin: 30px;
        padding: 20px;
        background-color: white;
        border-radius: 8px;
        h1{
            padding: 0;
            margin: 0;
            font-size: 16px;

        }
        .detail_child{
            margin-bottom: 15px;
        }
        .detail_key{
            font-size: 20px;
            font-weight: bold;
        }
        .detail_value{
            color: #106085;
            font-size: 20px;
        }

`

export default IndicatorsDetail
    