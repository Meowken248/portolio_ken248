import React from "react";

export default function Preloader() {
    return (
        <div className="preloader" aria-label="Loading portfolio">
            <div className="preloader-wrapper">
                <div className="loading">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div>
            </div>
        </div>
    );
}
