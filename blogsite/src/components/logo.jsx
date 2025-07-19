import React from 'react'

function Logo({width="100px"}) {
    return (
        <span
            style={{ width, height: width }}
            className="inline-block align-middle"
        >
            <svg
                width={width}
                height={width}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rounded-xl shadow-lg"
            >
                <defs>
                    <linearGradient id="logo-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#3b82f6" />
                        <stop offset="0.5" stopColor="#8b5cf6" />
                        <stop offset="1" stopColor="#ec4899" />
                    </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#logo-gradient)" />
                <text
                    x="50%"
                    y="54%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="38"
                    fontWeight="bold"
                    fill="#fff"
                    style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '2px' }}
                >
                    B
                </text>
            </svg>
        </span>
    )
}

export default Logo
