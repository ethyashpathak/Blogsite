import React, { useState } from 'react'

// Mock components for demo
const Logo = ({ width, className }) => (
    <div className={`${className} bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg`} style={{ width, height: width }}>
        LOGO
    </div>
)

function Footer() {
    const [hoveredSection, setHoveredSection] = useState(null)

    const footerSections = [
        {
            title: "Company",
            links: [
                { name: "Features", href: "/" },
                { name: "Pricing", href: "/" },
                { name: "Affiliate Program", href: "/" },
                { name: "Press Kit", href: "/" }
            ]
        },
        {
            title: "Support",
            links: [
                { name: "Account", href: "/" },
                { name: "Help", href: "/" },
                { name: "Contact Us", href: "/" },
                { name: "Customer Support", href: "/" }
            ]
        },
        {
            title: "Legals",
            links: [
                { name: "Terms & Conditions", href: "/" },
                { name: "Privacy Policy", href: "/" },
                { name: "Licensing", href: "/" }
            ]
        }
    ]

    return (
        <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            
            <div className="relative z-10 mx-auto max-w-7xl px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Logo and description section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center space-x-3 group">
                            <div className="relative">
                                <Logo width="60px" className="transition-transform duration-300 group-hover:rotate-6" />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                BlogApp
                            </span>
                        </div>
                        
                        <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                            Empowering writers and readers to connect through beautiful, meaningful content. 
                            Join our community of storytellers and discover your next favorite read.
                        </p>
                        
                        {/* Social media icons */}
                        <div className="flex space-x-4">
                            {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                                <button
                                    key={social}
                                    className="w-10 h-10 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
                                    onClick={() => console.log(`Navigate to ${social}`)}
                                >
                                    <div className="w-5 h-5 bg-current rounded-sm"></div>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Navigation sections */}
                    {footerSections.map((section, index) => (
                        <div 
                            key={section.title}
                            className="space-y-4"
                            onMouseEnter={() => setHoveredSection(section.title)}
                            onMouseLeave={() => setHoveredSection(null)}
                        >
                            <h3 className={`text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                                hoveredSection === section.title 
                                    ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent' 
                                    : 'text-gray-400'
                            }`}>
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-gray-300 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 inline-block relative group"
                                        >
                                            {link.name}
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                
                {/* Newsletter signup */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <div className="text-center md:text-left">
                            <h4 className="text-lg font-semibold text-white mb-2">
                                Stay in the loop
                            </h4>
                            <p className="text-gray-400 text-sm">
                                Get the latest updates and exclusive content delivered to your inbox.
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Bottom section */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © 2024 BlogApp. All rights reserved. Made with ❤️ for writers everywhere.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                                Privacy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                                Terms
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                                Cookies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer