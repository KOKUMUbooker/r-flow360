import { configureStore } from "@reduxjs/toolkit";
import { logReducer } from "./log-slice";
import { userSliceReducer } from "./auth"

const store = configureStore({
    reducer: {
        user: userSliceReducer,
        log: logReducer,
    },
    // middleware: (getDefaultMiddleware) => {
    //     return getDefaultMiddleware().concat(postsApi.middleware);
    // },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;