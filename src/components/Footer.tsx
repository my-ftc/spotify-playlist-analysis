// components/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
    return (
        <div className="relative">
            {/* Footer Background Image */}
            <div className="absolute bottom-0 left-0 w-full z-0">
                <img
                    src="/images/footer-bg.png"
                    alt="Footer Background"
                    className="w-screen h-auto object-cover"
                />
            </div>

            {/* Footer Content */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-8 font-poppins bg-gray-900 bg-opacity-75">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
                    {/* Left Column */}
                    <div>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Submit Your Music</a></li>
                            <li><a href="#" className="hover:underline">How Musosoup Works</a></li>
                            <li><a href="#" className="hover:underline">Our Difference</a></li>
                            <li><a href="#" className="hover:underline">Preparing to Submit</a></li>
                            <li><a href="#" className="hover:underline">Your Curators</a></li>
                            <li><a href="#" className="hover:underline">Blog</a></li>
                        </ul>
                    </div>

                    {/* Right Column */}
                    <div>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">View recent music</a></li>
                            <li><a href="#" className="hover:underline">#SustainableCurator</a></li>
                            <li><a href="#" className="hover:underline">Contact us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
