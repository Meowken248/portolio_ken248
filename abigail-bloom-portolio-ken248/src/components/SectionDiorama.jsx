import React from "react";

const paths = {
    about: "M68 210 C118 120 196 96 286 134 C374 172 414 110 484 58",
    work: "M54 146 C122 78 204 82 268 150 C332 218 414 210 500 130",
    contact: "M78 98 C144 168 204 184 278 126 C352 68 422 88 496 178",
};

export default function SectionDiorama({ type }) {
    const accent = type === "work" ? "blue" : type === "contact" ? "green" : "pink";

    return (
        <div className={`section-diorama section-art ${accent}-art`} aria-hidden="true">
            <svg viewBox="0 0 560 280" role="img">
                <defs>
                    <radialGradient id={`${type}-art-glow`} cx="50%" cy="50%" r="55%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
                        <stop offset="62%" stopColor="currentColor" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </radialGradient>
                </defs>

                <ellipse className="section-art-glow" cx="282" cy="146" rx="226" ry="116" fill={`url(#${type}-art-glow)`} />
                <path className="section-art-line main-line" d={paths[type]} />
                <path className="section-art-line soft-line" d="M92 196 C166 154 214 218 284 174 C354 130 402 164 470 98" />
                <path className="section-art-line whisper-line" d="M40 74 C132 28 210 56 276 82 C360 116 430 66 528 38" />
                <path className="section-art-line whisper-line second" d="M38 242 C126 226 198 254 276 222 C362 186 446 226 526 200" />

                <g className="section-art-leaves">
                    <path d="M168 148 C138 110 106 112 92 142 C126 156 150 158 168 148Z" />
                    <path d="M190 140 C210 102 244 92 270 118 C246 144 220 154 190 140Z" />
                    <path d="M330 150 C306 118 280 124 268 154 C294 168 314 166 330 150Z" />
                    <path d="M356 138 C384 102 422 106 438 138 C408 156 382 158 356 138Z" />
                </g>

                <g className="section-art-stars">
                    <circle cx="84" cy="92" r="7" />
                    <circle cx="152" cy="214" r="4" />
                    <circle cx="282" cy="134" r="9" />
                    <circle cx="414" cy="78" r="5" />
                    <circle cx="502" cy="206" r="7" />
                </g>

                <g className="section-art-sparkles">
                    <path d="M118 54 L124 70 L140 76 L124 82 L118 98 L112 82 L96 76 L112 70Z" />
                    <path d="M474 34 L479 47 L492 52 L479 57 L474 70 L469 57 L456 52 L469 47Z" />
                    <path d="M246 230 L251 242 L263 247 L251 252 L246 264 L241 252 L229 247 L241 242Z" />
                </g>

                <g className="section-art-blooms">
                    <path d="M64 168 C58 154 66 142 80 148 C94 142 104 154 98 168 C104 182 92 192 80 184 C66 192 58 182 64 168Z" />
                    <path d="M214 74 C208 62 216 50 228 56 C240 50 250 62 244 74 C250 86 240 98 228 92 C216 98 208 86 214 74Z" />
                    <path d="M394 226 C388 214 396 202 408 208 C420 202 430 214 424 226 C430 238 420 250 408 244 C396 250 388 238 394 226Z" />
                    <path d="M496 116 C490 104 498 92 510 98 C522 92 532 104 526 116 C532 128 522 140 510 134 C498 140 490 128 496 116Z" />
                </g>

                <g className="section-art-dust">
                    {Array.from({ length: 22 }).map((_, index) => (
                        <circle
                            cx={48 + ((index * 73) % 464)}
                            cy={38 + ((index * 47) % 206)}
                            r={index % 3 === 0 ? 3 : 2}
                            key={index}
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
}
