import { JSX } from "react/jsx-runtime";
import { msgCloseEvent, msgOpenEvent, Type } from "./MessageComponent";
import * as dialogCss from "./css/dialog";

export interface DialogOptions {

    style?: {

        base?: React.CSSProperties,

        window?: React.CSSProperties,

        head?: React.CSSProperties,

        main?: React.CSSProperties,

        foot?: React.CSSProperties,
    },

    className? :{

        base?: string,

        window?: string,

        head?: string,

        main?: string,

        foot?: string,
    },

    id?: {
        base?: string,

        window?: string,

        head?: string,

        main?: string,

        foot?: string,
    },

    body?: {

        head?: string | JSX.Element,

        foot?: string | JSX.Element,
    },
}

export interface AlertDialogOptions extends DialogOptions {

    okText?: string | JSX.Element,

    okStyle?: React.CSSProperties,
}

export interface ConfirmDialogOptions extends DialogOptions {

    okText?: string | JSX.Element,

    okStyle?: React.CSSProperties,

    ngText?: string | JSX.Element,

    ngStyle?: React.CSSProperties,
}

export const closeDialog = (key: string) => {
    msgCloseEvent(key);
};

const margeObj = (t: any, m: any) => {
    if (!t) t = {};
    if (!m) m = {};
    return {
        ...t,
        ...m,
    };
};

export const openDialog = (message: string | JSX.Element, options?: DialogOptions) => {
    
    if (!options) options = {};
    if (!options.style) options.style = {};
    if (!options.className) options.className = {};
    if (!options.id) options.id = {};
    if (!options.body) options.body = {};
    options.style.window = margeObj(options.style.window, dialogCss.window);
    options.style.base = margeObj(options.style.base, dialogCss.base);
    options.style.main = margeObj(options.style.main, dialogCss.main);
    options.style.head = margeObj(options.style.head, dialogCss.head);
    options.style.foot = margeObj(options.style.foot, dialogCss.foot);
        
    const messageBody = (
        <>
            <div style={dialogCss.wk}>
                {options.body!.head ?
                    <div style={dialogCss.tr}>
                        <div 
                        style={options.style!.head}
                        className={options.className!.head} 
                        id={options.id!.head}
                        >{options.body!.head}</div>
                    </div>
                : ""}
                <div style={dialogCss.tr}>
                    <div 
                    style={options.style!.main}
                    className={options.className!.main} 
                    id={options.id!.main}
                    >{message}</div>
                </div>
                {options.body!.foot ?
                <div style={dialogCss.tr}>
                    <div 
                    style={options.style!.foot}
                    className={options.className!.foot} 
                    id={options.id!.foot}
                    >{options.body!.foot}</div>
                </div>
                : ""}
            </div>
        </>
    );
    return msgOpenEvent(Type.Dialog, messageBody, options);
};

export const openDialogAlert = (message: string, options?: AlertDialogOptions) => {

    return new Promise((resolve)=>{
        let k : string = "";
        if (!options) options = {};
        if (!options.okText) options.okText = "OK";
        options.okStyle = margeObj(options.okStyle, dialogCss.okStyle);
        if (!options.body) options.body = {};
        if (!options.body.foot) {
            options.body!.foot = (
                <>
                    <a 
                        style={options!.okStyle}
                            onClick={()=>{
                            closeDialog(k);
                            resolve(false);
                            return false;
                        }}>{options!.okText}</a>
                </>
            );
        }
        k = openDialog(message, options);
    });
};

export const openConfirm = (message: string, options?: ConfirmDialogOptions) => {

    return new Promise((resolve)=>{
        let k : string = "";
        if (!options) options = {};
        if (!options.okText) options.okText = "OK";
        if (!options.ngText) options.ngText = "Cancel";
        options.okStyle = margeObj(options.okStyle, dialogCss.okStyle);
        options.ngStyle = margeObj(options.ngStyle, dialogCss.ngStyle);
        if (!options.body) options.body = {};
        if (!options.body.foot) {
            options.body!.foot = (
                <>
                    <a 
                        style={options!.ngStyle}
                            onClick={()=>{
                                closeDialog(k);
                                resolve(false);
                                return false;
                            }}>{options!.ngText}</a>               
                            <a 
                            style={options!.okStyle}
                            onClick={()=>{
                                closeDialog(k);
                                resolve(true);
                                return false;
                            }}>{options!.okText}
                    </a>
                </>
            );
        }
        k = openDialog(message, options);
    });
};

