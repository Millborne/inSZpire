import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// API
import { teamsAPI } from "../services/teams/list/teamsAPI";
import { accountsAPI } from "../services/settings/accounts/list/accountsAPI";
import { tagsAPI } from "../services/settings/tags/list/tagsAPI";
import { positionsAPI } from "../services/settings/positions/list/positionsAPI";
import { jobTitleAPI } from "../services/settings/job-title/list/jobTitleAPI";
import { employeeAPI } from "../services/employee/list/employeeAPI";
import { employeeCreateAPI } from "../services/employee/create/employeeCreateAPI";
import { summaryAPI } from "../services/employee-profile/summary/summaryAPI";
import { basicInfoAPI } from "../services/employee-profile/personal/basic-info/basicInfoAPI";
import { educationAPI } from "../services/employee-profile/personal/education/educationAPI";
import { familyAPI } from "../services/employee-profile/personal/family/familyAPI";
import { contactAPI } from "../services/employee-profile/personal/contact/contactAPI";
import { idsAPI } from "../services/employee-profile/personal/ids/idsAPI";
import { employeeDetailsAPI } from "../services/employee-profile/work/employee-details/employeeDetailsAPI";
import { teamMemberAPI } from "../services/employee-profile/work/team-member/teamMemberAPI";
import { employeeHistoryAPI } from "../services/employee-profile/work/employee-history/employeeHistoryAPI";
import { personalDocumentsAPI } from "../services/employee-profile/work/documents/personal/personalDocumentsAPI";
import { positionTypeAPI } from "../services/settings/positions/type/positionTypeAPI";
import { workSetupAPI } from "../services/settings/work-setup/list/workSetupAPI";
import { locationsAPI } from "../services/locations-options/locationsAPI";
import { religionAPI } from "../services/employee-profile/personal/basic-info/religionAPI"; 

// Slices
import employeeReducer from "./employeeSlice";

const rootReducer = combineReducers({
    // Slices
    employeeState: employeeReducer,

    // API Reducers
    [teamsAPI.reducerPath]: teamsAPI.reducer,
    [accountsAPI.reducerPath]: accountsAPI.reducer,
    [tagsAPI.reducerPath]: tagsAPI.reducer,
    [positionsAPI.reducerPath]: positionsAPI.reducer,
    [jobTitleAPI.reducerPath]: jobTitleAPI.reducer,
    [employeeAPI.reducerPath]: employeeAPI.reducer,
    [employeeCreateAPI.reducerPath]: employeeCreateAPI.reducer,
    [summaryAPI.reducerPath]: summaryAPI.reducer,
    [basicInfoAPI.reducerPath]: basicInfoAPI.reducer,
    [educationAPI.reducerPath]: educationAPI.reducer,
    [familyAPI.reducerPath]: familyAPI.reducer,
    [contactAPI.reducerPath]: contactAPI.reducer,
    [idsAPI.reducerPath]: idsAPI.reducer,
    [employeeDetailsAPI.reducerPath]: employeeDetailsAPI.reducer,
    [teamMemberAPI.reducerPath]: teamMemberAPI.reducer,
    [employeeHistoryAPI.reducerPath]: employeeHistoryAPI.reducer,
    [personalDocumentsAPI.reducerPath]: personalDocumentsAPI.reducer,
    [positionTypeAPI.reducerPath]: positionTypeAPI.reducer,
    [workSetupAPI.reducerPath]: workSetupAPI.reducer,
    [locationsAPI.reducerPath]: locationsAPI.reducer,
    [religionAPI.reducerPath]: religionAPI.reducer,
});

const configStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            teamsAPI.middleware,
            accountsAPI.middleware,
            tagsAPI.middleware,
            positionsAPI.middleware,
            jobTitleAPI.middleware,
            employeeAPI.middleware,
            employeeCreateAPI.middleware,
            summaryAPI.middleware,
            basicInfoAPI.middleware,
            educationAPI.middleware,
            familyAPI.middleware,
            contactAPI.middleware,
            idsAPI.middleware,
            employeeDetailsAPI.middleware,
            teamMemberAPI.middleware,
            employeeHistoryAPI.middleware,
            personalDocumentsAPI.middleware,
            positionTypeAPI.middleware,
            workSetupAPI.middleware,
            locationsAPI.middleware,
            religionAPI.middleware
        ),
});

export { configStore };
export type RootState = ReturnType<typeof configStore.getState>; //to get states from slices
