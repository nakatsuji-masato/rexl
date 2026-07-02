export const main : React.CSSProperties = {
    position: "fixed",
    background: "#fff",
    border: "solid 3px gray",
    borderRadius: 10,
    left: "50%",
    transform:"translateX(-50%)",
    width: "80%",
    top: 30,
    padding: 10,
};

export const close : React.CSSProperties = {
    fontWeight: "bold",
    cursor: "pointer",
    marginRight: 10,
    verticalAlign: "middle",
};

export const success : React.CSSProperties = {
    ...main,
    background: "#a7ffa7",
    color: "darkgreen",
    border: "solid 3px lightgreen",
};

export const alert : React.CSSProperties = {
    ...main,
    background: "#cc0000",
    color: "white",
    border: "solid 3px darkred",
};