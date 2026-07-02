import { RTC } from "./RTC";

interface ILInk extends React.HTMLAttributes<HTMLAnchorElement>{
    to: RTC | string,
}

export const Link = (props: ILInk) => {

    let hash;
    if (props.to instanceof RTC) {
        hash = "#" + props.to.getPath();
    }
    else {
        hash = "#" + props.to;
    }

    return (
        <a 
        href={hash}
        {...props} 
        />
    );
};