import { JSX } from "react/jsx-runtime";
import { ReactInterface } from "./Basic";
import { main, close } from "./css/message";
import { MessageOptions } from "./Message";

export let msgOpenEvent: (message: string | JSX.Element, options?: MessageOptions) => string;
export let msgCloseEvent: (key: string) => void;

export const MessageComponent = (props: { react: ReactInterface }) => {

    // @ts-ignore
    const [msgBuff, setMsgBuff] = props.react.useState<{ [key: string]: JSX.Element }>({});

    const makeMessage = (message: string | JSX.Element, key: string, options?: MessageOptions) => {

        let thema = main;
        let className = "";
        if (options) {
            if (options.thema) {
                thema = {
                    ...thema,
                    ...options.thema,
                };
            }
            if (options.className) className = options.className;
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
    };

    msgOpenEvent = (message: string | JSX.Element, options?: MessageOptions) => {
        console.log("msg open event");
        const key = Math.random().toString();
        console.log("key=" + key);
        const newMsg = makeMessage(message, key, options);
        // @ts-ignore
        setMsgBuff({
            ...msgBuff,
            ...newMsg,
        });

        if (options) {
            if (options.timeout) {
                setTimeout(()=>{
                    msgCloseEvent(key);
                }, options.timeout);
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