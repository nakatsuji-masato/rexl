import { JSX } from "react/jsx-runtime";
import { getErrorPageELement, getRoutes, RTC } from "./RTC";

interface Query {
    [name: string]: any
}
interface URLParams {
    [name: string]: any
}

let hash : string | null = null;
let query : Query | null = null;
let params : URLParams | null = null;

export const getQuery = () => {
    return query ? query : {};
};
export const getURLParams = () => {
    return params ? params : {};
};

const convQuery = (url: string) => {
    const urls = url.split("&");
    const res: { [name: string]: any } = {};
    for (let i = 0; i < urls.length; i++) {
        const qs = urls[i].split("=");
        if (qs.length == 2) {
            res[qs[0].trim()] = qs[1].trim();
        }
    }
    return res;
};
export const getHash = () : { hash: string | null, query: Query | null} => {
    return { 
        hash, 
        query 
    };
};
export const setHash = () => {
    const hashFullUrl = location.hash.split("#").join("");
    const hashQueries = hashFullUrl.split("?");
    hash = hashQueries[0].trim();
    if (!hash) hash = "/";
    if (hashQueries.length > 1) {
        query = convQuery(hashQueries[1]);
    }
    else {
        query = null;
    }

    const [ pageUrl, params_ ] = searchPage();
    params = params_;

    return pageUrl;
};
export const getElement = (pageUrl: string) => {

    if (!pageUrl) {
        let err = getErrorPageELement();
        if (!err) {
            err = () =>{ return (<div>NOT FOUND Page.</div>) };
        }
        return err;
    }

    const routes = getRoutes();
    for(let n = 0 ; n < routes.length ; n++) {
        const route = routes[n];
        if (route.getPath() === pageUrl) return route.getELement();
    }

    return ()=>{ return (<></>) };
};
export const searchPage = () : [ string | null, URLParams ] => {
    const routes = getRoutes();
    let decision = null;
    let matrixA : {[path: string] : Array<boolean>}= {};
    let matrixB : {[path: string] : Array<boolean>}= {};
    let params : URLParams = {};
    for(let i = 0; i < routes.length; i++) {
        const rtc = routes[i];
        const rtcPath = rtc.getPath();
        if (hash === rtc.getPath()) {
            decision = rtc.getPath();
            break;
        }
            matrixA[rtcPath] = [];
            matrixB[rtcPath] = [];

            const urls = hash?.split("/");
            urls?.shift();
            const turls = rtc.getPath().split("/");
            turls.shift();
            /*
            console.log({
                urls,
                turls,
            });
            */
            for(let n = 0 ; n < turls.length ; n++) {
                const t = turls[n];
                const u = urls![n];
                if (t === u) {
                    matrixA[rtcPath].push(true);
                }
                else {
                    if (t.indexOf(":") > -1) {
                        if (t.indexOf("?") > -1) {
                            matrixA[rtcPath].push(true);
                            if (u) {
                                params[t.split(":")[1].trim()] = t;
                            }
                        }
                        else {
                            if (u) {
                                matrixA[rtcPath].push(true);
                                params[t.split(":")[1].trim()] = u;
                            }
                            else {
                                matrixA[rtcPath].push(false);
                            }
                        }
                    }
                    else {
                        matrixA[rtcPath].push(false);
                    }
                }
            }
            for(let n2 = 0 ; n2 < urls!.length ; n2++) {
                const t = turls[n2] ? turls[n2] : "";
                const u = urls![n2];
                if (t === u) {
                    matrixB[rtcPath].push(true);
                }
                else {
                    if (t.indexOf(":") > -1) {
                        if (t.indexOf("?") > -1) {
                            matrixB[rtcPath].push(true);
                            if (u) {
                                params[t.split(":")[1].trim()] = t;
                            }
                        }
                        else {
                            if (u) {
                                matrixB[rtcPath].push(true);
                                params[t.split(":")[1].trim()] = u;
                            }
                            else {
                                matrixB[rtcPath].push(false);
                            }
                        }
                    }
                    else {
                        matrixB[rtcPath].push(false);
                    }
                }                
            }
    }
    const c = Object.keys(matrixA);
    for(let n = 0 ; n < c.length ; n++) {
        const key = c[n];
        let flg = true;
        for(let i1 = 0 ; i1 < matrixA[key].length ; i1++) {
            if (matrixA[key][i1] === false) flg = false;
        }
        for(let i1 = 0 ; i1 < matrixB[key].length ; i1++) {
            if (matrixB[key][i1] === false) flg = false;
        }

        if (flg) {
            decision = key;
        }
    }
    /*
    console.log(matrixA);
    console.log(matrixB);
    console.log({
        decision,
    })
    console.log(params);
    */
    return [ decision, params ];
};