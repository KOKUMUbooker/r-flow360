import type { SerializedError } from "@reduxjs/toolkit";
import { store } from "../store";
import type { ERROR_INFO, HttpErrorRes, } from "@/types";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { addMessage } from "@/store/error-slice";

export function logHandler(
    error: FetchBaseQueryError | SerializedError,
    type?: ERROR_INFO,
) {
    let message = "An unknown error occurred";
    const { dispatch } = store;

    // Suppress these errors since they are a result of cancellation attempts on asynchronous processes
    if ("error" in error && error.error.includes("AbortError")) return;

    if ("status" in error) {
        switch (error.status) {
            case "FETCH_ERROR":
                message = "Please check your internet connection and try again";
                break;
            case "PARSING_ERROR":
                message =
                    "Our server is experiencing some issues at the moment. Please try again later.";
                break;
            case "TIMEOUT_ERROR":
                message = "Response took too long, Please try again later";
                break;
            case "CUSTOM_ERROR":
                break;
            default:
                // server side errors
                const serverError = error?.data as HttpErrorRes;

                message = serverError?.error?.message || "Something went wrong";
                console.error(error);
        }

        dispatch(addMessage({ text: message, type, loaded: false }));
    } else {
        // SerializedError(If an unexpected error is thrown by user code rather than a handled error, that error will be transformed into a SerializedError shape)
        console.error("SERIALIZED ERROR", JSON.stringify(error));
        dispatch(
            addMessage({
                text: error.message || "Something went wrong, Please try again later",
                type,
                loaded: false,
            }),
        );
    }
}