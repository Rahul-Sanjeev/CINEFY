// Loader.js
import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = ({ size = 30, color = "#2663EB" }) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ClipLoader size={size} color={color} />
        </div>
    );
};

export default Loader;