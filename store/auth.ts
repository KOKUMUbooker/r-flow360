import { User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: User | null = null;

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
});

export const userSliceReducer = userSlice.reducer;