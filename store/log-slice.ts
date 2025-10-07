import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import type { MESSAGE_TYPE } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: { message: MESSAGE_TYPE[] } = { message: [] };

const logSlice = createSlice({
    name: "log",
    initialState,
    reducers: {
        addMessage(state, action: PayloadAction<MESSAGE_TYPE>) {
            const isMessagePresent = state.message.some(
                (msg) => msg.text === action.payload.text,
            );
            if (!isMessagePresent) {
                state.message.push({
                    ...action.payload,
                    type: action.payload.type || "error",
                    loaded: false,
                });
            }
        },
        updateLogLoadStates(state, action: PayloadAction<string[]>) {
            const msgsMap = new Map<string, string>();
            action.payload.forEach((msg) => msgsMap.set(msg, msg));
            state.message.forEach((err) => {
                if (msgsMap.has(err.text) && !err.loaded) err.loaded = true;
            });
        },
        clearMessage(state, action: PayloadAction<{ text: string }>) {
            const { text } = action.payload;
            const targetMsgIdx = state.message.findIndex((err) => err.text === text);
            if (targetMsgIdx >= 0) state.message.splice(targetMsgIdx, 1);
        },
    },
});

const selectError = (state: RootState) => state.error;

export function getErrorMessages() {
    return createSelector([selectError], (errorObject) => errorObject.message);
}

export function getUnloadedErrorMessages() {
    return createSelector([selectError], (errorObject) =>
        errorObject.message.filter((msg: MESSAGE_TYPE) => !msg.loaded),
    );
}

export const { clearMessage, addMessage, updateLogLoadStates } =
    logSlice.actions;
export const errorReducer = logSlice.reducer;