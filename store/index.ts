import { postsApi } from "@/api";
import { configureStore } from "@reduxjs/toolkit";
import { errorReducer } from "./error-slice";
import { userSliceReducer } from "./auth

const store = configureStore({
    reducer: {
        user: userSliceReducer,
        error: errorReducer,
        [postsApi.reducerPath]: postsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(postsApi.middleware);
    },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;