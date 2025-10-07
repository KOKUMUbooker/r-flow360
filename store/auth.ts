import { User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: User | undefined = undefined;

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
});

export const userSliceReducer = userSlice.reducer;