export type ERROR_INFO = "error" | "info" | "success";
export interface MESSAGE_TYPE {
    text: string;
    type?: ERROR_INFO;
    /** To specify whether the message has been loaded onto the screen or not */
    loaded: boolean;
}

export interface HttpErrorResData {
    /** The error message @type {string} */
    message: string;
    /** Specifies if the message is targeted for end-users or developers. Defaults to undefined i.e. developers. */
    isUserError?: boolean;
}

export interface HttpErrorRes {
    error: HttpErrorResData;
}
