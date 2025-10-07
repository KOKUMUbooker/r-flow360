import { configureStore } from "@reduxjs/toolkit";
import { errorReducer } from "./log-slice";
import { userSliceReducer } from "./auth"

const store = configureStore({
    reducer: {
        user: userSliceReducer,
        error: errorReducer,
    },
    // middleware: (getDefaultMiddleware) => {
    //     return getDefaultMiddleware().concat(postsApi.middleware);
    // },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;