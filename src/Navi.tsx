import { getQuery, getURLParams } from "./HashQuery";
import { RTC } from "./RTC";

export const Navi = {

    /**
     * Next Page
     * @param {RTC | string} next
     */
    next: (next: RTC | string, params?: {[name: string]: string | number}) => {
        if (next instanceof RTC) {
            next = next.getPath(params);
        }
        window.location.hash = next;
    },

    /**
     * back
     */
    back: () => {
        history.back();
    },

    /**
     * Get Query Parameter
     * @returns
     */
    query: () => {
        return getQuery();
    },

    /**
     * Get URL Params
     * @returns 
     */
    params: () => {
        return getURLParams();
    },
};
