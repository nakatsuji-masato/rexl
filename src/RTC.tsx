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

    public getPath(params?: {[name: string]: string | number}) {
        let path = this.path;
        if (params) {
            const c = Object.keys(params);
            for(let n = 0 ; n < c.length ; n++) {
                const name = c[n];
                const value = params[name];
                path = path.replaceAll(":" + name, value.toString());
                path = path.replaceAll(":" + name + "?", value.toString());
            }
        }
        return path;
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