import { JSX } from "react/jsx-runtime";
import { alert, success } from "./css/message";
import { msgCloseEvent, msgOpenEvent, Type } from "./MessageComponent";

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
    return msgOpenEvent(Type.Message, message, options);
};

export const closeMessage = (key: string) => {
    msgCloseEvent(key);
};

export const openSuccess = (message: string | JSX.Element, options?: MessageOptions) => {
    if (!options) options = {};
    options.thema = success;
    return msgOpenEvent(Type.Message, message, options);
};

export const openAlert = (message: string | JSX.Element, options?: MessageOptions) => {
    if (!options) options = {};
    options.thema = alert;
    return msgOpenEvent(Type.Message, message, options);
};