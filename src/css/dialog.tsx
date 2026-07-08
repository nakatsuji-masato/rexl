export const base : React.CSSProperties = {
    position: "fixed",
    background: "rgba(0,0,0,0.8)",
    width: "100%",
    height: "100%",
    left :0,
    top: 0,
};

export const window : React.CSSProperties = {
    position: "fixed",
    background: "#fff",
    boxShadow: "w: 0 0 5px white",
    left: "50%",
    top: "50%",
    transform:"translateX(-50%) translateY(-50%)",
};

export const wk : React.CSSProperties = {
    display: "table",
    width: "100%",
    height: "100%",
};

export const tr : React.CSSProperties = {
    display: "table-row",    
};

export const head : React.CSSProperties = {
    display: "table-cell",
    fontWeight:"bold",
    padding:"10px 15px",
    height:0,
};

export const main : React.CSSProperties = {
    display:"table-cell",
    padding:"10px 15px",
    height:"100%",
};

export const foot : React.CSSProperties = {
    display:"table-cell",
    padding:"10px 15px",
    height:0,
    textAlign: "right",
    marginTop: 10,
};

export const okStyle : React.CSSProperties = {
    color: "darkblue",
    cursor: "pointer",
    display: "inline-block",
    marginLeft:10,
};
export const ngStyle : React.CSSProperties = {
    color: "darkblue",
    cursor: "pointer",
    display: "inline-block",
};
