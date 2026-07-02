import { JSX } from "react/jsx-runtime";
import { getElement, setHash } from "./HashQuery";
import { MessageComponent } from "./MessageComponent";
import { Dispatch, SetStateAction } from "react";

export interface ReactInterface { 
    useState: <T>() => [T, Dispatch<SetStateAction<T | undefined>>],
    useEffect: (callback: ()=>void, args: Array<any>) => void,
}

export let React : ReactInterface;

let nowPageElement : (() => JSX.Element) | undefined;

export const Basic = (props : { react: ReactInterface}) => {
    React = props.react;

    const [ pageUrl, setPageUrl ] = props.react.useState<string | null>();

    props.react.useEffect(()=>{
        window.addEventListener("hashchange", () => {
            setPageUrl(setHash());
        });
        setPageUrl(setHash());
    }, []);

    const Component = getElement(pageUrl!);
    
    return (
        <>
            <Component />
            <><MessageComponent react={props.react} /></>
        </>
    );
};