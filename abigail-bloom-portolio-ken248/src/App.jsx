import React from "react";
import CursorAura from "./components/CursorAura.jsx";
import Hero from "./components/Hero.jsx";
import Preloader from "./components/Preloader.jsx";
import Section from "./components/Section.jsx";
import ThankYouClouds from "./components/ThankYouClouds.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { profile, sections } from "./data/portfolio.js";

export default function App() {
    return (
        <>
            <div className="ambient-background" aria-hidden="true"></div>
            <div className="noise-overlay" aria-hidden="true"></div>
            <CursorAura />
            <ThankYouClouds />

            <div className="experience">
                <canvas className="experience-canvas"></canvas>
            </div>

            <Preloader />

            <div className="page" asscroll-container="">
                <ThemeToggle />

                <div className="page-wrapper" asscroll="">
                    <Hero profile={profile} />
                    {sections.map((section) => (
                        <Section section={section} key={section.id} />
                    ))}
                </div>
            </div>
        </>
    );
}
