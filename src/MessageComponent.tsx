import { JSX } from "react/jsx-runtime";
import { ReactInterface } from "./Basic";
import { main, close } from "./css/message";
import { MessageOptions } from "./Message";
import { DialogOptions } from "./Dialog";
import { RexlNotificationOptions } from "./Notification";

export let msgOpenEvent: (Type: Type, message: string | JSX.Element, options?: MessageOptions | DialogOptions | RexlNotificationOptions) => string;
export let msgCloseEvent: (key: string) => void;

export enum Type {
    Message,
    Dialog,
    Notification,
}

export const MessageComponent = (props: { react: ReactInterface }) => {

    // @ts-ignore
    const [msgBuff, setMsgBuff] = props.react.useState<{ [key: string]: JSX.Element }>({});

    const makeMessage = (type: Type, message: string | JSX.Element, key: string, options?: MessageOptions | DialogOptions | RexlNotificationOptions) => {

        if (type === Type.Message) {
            const options_ = options as MessageOptions;
            let thema = main;
            let className = "";
            if (options_) {
                if (options_.className) className = options_.className;
                if (options_.thema) {
                    thema = {
                        ...thema,
                        ...options_.thema,
                    };
                }
            }

            return {
                [key]: (
                    <div style={thema} className={className}>
                        <span
                            style={close}
                            onClick={() => {
                                msgCloseEvent(key);
                            }}
                        >✕</span>
                        {message}
                    </div>
                )
            };
        }
        else if (type === Type.Dialog) {
            const options_ = options as DialogOptions;
            return {
                [key]: (
                    <div style={options_.style!.base}>
                        <div style={options_.style!.window}>
                            {message}
                        </div>
                    </div>
                ),
            };
        }
        else if (type === Type.Notification) {
            const options_ = options as RexlNotificationOptions;
            return {
                [key]: (
                    <div style={options_.style!.thema}>
                        {message}
                    </div>
                )
            };
        }
    };

    msgOpenEvent = (type: Type, message: string | JSX.Element, options?: MessageOptions | DialogOptions | RexlNotificationOptions) => {
        const key = Math.random().toString();
        const newMsg = makeMessage(type, message, key, options);
        // @ts-ignore
        setMsgBuff({
            ...msgBuff,
            ...newMsg,
        });

        if (type === Type.Message || type === Type.Notification) {
            if (options) {
                if ((options as MessageOptions).timeout) {
                    setTimeout(()=>{
                        msgCloseEvent(key);
                    }, (options as MessageOptions).timeout);
                }
            }
        }

        return key;
    };

    msgCloseEvent = (key: string) => {
        // @ts-ignore
        setMsgBuff((prevUser) => {
            const newUser = { ...prevUser };
            delete newUser[key];
            return newUser;
        });
    };

    return (
        <>
            {Object.keys(msgBuff).map(key => {
                const val = msgBuff[key];
                return (
                    <div key={key}>{val}</div>
                );
            })}
        </>
    );
};