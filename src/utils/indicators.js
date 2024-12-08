const indicators = {
  total_blood_donations: "Total number of blood donations",
  familyr_eplacement_donations:
    "Total number of blood donations collected from family replacement",
  first_time_donors:
    "Number of blood donations collected from 1st time donors.",
  repeat_donors: "Number of blood donations collected from repeat donors.",
  student_donors: "Number of blood donations collected from Student.",
  government_employee_donors:
    "Number of blood donations collected from Government Employee.",
  private_employee_donors:
    "Number of blood donations collected from Private Employee.",
  self_employed_donors:
    "Number of blood donations collected from Selfemployed.",
  unemployed_donors: "Number of blood donations collected from Unemployed",
  other_donors: "Number of blood donations collected from Others.",

  male_donors: "Number of blood donations collected from Male donor",
  female_donors: "Number of blood donations collected from Female donor",
  under18_donors:
    "Number of blood donations collected from donor under 18 years.",
  age18to24_donors:
    "Number of blood donations collected from donor 18 - to- 24 years.",
  age25to34_donors:
    "Number of blood donations collected from donor 25 - to- 34 years.",
  age35to44_donors:
    "Number of blood donations collected from donor 35 - to- 44 years.",
  age45to54_donors:
    "Number of blood donations collected from donor 45 - to- 54 years",
  age55to64_donors:
    "Number of blood donations collected from donor 55 - to- 64 years.",
  over65_donors:
    "Number of blood donations collected from donors 65 years or older.",
  apheresis_donations: "Total number of apheresis donations collected.",

  donations_fromCenter: "Number of donations from center",
  donations_from_mobile: "Number of donations from mobile",
  mobile_sessions_conducted: "Total number of Mobile Session conducted",
  active_blood_donor_clubs: "Total Number of active blood donors Club",
  adr_fainting: "Total number of ADR Fainting occur",
  adr_fainting_withLoss_of_consciousness:
    "Total number of ADR Fainting with loss of Consciousness",
  adr_seizure: "Total number of ADR Loss of Consciousness with Seizure",
  adr_technical_problem: "Total number of ADR due to technical problem",
  donor_refusals: "Total number of Donor Refusal",
  other_adrs: "Total number of Others ADR",

  permanent_deferrals_dueToTtis:
    "Number of blood donors who were permanently deferred due to TTIs result",
  deferrals_by_low_weight: "Number of deferrals by low weight / Under weight",
  deferrals_by_age: "Number of deferrals by Age (under 18 or above 65)",
  deferrals_by_pregnancy_lactation:
    "Number of deferrals by Pregnancy & Lactation",
  deferrals_by_blood_pressure: "Number of deferrals by blood pressure",
  deferrals_by_low_hemoglobin:
    "Number of deferrals by low hemoglobin / Hematocrit",
  deferrals_by_other_medical_conditions:
    "Number of deferrals by other medical condition / Diseases",
  deferrals_by_high_risk_behavior: "Number of deferrals by high-risk behavior",
  deferrals_by_travel_history: "Number of deferrals by travel history",
  deferrals_by_other_reasons: "Number of deferrals by other reason",
  // ------------
  post_donation_counselling_system:
    "Is there a system of post donation counselling?",
  referral_for_positive_ttis_donors:
    "Is there a system of referral for blood donors who positive for TTIs?",
  pre_donation_information_given:
    "Number of donors given pre-donation information.",
  pre_donation_counselling:
    "Total number of donors presenting for pre-donation counselling.",
  post_donation_counselling_service:
    "Total number of donors receiving post-donation counselling service",
  post_donation_counselling_from_mobile:
    "Number of donors receiving post-donation counselling service from Mobile site",
  post_donation_counselling_from_center:
    "Number of donors receiving post-donation counselling service from Center.",
  non_reactive_donors_receiving_pdc:
    "Number of Non-Reactive donors who receive PDC service.",
  reactive_donors_receiving_pdc:
    "Number of Reactive donors who receive PDC service.",
  referred_reactive_donors_receiving_pdc:
    "Number of referred donors that was reactive and receive PDC service.",

  donations_screened_for_ttis:
    "Total number of donations that were screened for TTIs",
  samples_screened_for_ttis:
    "Total number of samples that were screened for TTIs in a quality-assured manner",
  samples_screened_for_blood_group:
    "Total number of samples that were screened for Blood Group",
  samples_screened_for_blood_group_quality_assured:
    "Total number of samples that were screened for Blood Group in a quality-assured manner.",
  ttis_positive: "Total number of TTIs positive",
  hiv_positive: "Number of HIV positive",
  hepatitis_b_positive: "Number of Hepatitis B positive",
  hepatitis_c_positive: "Number of Hepatitis C positive",
  syphilis_positive: "Number of Syphilis positive",
  donors_positive_for_ttis: "Total number of Donors positive for TTIS",

  component_processing_system:
    "Is there a system of processing for component production?",
  whole_blood_separated_into_components:
    "Total number of whole blood donations separated into components",
  crc_units_repared: "Number of CRC units prepared",
  platelets_prepared: "Number of Platelet prepared",
  ffp_prepared: "Number of FFP prepared",
  cryoprecipitate_prepared: "Number of Cryoprecipitate prepared",
  discarded_units_overweight_crc:
    "Total number of discarded units by overweight/ underweight CRC due to processing problem",
  discarded_units_overweight_platelets:
    "Total number of discarded units by overweight/ underweight platelets due to processing problem",
  discarded_units_overweight_ffp:
    "Total number of discarded units by overweight/ underweight FFP due to processing problem",
  discarded_units_overweight_cryoprecipitate:
    "Total number of discarded units by overweight/ underweight cryoprecipitate due to processing problem",
  // / -------- ------------
  discarded_units_collection_problem:
    "Number of discarded units by overweight/ underweight due to collection problem",
  discarded_units_expired:
    "Number of discarded units by passed the expiry date",
  discarded_pnits_processing_problems:
    "Number of discarded units by processing problems / Lab Accident",
  discarded_units_reactive_ttis:
    "Number of discarded units by reactive for TTIs / Infectious Disease",
  discarded_units_hemolyzed: "Number of discarded units by Hemolyzed",
  discarded_units_clotted: "Number of discarded units by Clotted.",
  discarded_units_storage_problems:
    "Number of discarded units by storage problems",
  discarded_units_transportation_problems:
    "Number of discarded units by transportation problems",
  discarded_units_highod: " Number of discarded units by high OD",
  discarded_units_others: "Number of discarded units by others",

  requested_aplus_wb_crc:
    "Number of A+ve WB & CRC requested by Health facility",
  requested_bplus_wbCrc: "Number of B+ve WB & CRC requested by Health facility",
  requested_abplus_wb_crc:
    "Number of AB+ve WB & CRC requested by Health facility",
  requested_oplus_wb_crc:
    "Number of O+ve WB & CRC requested by Health facility",
  requested_aminus_wb_crc:
    "Number of A-ve WB & CRC requested by Health facility",
  requested_bminus_wb_crc:
    "Number of B-ve WB & CRC requested by Health facility.",
  requested_abminus_wb_crc:
    "Number of AB-ve WB & CRC requested by Health facility.",
  requested_ominus_wb_crc:
    "reNumber of O-ve WB & CRC requested by Health facility. quested_ominus_wb_crc",
  requested_ffp_units:
    "Total number of units of FFP requested by Health facility.",
  requested_platelets_units:
    "Total number of units of Platelets requested by Health facility.",

  distributed_aplus_wb_crc:
    "Number of A+ve WB & CRC distributed to Health facility",
  distributed_bplus_wb_crc:
    "Number of B+ve WB & CRC distributed to Health facility",
  distributed_abplus_wb_crc:
    "Number of AB+ve WB & CRC distributed to Health facility.",
  distributed_oplus_wb_crc:
    "Number of O+ve WB & CRC distributed to Health facility",
  distributed_aminus_wb_crc:
    "Number of A-ve WB & CRC distributed to Health facility.",
  distributed_bminus_wb_crc:
    "Number of B-ve WB & CRC distributed to Health facility",
  distributed_abminus_wb_crc:
    "Number of AB-ve WB & CRC distributed to Health facility",
  distributed_ominus_wb_crc:
    " Number of O-ve WB & CRC distributed to Health facility",
  distributed_ffp_units:
    "Total number of units of FFP distributed to Health facility.",
  distributed_platelets_units:
    "Total number of units of Platelets distributed to Health facility.",
  //  -----------------------------
  transferred_aplus_wb_crc:
    "Number of A+ve WB & CRC transferred to other blood banks",
  transferred_bplus_wb_crc:
    "Number of B+ve WB & CRC transferred to other blood banks",
  transferred_abplus_wb_crc:
    "Number of AB+ve WB & CRC transferred to other blood banks",
  transferred_oplus_wb_crc:
    "Number of O+ve WB & CRC transferred to other blood banks",
  transferred_aminus_wb_crc:
    "Number of A-ve WB & CRC transferred to other blood banks",
  transferred_bminus_wb_crc:
    "Number of B-ve WB & CRC transferred to other blood banks",
  transferred_abminus_wb_crc:
    "Number of AB-ve WB & CRC transferred to other blood banks",
  transferred_ominus_wb_crc:
    "Number of O-ve WB & CRC transferred to other blood banks",
  transferred_ffp_units:
    "Total number of units of FFP transferred to other blood banks",
  transferred_platelets_units:
    "Total number of units of Platelets transferred to other blood banks",
  health_facilities_performing_transfusion:
    "Total number of HFs (Health Facilities) that perform blood transfusion",
  health_facilities_with_htc: "Total number of HFs that have HTC",
  health_facilities_performing_clinical_audit:
    "Number of HFs that perform clinical audit.",
  male_patients_transfused: "Number of male patients transfused.",
  female_patients_transfused: "Number of female patients transfused.",
  patients_under5_transfused: "Number of patients transfused under 5 years",
  patients5_to14_transfused: "Number of patients transfused 5 to 14 years",
  patients15_to44_transfused: "Number of patients transfused 15 to 44 years",
  patients45_to59_transfused: "Number of patients transfused 45 to 59 years.",
  patients60_or_older_transfused:
    "Number of patients transfused 60 years or older.",
  whole_blood_transfused: "Number of units of whole blood transfused",
  redCells_transfused: "Number of units of Red cells transfused",
  platelets_transfused: "Number of units of Platelets transfused",
  ffp_transfused: "Number of units of FFP transfused",
  cryoprecipitate_transfused: "Number of units of cryoprecipitate transfused",
  immunological_hemolysis_abo_tncompatibility:
    "Number of immunological hemolysis due to ABO incompatibility",

  suspected_hemolysis_other_allo_antibody:
    "Number of SUSPECTED immunological hemolysis due to other allo-antibody",
  nonImmunological_hemolysis: "Number of non-immunological hemolysis",
  post_transfusion_purpura: "Number of post transfusion purpura",
  anaph_ylaxis_hypersensitivity: "Number of anaphylaxis / hypersensitivities",

  transfusion_related_lung_injury:
    "Number of transfusion-related acute lung injury (TRALI)",
  graft_versusHost_disease: "Number of grafts versus host disease",
  suspected_transfusion_associated_hiv:
    "Number of SUSPECTED transfusion-associated HIV-1/2 infection",
  suspected_transfusion_associated_hbv:
    "Number of SUSPECTED transfusion-associated HBV infection",
  suspected_transfusion_associated_hcv:
    "Number of SUSPECTED transfusion-associated HCV infection",
  suspected_sepsis_donor_unit:
    "Number of SUSPECTED sepsis due to bacterial contamination of the donor unit.",
  suspected_transfusion_associated_malaria:
    "Number of SUSPECTED transfusion-associated malaria infection",
  suspected_other_parasiticinfection:
    "Number of SUSPECTED other transfusionassociated parasitic infection",
  transfusion_associated_circulatory_overload:
    "Number of transfusion-associated circulatory overload",
  other_serious_atr: "Number of other serious ATR",

  hiv_elisa_kits_stock: "Number of HIV ELISA kit stock at hand",
  hbv_elisa_kits_stock: "Number of HBV ELISA kit stock at hand",
  hcv_elisa_kits_stock: "Number of HCV ELISA kit stock at hand",
  syphilis_elisa_kits_stock: "Number of Syphilis ELISA kit stock at hand",
  blood_bag350ml_stock: "Number of 350 ml Blood Bag stock at hand",
  blood_bag450ml_single_stock:
    "Number of 450 ml single Blood Bag stock at hand",
  blood_bag450ml_triple_stock:
    "Number of 450 ml triple Blood Bag stock at hand",
  transfusion_set_stock: "Number of transfusions set stock at hand.",
  elisa_kits_stock_out_days: "Number of Days stock out any ELISA kit",
  blood_bag_stock_out_days: "Number of Days stock out any Blood Bag",
};

const indicatorsInvert = {
  "Total number of blood donations": "total_blood_donations",
  "Total number of blood donations collected from family replacement":
    "familyr_eplacement_donations",
  "Number of blood donations collected from 1st time donors.":
    "first_time_donors",
  "Number of blood donations collected from repeat donors.": "repeat_donors",
  "Number of blood donations collected from Student.": "student_donors",
  "Number of blood donations collected from Government Employee.":
    "government_employee_donors",
  "Number of blood donations collected from Private Employee.":
    "private_employee_donors",
  "Number of blood donations collected from Selfemployed.":
    "self_employed_donors",
  "Number of blood donations collected from Unemployed": "unemployed_donors",
  "Number of blood donations collected from Others.": "other_donors",
  "Number of blood donations collected from Male donor": "male_donors",
  "Number of blood donations collected from Female donor": "female_donors",
  "Number of blood donations collected from donor under 18 years.":
    "under18_donors",
  "Number of blood donations collected from donor 18 - to- 24 years.":
    "age18to24_donors",
  "Number of blood donations collected from donor 25 - to- 34 years.":
    "age25to34_donors",
  "Number of blood donations collected from donor 35 - to- 44 years.":
    "age35to44_donors",
  "Number of blood donations collected from donor 45 - to- 54 years":
    "age45to54_donors",
  "Number of blood donations collected from donor 55 - to- 64 years.":
    "age55to64_donors",
  "Number of blood donations collected from donors 65 years or older.":
    "over65_donors",
  "Total number of apheresis donations collected.": "apheresis_donations",
  "Number of donations from center": "donations_fromCenter",
  "Number of donations from mobile": "donations_from_mobile",
  "Total number of Mobile Session conducted": "mobile_sessions_conducted",
  "Total Number of active blood donors Club": "active_blood_donor_clubs",
  "Total number of ADR Fainting occur": "adr_fainting",
  "Total number of ADR Fainting with loss of Consciousness":
    "adr_fainting_withLoss_of_consciousness",
  "Total number of ADR Loss of Consciousness with Seizure": "adr_seizure",
  "Total number of ADR due to technical problem": "adr_technical_problem",
  "Total number of Donor Refusal": "donor_refusals",
  "Total number of Others ADR": "other_adrs",
  "Number of blood donors who were permanently deferred due to TTIs result":
    "permanent_deferrals_dueToTtis",
  "Number of deferrals by low weight / Under weight": "deferrals_by_low_weight",
  "Number of deferrals by Age (under 18 or above 65)": "deferrals_by_age",
  "Number of deferrals by Pregnancy & Lactation":
    "deferrals_by_pregnancy_lactation",
  "Number of deferrals by blood pressure": "deferrals_by_blood_pressure",
  "Number of deferrals by low hemoglobin / Hematocrit":
    "deferrals_by_low_hemoglobin",
  "Number of deferrals by other medical condition / Diseases":
    "deferrals_by_other_medical_conditions",
  "Number of deferrals by high-risk behavior":
    "deferrals_by_high_risk_behavior",
  "Number of deferrals by travel history": "deferrals_by_travel_history",
  "Number of deferrals by other reason": "deferrals_by_other_reasons",
  "Is there a system of post donation counselling?":
    "post_donation_counselling_system",
  "Is there a system of referral for blood donors who positive for TTIs?":
    "referral_for_positive_ttis_donors",
  "Number of donors given pre-donation information.":
    "pre_donation_information_given",
  "Total number of donors presenting for pre-donation counselling.":
    "pre_donation_counselling",
  "Total number of donors receiving post-donation counselling service":
    "post_donation_counselling_service",
  "Number of donors receiving post-donation counselling service from Mobile site":
    "post_donation_counselling_from_mobile",
  "Number of donors receiving post-donation counselling service from Center.":
    "post_donation_counselling_from_center",
  "Number of Non-Reactive donors who receive PDC service.":
    "non_reactive_donors_receiving_pdc",
  "Number of Reactive donors who receive PDC service.":
    "reactive_donors_receiving_pdc",
  "Number of referred donors that was reactive and receive PDC service.":
    "referred_reactive_donors_receiving_pdc",
  "Total number of donations that were screened for TTIs":
    "donations_screened_for_ttis",
  "Total number of samples that were screened for TTIs in a quality-assured manner":
    "samples_screened_for_ttis",
  "Total number of samples that were screened for Blood Group":
    "samples_screened_for_blood_group",
  "Total number of samples that were screened for Blood Group in a quality-assured manner.":
    "samples_screened_for_blood_group_quality_assured",
  "Total number of TTIs positive": "ttis_positive",
  "Number of HIV positive": "hiv_positive",
  "Number of Hepatitis B positive": "hepatitis_b_positive",
  "Number of Hepatitis C positive": "hepatitis_c_positive",
  "Number of Syphilis positive": "syphilis_positive",
  "Total number of Donors positive for TTIS": "donors_positive_for_ttis",
  "Is there a system of processing for component production?":
    "component_processing_system",
  "Total number of whole blood donations separated into components":
    "whole_blood_separated_into_components",
  "Number of CRC units prepared": "crc_units_repared",
  "Number of Platelet prepared": "platelets_prepared",
  "Number of FFP prepared": "ffp_prepared",
  "Number of Cryoprecipitate prepared": "cryoprecipitate_prepared",
  "Total number of discarded units by overweight/ underweight CRC due to processing problem":
    "discarded_units_overweight_crc",
  "Total number of discarded units by overweight/ underweight platelets due to processing problem":
    "discarded_units_overweight_platelets",
  "Total number of discarded units by overweight/ underweight FFP due to processing problem":
    "discarded_units_overweight_ffp",
  "Total number of discarded units by overweight/ underweight cryoprecipitate due to processing problem":
    "discarded_units_overweight_cryoprecipitate",
  "Number of discarded units by overweight/ underweight due to collection problem":
    "discarded_units_collection_problem",
  "Number of discarded units by passed the expiry date":
    "discarded_units_expired",
  "Number of discarded units by processing problems / Lab Accident":
    "discarded_pnits_processing_problems",
  "Number of discarded units by reactive for TTIs / Infectious Disease":
    "discarded_units_reactive_ttis",
  "Number of discarded units by Hemolyzed": "discarded_units_hemolyzed",
  "Number of discarded units by Clotted.": "discarded_units_clotted",
  "Number of discarded units by storage problems":
    "discarded_units_storage_problems",
  "Number of discarded units by transportation problems":
    "discarded_units_transportation_problems",
  " Number of discarded units by high OD": "discarded_units_highod",
  "Number of discarded units by others": "discarded_units_others",
  "Number of A+ve WB & CRC requested by Health facility":
    "requested_aplus_wb_crc",
  "Number of B+ve WB & CRC requested by Health facility":
    "requested_bplus_wbCrc",
  "Number of AB+ve WB & CRC requested by Health facility":
    "requested_abplus_wb_crc",
  "Number of O+ve WB & CRC requested by Health facility":
    "requested_oplus_wb_crc",
  "Number of A-ve WB & CRC requested by Health facility":
    "requested_aminus_wb_crc",
  "Number of B-ve WB & CRC requested by Health facility.":
    "requested_bminus_wb_crc",
  "Number of AB-ve WB & CRC requested by Health facility.":
    "requested_abminus_wb_crc",
  "reNumber of O-ve WB & CRC requested by Health facility. quested_ominus_wb_crc":
    "requested_ominus_wb_crc",
  "Total number of units of FFP requested by Health facility.":
    "requested_ffp_units",
  "Total number of units of Platelets requested by Health facility.":
    "requested_platelets_units",
  "Number of A+ve WB & CRC distributed to Health facility":
    "distributed_aplus_wb_crc",
  "Number of B+ve WB & CRC distributed to Health facility":
    "distributed_bplus_wb_crc",
  "Number of AB+ve WB & CRC distributed to Health facility.":
    "distributed_abplus_wb_crc",
  "Number of O+ve WB & CRC distributed to Health facility":
    "distributed_oplus_wb_crc",
  "Number of A-ve WB & CRC distributed to Health facility.":
    "distributed_aminus_wb_crc",
  "Number of B-ve WB & CRC distributed to Health facility":
    "distributed_bminus_wb_crc",
  "Number of AB-ve WB & CRC distributed to Health facility":
    "distributed_abminus_wb_crc",
  " Number of O-ve WB & CRC distributed to Health facility":
    "distributed_ominus_wb_crc",
  "Total number of units of FFP distributed to Health facility.":
    "distributed_ffp_units",
  "Total number of units of Platelets distributed to Health facility.":
    "distributed_platelets_units",
  "Number of A+ve WB & CRC transferred to other blood banks":
    "transferred_aplus_wb_crc",
  "Number of B+ve WB & CRC transferred to other blood banks":
    "transferred_bplus_wb_crc",
  "Number of AB+ve WB & CRC transferred to other blood banks":
    "transferred_abplus_wb_crc",
  "Number of O+ve WB & CRC transferred to other blood banks":
    "transferred_oplus_wb_crc",
  "Number of A-ve WB & CRC transferred to other blood banks":
    "transferred_aminus_wb_crc",
  "Number of B-ve WB & CRC transferred to other blood banks":
    "transferred_bminus_wb_crc",
  "Number of AB-ve WB & CRC transferred to other blood banks":
    "transferred_abminus_wb_crc",
  "Number of O-ve WB & CRC transferred to other blood banks":
    "transferred_ominus_wb_crc",
  "Total number of units of FFP transferred to other blood banks":
    "transferred_ffp_units",
  "Total number of units of Platelets transferred to other blood banks":
    "transferred_platelets_units",
  "Total number of HFs (Health Facilities) that perform blood transfusion":
    "health_facilities_performing_transfusion",
  "Total number of HFs that have HTC": "health_facilities_with_htc",
  "Number of HFs that perform clinical audit.":
    "health_facilities_performing_clinical_audit",
  "Number of male patients transfused.": "male_patients_transfused",
  "Number of female patients transfused.": "female_patients_transfused",
  "Number of patients transfused under 5 years": "patients_under5_transfused",
  "Number of patients transfused 5 to 14 years": "patients5_to14_transfused",
  "Number of patients transfused 15 to 44 years": "patients15_to44_transfused",
  "Number of patients transfused 45 to 59 years.": "patients45_to59_transfused",
  "Number of patients transfused 60 years or older.":
    "patients60_or_older_transfused",
  "Number of units of whole blood transfused": "whole_blood_transfused",
  "Number of units of Red cells transfused": "redCells_transfused",
  "Number of units of Platelets transfused": "platelets_transfused",
  "Number of units of FFP transfused": "ffp_transfused",
  "Number of units of cryoprecipitate transfused": "cryoprecipitate_transfused",
  "Number of immunological hemolysis due to ABO incompatibility":
    "immunological_hemolysis_abo_tncompatibility",
  "Number of SUSPECTED immunological hemolysis due to other allo-antibody":
    "suspected_hemolysis_other_allo_antibody",
  "Number of non-immunological hemolysis": "nonImmunological_hemolysis",
  "Number of post transfusion purpura": "post_transfusion_purpura",
  "Number of anaphylaxis / hypersensitivities": "anaph_ylaxis_hypersensitivity",
  "Number of transfusion-related acute lung injury (TRALI)":
    "transfusion_related_lung_injury",
  "Number of grafts versus host disease": "graft_versusHost_disease",
  "Number of SUSPECTED transfusion-associated HIV-1/2 infection":
    "suspected_transfusion_associated_hiv",
  "Number of SUSPECTED transfusion-associated HBV infection":
    "suspected_transfusion_associated_hbv",
  "Number of SUSPECTED transfusion-associated HCV infection":
    "suspected_transfusion_associated_hcv",
  "Number of SUSPECTED sepsis due to bacterial contamination of the donor unit.":
    "suspected_sepsis_donor_unit",
  "Number of SUSPECTED transfusion-associated malaria infection":
    "suspected_transfusion_associated_malaria",
  "Number of SUSPECTED other transfusionassociated parasitic infection":
    "suspected_other_parasiticinfection",
  "Number of transfusion-associated circulatory overload":
    "transfusion_associated_circulatory_overload",
  "Number of other serious ATR": "other_serious_atr",
  "Number of HIV ELISA kit stock at hand": "hiv_elisa_kits_stock",
  "Number of HBV ELISA kit stock at hand": "hbv_elisa_kits_stock",
  "Number of HCV ELISA kit stock at hand": "hcv_elisa_kits_stock",
  "Number of Syphilis ELISA kit stock at hand": "syphilis_elisa_kits_stock",
  "Number of 350 ml Blood Bag stock at hand": "blood_bag350ml_stock",
  "Number of 450 ml single Blood Bag stock at hand":
    "blood_bag450ml_single_stock",
  "Number of 450 ml triple Blood Bag stock at hand":
    "blood_bag450ml_triple_stock",
  "Number of transfusions set stock at hand.": "transfusion_set_stock",
  "Number of Days stock out any ELISA kit": "elisa_kits_stock_out_days",
  "Number of Days stock out any Blood Bag": "blood_bag_stock_out_days",
};
export { indicators, indicatorsInvert };
