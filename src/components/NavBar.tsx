// components/NavBar.tsx
import React from 'react';
import Link from 'next/link';

const NavBar: React.FC = () => {
    return (
        <nav className="flex justify-between items-center bg-transparent p-4 font-poppins">
            <div className="z-10">
                <Link href="/">
                    <img
                        src="/images/logo-text-over-image.png"
                        alt="Logo"
                        className="xs:w-36 s:w-full md:w-full lg:w-full h-auto cursor-pointer"
                    />
                </Link>
            </div>
            <div className="flex items-center">
                <div className="flex flex-row gap-8 xs:gap-4 sm:gap-4 md:gap-8 lg:gap-16">
                    <a href="#" className="text-white text-sm xs:text-xs sm:text-sm md:text-lg lg:text-lg hover:underline">How it works</a>
                    <a href="#" className="text-white text-sm xs:text-xs sm:text-sm md:text-lg lg:text-lg hover:underline">Preparing to Submit</a>
                    <a href="#" className="text-white text-sm xs:text-xs sm:text-sm md:text-lg lg:text-lg hover:underline">Our Difference</a>
                    <a href="#" className="text-white text-sm xs:text-xs sm:text-sm md:text-lg lg:text-lg hover:underline">For Curators</a>
                    <a href="#" className="text-white text-sm xs:text-xs sm:text-sm md:text-lg lg:text-lg hover:underline mr-4">Blog</a>
                </div>

                <div className="flex space-x-2">
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
            </div>
        </nav>
    );
};

export default NavBar;
