import React from "react";

function ArrowIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325.212-.175.063-.375.063Z" />
        </svg>
    );
}

export default function Hero({ profile }) {
    return (
        <section className="hero">
            <div className="hero-wrapper">
                <div className="intro-text">{profile.intro}</div>
                <div className="arrow-svg-wrapper">
                    <ArrowIcon />
                </div>

                <div className="hero-main">
                    <h1 className="hero-main-title">{profile.name}</h1>
                    <p className="hero-main-description">{profile.role}</p>
                </div>

                <div className="hero-second">
                    <p className="hero-second-subheading first-sub">{profile.brand}</p>
                    <p className="hero-second-subheading second-sub">{profile.label}</p>
                </div>
            </div>
        </section>
    );
}
