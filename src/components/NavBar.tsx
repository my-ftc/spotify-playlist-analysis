import React, { useState } from 'react';
import Link from 'next/link';

const NavBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="flex justify-between items-center bg-transparent p-4 font-poppins">
            <div className="z-10">
                <Link href="/">
                    <img
                        src="/images/logo-text-over-image.png"
                        alt="Logo"
                        className="3xs:w-36 xs:w-36 sm:w-full h-auto cursor-pointer"
                    />
                </Link>
            </div>

            <div className="flex items-center">
                {/* Hamburger Icon - Only for 3xs screens */}
                <button
                    className="3xs:block xs:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

                <div className="hidden 3xs:hidden xs:flex flex-row gap-4 sm:gap-4 md:gap-8 lg:gap-16">
                    <a href="#" className="text-white text-sm xs:text-xs sm:text-sm md:text-lg lg:text-lg hover:underline">How it works</a>
                    <a href="#" className="text-white text-sm xs:text-xs sm:text-sm md:text-lg lg:text-lg hover:underline">Preparing to Submit</a>
                    <a href="#" className="text-white text-sm xs:text-xs sm:text-sm md:text-lg lg:text-lg hover:underline">Our Difference</a>
                    <a href="#" className="text-white text-sm xs:text-xs sm:text-sm md:text-lg lg:text-lg hover:underline">For Curators</a>
                    <a href="#" className="text-white text-sm xs:text-xs sm:text-sm md:text-lg lg:text-lg hover:underline mr-4">Blog</a>
                </div>

                <div className="hidden 3xs:hidden xs:flex space-x-2">
                    <button className="bg-white text-[#1d4a5d] px-4 py-2 rounded-lg xs:text-xs sm:text-sm md:text-lg lg:text-lg">
                        Sign in
                    </button>
                    <button className="bg-[#1d4a5d] text-white px-4 rounded-lg flex items-center xs:text-xs sm:text-sm md:text-lg lg:text-lg">
                        <img
                            src="/images/music-note-plus.png"
                            alt="Submit Icon"
                            className="mr-2 h-5 w-5"
                        />
                        Submit music
                    </button>
                </div>

                {/* Hamburger Menu - Only visible on 3xs */}
                {isMenuOpen && (
                    <div className="absolute top-16 right-0 bg-[#1d4a5d] p-4 w-1/2">
                        <a href="#" className="block text-white text-sm hover:underline py-2">How it works</a>
                        <a href="#" className="block text-white text-sm hover:underline py-2">Preparing to Submit</a>
                        <a href="#" className="block text-white text-sm hover:underline py-2">Our Difference</a>
                        <a href="#" className="block text-white text-sm hover:underline py-2">For Curators</a>
                        <a href="#" className="block text-white text-sm hover:underline py-2">Blog</a>

                        {/* Sign in and Submit buttons inside hamburger menu */}
                        <div className="flex flex-col space-y-3 mt-4">
                            <button className="bg-white text-[#1d4a5d] px-4 py-2 rounded-lg text-xs sm:text-sm hover:underline border-2">
                                Sign in
                            </button>
                            <button className="bg-[#1d4a5d] text-white px-4 py-2 rounded-lg flex items-center justify-center text-xs sm:text-sm hover:underline border-2">
                                <img
                                    src="/images/music-note-plus.png"
                                    alt="Submit Icon"
                                    className="mr-2 h-5 w-5"
                                />
                                Submit music
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
