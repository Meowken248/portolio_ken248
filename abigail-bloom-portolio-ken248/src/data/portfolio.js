export const profile = {
    intro: "Welcome to my portfolio!",
    name: "Huynh Anh Tu",
    role: "Web Developer",
    brand: "Ken248",
    label: "Portfolio",
};

export const sections = [
    {
        id: "about",
        number: "01",
        title: "About Me",
        side: "left",
        moveClass: "first-move",
        accent: "",
        paragraphs: [
            "I'm Huynh Anh Tu, a web developer based in Go Vap, Ho Chi Minh City. I enjoy building clean, practical web interfaces and reliable management systems.",
            "My background includes front-end development with HTML, CSS, JavaScript and back-end work with PHP/Laravel, MySQL and SQL Server. I am always learning new technologies, improving product quality, and contributing value to real web projects.",
            "Education: Thu Duc College of Technology, Information Technology, 2024 - 2027.",
        ],
    },
    {
        id: "work",
        number: "02",
        title: "Projects",
        side: "right",
        moveClass: "second-move",
        accent: "blue",
        projects: [
            {
                title: "Hotel Booking System",
                text: "A hotel room booking platform built with HTML, CSS, Bootstrap, JavaScript, PHP and MySQL. I worked on the homepage, room details, checkout flow, admin dashboard, booking features, authentication, post management, search, filtering, and basic security against SQL Injection, XSS and CSRF.",
            },
            {
                title: "Hospital Management System",
                text: "A hospital management project developed with HTML, CSS, Bootstrap, Tailwind CSS, PHP/Laravel and MySQL. The system includes patient data management, visit history, hospital news, CSV data handling, role-based access control, and an integrated AI chatbot using Gemini API.",
            },
            {
                title: "Technical Skills",
                text: "Front-end: HTML, CSS, JavaScript. Back-end: PHP/Laravel. Databases: MySQL, SQL Server. Tools: Git, GitHub, Docker, VS Code.",
            },
        ],
    },
    {
        id: "contact",
        number: "03",
        title: "Contact",
        side: "left",
        moveClass: "third-move",
        accent: "green",
        contacts: [
            {
                title: "Phone",
                text: "+84 812 816 248",
            },
            {
                title: "Email",
                text: "anh2482006@gmail.com",
            },
            {
                title: "Location",
                text: "An Nhon, Go Vap, Ho Chi Minh City",
            },
            {
                title: "GitHub",
                text: "View repositories and technical work.",
                href: "https://github.com/search?q=adobe&type=repositories",
            },
            {
                title: "Facebook",
                text: "Connect with me on Facebook.",
                href: "https://www.facebook.com/kenn248",
            },
            {
                title: "Instagram",
                text: "Follow my Instagram updates.",
                href: "https://www.instagram.com/k.e.n248/",
            },
            {
                title: "LinkedIn",
                text: "Career profile and professional updates.",
                href: "https://www.linkedin.com/in/anh-t%C3%BA-hu%E1%BB%B3nh-b47b44366/",
            },
        ],
    },
];
