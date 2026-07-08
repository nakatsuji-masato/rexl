import { RTC } from "./RTC";

interface ILInk extends React.HTMLAttributes<HTMLAnchorElement>{
    to: RTC | string,
    params?: {[name: string]: string | number}
}

export const Link = (props: ILInk) => {

    let hash;
    if (props.to instanceof RTC) {
        hash = "#" + props.to.getPath();
    }
    else {
        hash = "#" + props.to;
    }

    if (props.params) {
        const queryList = [];
        const c = Object.keys(props.params);
        for(let n = 0 ; n < c.length ; n++){
            const key = c[n];
            const value = props.params[key];
            hash = hash.replaceAll(":" + key, value.toString());
            hash = hash.replaceAll(":" + key + "?", value.toString());
        }
    }

    return (
        <a 
        href={hash}
        {...props} 
        />
    );
};