import React from "react";

export default function ProgressBar({ side, accent }) {
    const wrapperClass =
        side === "right" ? "progress-bar-wrapper-right" : "progress-bar-wrapper-left";
    const accentClass = accent ? `${accent}-background` : "";

    return (
        <div className={`progress-wrapper ${wrapperClass}`}>
            <div className={`progress-bar ${accentClass}`}></div>
        </div>
    );
}
