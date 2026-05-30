import React, { useEffect, useRef, useState } from "react";

const DOTS = Array.from({ length: 7 }, (_, index) => index);

export default function CursorAura() {
    const auraRef = useRef(null);
    const dotsRef = useRef([]);
    const pointer = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const positions = useRef(
        DOTS.map(() => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }))
    );
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const pointerQuery = window.matchMedia("(pointer: fine)");
        const canAnimate = () => pointerQuery.matches && !motionQuery.matches;

        let frameId;

        const updateEnabled = () => setEnabled(canAnimate());
        const onPointerMove = (event) => {
            pointer.current.x = event.clientX;
            pointer.current.y = event.clientY;
            document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
            document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
        };
        const onPointerDown = () => {
            auraRef.current?.classList.remove("cursor-aura-pulse");
            requestAnimationFrame(() => auraRef.current?.classList.add("cursor-aura-pulse"));
        };
        const animate = () => {
            positions.current.forEach((position, index) => {
                const target = index === 0 ? pointer.current : positions.current[index - 1];
                const ease = 0.24 - index * 0.018;
                position.x += (target.x - position.x) * ease;
                position.y += (target.y - position.y) * ease;

                const dot = dotsRef.current[index];
                if (dot) {
                    dot.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
                }
            });
            frameId = requestAnimationFrame(animate);
        };

        updateEnabled();
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerdown", onPointerDown);
        motionQuery.addEventListener("change", updateEnabled);
        pointerQuery.addEventListener("change", updateEnabled);
        frameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerdown", onPointerDown);
            motionQuery.removeEventListener("change", updateEnabled);
            pointerQuery.removeEventListener("change", updateEnabled);
            cancelAnimationFrame(frameId);
        };
    }, []);

    if (!enabled) return null;

    return (
        <div className="cursor-effects" aria-hidden="true">
            <div className="cursor-aura" ref={auraRef}></div>
            {DOTS.map((dot) => (
                <span
                    className="cursor-dot"
                    key={dot}
                    ref={(element) => {
                        dotsRef.current[dot] = element;
                    }}
                    style={{ "--dot-index": dot }}
                ></span>
            ))}
        </div>
    );
}
