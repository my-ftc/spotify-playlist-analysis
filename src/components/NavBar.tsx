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
                        className="w-full h-auto cursor-pointer"
                    />
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex flex-row gap-16 md:gap-10">
                    <a href="#" className="text-white hover:underline">How it works</a>
                    <a href="#" className="text-white hover:underline">Preparing to Submit</a>
                    <a href="#" className="text-white hover:underline">Our Difference</a>
                    <a href="#" className="text-white hover:underline">For Curators</a>
                    <a href="#" className="text-white hover:underline mr-4">Blog</a>
                </div>

                <div className="flex space-x-2">
                    <button className="bg-white text-[#1d4a5d] px-4 py-2 rounded-lg">
                        Sign in
                    </button>
                    <button className="bg-[#1d4a5d] text-white px-4 rounded-lg flex items-center">
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
