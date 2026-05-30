import React from "react";

export default function WorkList({ projects }) {
    return (
        <div className="work-list">
            {projects.map((project, index) => (
                <article className="project-item content-item" key={project.title}>
                    <span className="content-item-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="content-item-orbit" aria-hidden="true"></span>
                    <h3 className="section-heading project-title">{project.title}</h3>
                    <p className="section-text">{project.text}</p>
                </article>
            ))}
        </div>
    );
}
