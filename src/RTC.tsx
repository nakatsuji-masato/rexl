import { JSX } from "react/jsx-runtime";

export interface IRoutes {
    [name: string] : RTC | IRoutes,
}

export class RTC {

    private path: string = "";

    private element: (() => React.JSX.Element);

    public constructor(path: string, element: () => React.JSX.Element) {
        this.path = path;
        this.element = element;
    }

    public getPath() {
        return this.path;
    }
    public getELement() {
        return this.element;
    }
}

let routeBufferList : Array<RTC> = [];
let errorPageElement : null |(() => JSX.Element) = null;

export const getRoutes = () : Array<RTC> => {
    return routeBufferList;
};

export const clearRoute = () => {
    routeBufferList = [];
};

export const developRoute = (value: IRoutes, baseKey?: string) => {
    for(const key in value){
        const val = value[key];
        if (val instanceof RTC){
            routeBufferList.push(val);
        }
        else {
            developRoute(val, baseKey + key);
        }
    }
};

export const setErrorPageELement = (element : () => JSX.Element) => {
    errorPageElement = element;
};

export const getErrorPageELement = () => {
    return errorPageElement;
};