import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// API
import { teamsAPI } from "../services/teams/teamsAPI";

// Slices
// here

const rootReducer = combineReducers({
    [teamsAPI.reducerPath]: teamsAPI.reducer,
});

const configStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            teamsAPI.middleware
        ),
});

export { configStore };
export type RootState = ReturnType<typeof configStore.getState>; //to get states from slices
