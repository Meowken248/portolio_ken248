import React from "react";

export default function ContactList({ contacts }) {
    return (
        <div className="contact-list">
            {contacts.map((contact, index) => (
                <article className="contact-item content-item" key={contact.title}>
                    <span className="content-item-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="content-item-orbit" aria-hidden="true"></span>
                    <h3 className="section-heading contact-title">{contact.title}</h3>
                    <p className="section-text">{contact.text}</p>
                    {contact.href ? (
                        <a className="contact-link" href={contact.href} target="_blank" rel="noreferrer">
                            Open link
                        </a>
                    ) : null}
                </article>
            ))}
        </div>
    );
}
