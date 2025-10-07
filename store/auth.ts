import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { user: User | null } = { user: null };

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        logOutUser: (state) => {
            state.user = null;
        },
    },
});

export const { logOutUser, setAuthState } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;