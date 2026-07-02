import { JSX } from "react/jsx-runtime";
import { clearRoute, developRoute, IRoutes, RTC, setErrorPageELement } from "./RTC";

/**
 * RTC
 * @param {string} path URL
 * @param {() => JSX.Element} element Page Element
 * @returns 
 */
export const Rtc = (path: string, element: () => React.JSX.Element) => {
    return new RTC(path, element);
};

export const setRoutes = (value : IRoutes) => {
    clearRoute();
    developRoute(value);
};

export const setErrorPage = (element : () => JSX.Element) => {
    setErrorPageELement(element);
};