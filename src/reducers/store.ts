import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// API
import { teamsAPI } from "../services/teams/teamsAPI";
import { accountsAPI } from "../services/accounts/accountsAPI";

// Slices
// here

const rootReducer = combineReducers({
    [teamsAPI.reducerPath]: teamsAPI.reducer,
    [accountsAPI.reducerPath]: accountsAPI.reducer,
});

const configStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            teamsAPI.middleware,
            accountsAPI.middleware
        ),
});

export { configStore };
export type RootState = ReturnType<typeof configStore.getState>; //to get states from slices
