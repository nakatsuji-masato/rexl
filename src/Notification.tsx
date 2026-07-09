import { JSX } from "react/jsx-runtime";
import { msgOpenEvent, Type } from "./MessageComponent";
import * as notificationCss from "./css/notification";

export interface RexlNotificationOptions {
    style?: {
        thema?: React.CSSProperties,
    },
    timeout?: number,
}

export const openNotification = (message: string | JSX.Element, options?: RexlNotificationOptions) => {
    if (!options) options = {};
    if (!options.style) options.style = {};
    if (!options.style.thema) options.style!.thema = notificationCss.thema;
    msgOpenEvent(Type.Notification, message, options);
};