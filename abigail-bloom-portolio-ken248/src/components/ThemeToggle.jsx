import React, { useEffect, useState } from "react";

function SunIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M12 5Q11.575 5 11.288 4.712Q11 4.425 11 4V2Q11 1.575 11.288 1.287Q11.575 1 12 1Q12.425 1 12.713 1.287Q13 1.575 13 2V4Q13 4.425 12.713 4.712Q12.425 5 12 5ZM16.95 7.05Q16.675 6.775 16.675 6.362Q16.675 5.95 16.95 5.65L18.35 4.225Q18.65 3.925 19.062 3.925Q19.475 3.925 19.775 4.225Q20.05 4.5 20.05 4.925Q20.05 5.35 19.775 5.625L18.35 7.05Q18.075 7.325 17.65 7.325Q17.225 7.325 16.95 7.05ZM20 13Q19.575 13 19.288 12.712Q19 12.425 19 12Q19 11.575 19.288 11.287Q19.575 11 20 11H22Q22.425 11 22.712 11.287Q23 11.575 23 12Q23 12.425 22.712 12.712Q22.425 13 22 13ZM12 23Q11.575 23 11.288 22.712Q11 22.425 11 22V20Q11 19.575 11.288 19.288Q11.575 19 12 19Q12.425 19 12.713 19.288Q13 19.575 13 20V22Q13 22.425 12.713 22.712Q12.425 23 12 23ZM5.65 7.05 4.225 5.65Q3.925 5.35 3.925 4.925Q3.925 4.5 4.225 4.225Q4.5 3.95 4.925 3.95Q5.35 3.95 5.625 4.225L7.05 5.65Q7.325 5.925 7.325 6.35Q7.325 6.775 7.05 7.05Q6.75 7.325 6.35 7.325Q5.95 7.325 5.65 7.05ZM18.35 19.775 16.95 18.35Q16.675 18.05 16.675 17.638Q16.675 17.225 16.95 16.95Q17.225 16.675 17.638 16.675Q18.05 16.675 18.35 16.95L19.775 18.35Q20.075 18.625 20.062 19.05Q20.05 19.475 19.775 19.775Q19.475 20.075 19.05 20.075Q18.625 20.075 18.35 19.775ZM2 13Q1.575 13 1.288 12.712Q1 12.425 1 12Q1 11.575 1.288 11.287Q1.575 11 2 11H4Q4.425 11 4.713 11.287Q5 11.575 5 12Q5 12.425 4.713 12.712Q4.425 13 4 13ZM4.225 19.775Q3.95 19.5 3.95 19.075Q3.95 18.65 4.225 18.375L5.65 16.95Q5.925 16.675 6.338 16.675Q6.75 16.675 7.05 16.95Q7.35 17.25 7.35 17.663Q7.35 18.075 7.05 18.375L5.65 19.775Q5.35 20.075 4.925 20.075Q4.5 20.075 4.225 19.775ZM12 18Q9.5 18 7.75 16.25Q6 14.5 6 12Q6 9.5 7.75 7.75Q9.5 6 12 6Q14.5 6 16.25 7.75Q18 9.5 18 12Q18 14.5 16.25 16.25Q14.5 18 12 18Z" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M12 21Q8.25 21 5.625 18.375Q3 15.75 3 12Q3 8.25 5.625 5.625Q8.25 3 12 3Q12.35 3 12.688 3.025Q13.025 3.05 13.35 3.1Q12.325 3.825 11.713 4.987Q11.1 6.15 11.1 7.5Q11.1 9.75 12.675 11.325Q14.25 12.9 16.5 12.9Q17.875 12.9 19.025 12.287Q20.175 11.675 20.9 10.65Q20.95 10.975 20.975 11.312Q21 11.65 21 12Q21 15.75 18.375 18.375Q15.75 21 12 21Z" />
        </svg>
    );
}

export default function ThemeToggle() {
    const [theme, setTheme] = useState(() =>
        document.body.classList.contains("dark-theme") ? "dark" : "light"
    );

    useEffect(() => {
        const onThemeChange = (event) => setTheme(event.detail.theme);

        window.addEventListener("portfolio-theme-change", onThemeChange);
        return () => window.removeEventListener("portfolio-theme-change", onThemeChange);
    }, []);

    return (
        <div className="toggle-bar" data-theme={theme}>
            <div className="sun-wrapper">
                <SunIcon />
            </div>
            <button className="toggle-button" type="button" aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
                <div className={`toggle-circle ${theme === "dark" ? "slide" : ""}`}></div>
            </button>
            <div className="moon-wrapper">
                <MoonIcon />
            </div>
        </div>
    );
}
