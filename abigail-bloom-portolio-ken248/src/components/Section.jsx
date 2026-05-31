import React from "react";
import ContactList from "./ContactList.jsx";
import ProgressBar from "./ProgressBar.jsx";
import WorkList from "./WorkList.jsx";

export default function Section({ section }) {
    const accentText = section.accent ? `${section.accent}-text` : "";
    const accentBorder = section.accent ? `${section.accent}-border` : "";
    const accentBackground = section.accent ? `${section.accent}-background` : "";
    const sectionClass = `${section.id === "about" ? "first" : section.id === "work" ? "second" : "third"}-section`;

    return (
        <>
            <div className={`${section.moveClass} section-margin`}></div>

            <section className={`${sectionClass} section ${section.side}`}>
                <div className="section-spotlight" aria-hidden="true"></div>
                <div className="section-orbit section-orbit-one" aria-hidden="true"></div>
                <div className="section-orbit section-orbit-two" aria-hidden="true"></div>
                <ProgressBar side={section.side} accent={section.accent} />

                <div className={`section-intro-wrapper ${accentText} ${accentBorder}`}>
                    <div className="section-title-ribbon" aria-hidden="true"></div>
                    <h1 className={`section-title ${accentText} ${accentBorder}`}>
                        <span className={`section-title-text ${accentText}`}>{section.title}</span>
                        <div className={`section-title-decoration styleOne ${accentBorder}`}></div>
                        <div className={`section-title-decoration styleTwo ${accentBorder}`}></div>
                        <div className={`section-title-decoration styleThree ${accentBackground} ${accentBorder}`}></div>
                    </h1>
                    <span className={`section-number ${accentText}`}>{section.number}</span>
                </div>

                <div className="section-detail-wrapper">
                    {section.paragraphs?.map((text) => (
                        <p className="section-text" key={text}>
                            {text}
                        </p>
                    ))}
                    {section.projects ? <WorkList projects={section.projects} /> : null}
                    {section.contacts ? <ContactList contacts={section.contacts} /> : null}
                </div>
            </section>
        </>
    );
}
