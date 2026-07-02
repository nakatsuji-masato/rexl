import { JSX } from "react/jsx-runtime";
import { alert, success } from "./css/message";
import { msgCloseEvent, msgOpenEvent } from "./MessageComponent";

export interface MessageOptions {

    timeout?: number,

    thema?: React.CSSProperties,

    className?: string,

    id?: string,
}

/**
 * Open Message
 * @param message
 * @param options 
 */
export const openMessage = (message: string | JSX.Element, options?: MessageOptions) => {
    msgOpenEvent(message, options);
};

export const closeMessage = (key: string) => {
    msgCloseEvent(key);
};

export const openSuccess = (message: string | JSX.Element, options?: MessageOptions) => {
    if (!options) options = {};
    options.thema = success;
    msgOpenEvent(message, options);
};

export const openAlert = (message: string | JSX.Element, options?: MessageOptions) => {
    if (!options) options = {};
    options.thema = alert;
    msgOpenEvent(message, options);
};