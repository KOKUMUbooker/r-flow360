import { propertiesApi } from "@/rtk-apis";
import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "./auth";
import { logReducer } from "./log-slice";

const store = configureStore({
    reducer: {
        log: logReducer,
        user: userSliceReducer,
        [propertiesApi.reducerPath]: propertiesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(propertiesApi.middleware);
    },
});

export { store };
export type ReduxStoreSt = ReturnType<typeof store.getState>;