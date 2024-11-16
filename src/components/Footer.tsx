// components/Footer.tsx
const Footer = () => {
    return (
        <div className="relative w-full overflow-hidden">
            <img
                src="/images/footer-bg.png"
                alt="Footer Image"
                className="w-screen h-auto object-cover mxs:w-screen mxs:h-auto mxs:object-cover mxs:relative mxs:left-0 2xs:w-[150vw] 2xs:left-[-25vw] 2mxs:w-[220vw] 2mxs:left-[-60vw] 3xs:w-[290vw] 3xs:left-[-95vw]"
                style={{
                    maxWidth: "none",
                }}
            />

            <div className="absolute bottom-0 left-0 right-0 z-20 text-white 3xs:mx-4 2xs:mx-16 md:mx-24 underline 3xs:mb-4 mb-3p xs:h-3/5 lg:h-3/4 overflow-hidden">
                <div className="flex flex-row 3xs:space-x-10 xs:space-x-32 sm:space-x-48 3xs:justify-center xs:justify-start">
                    <div className="flex 3xs:flex-col 2xs:flex-row lg:flex-col 3xs:space-x-0 2xs:space-x-10 xs:space-x-24 sm:space-x-48 lg:space-x-0 3xs:text-xs xs:text-base lg:text-lg">
                        <div className="mb-8">
                            <ul className="space-y-3">
                                <li><a href="#" className="hover:underline">Submit Your Music</a></li>
                                <li><a href="#" className="hover:underline">How Musosoup Works</a></li>
                                <li><a href="#" className="hover:underline">Our Difference</a></li>
                                <li><a href="#" className="hover:underline">Preparing to Submit</a></li>
                                <li><a href="#" className="hover:underline">Your Curators</a></li>
                                <li><a href="#" className="hover:underline">Blog</a></li>
                            </ul>
                        </div>
                        <div className="3xs:space-y-2 xs:space-y-8">
                            <div className='flex flex-row 3xs:text-xs xs:text-base lg:text-lg space-x-4'>
                                <img
                                    src="/images/vector-insta.png"
                                    alt="Insta Logo"
                                />
                                <img
                                    src="/images/vector-x.png"
                                    alt="X Logo"
                                />
                                <img
                                    src="/images/vector-facebook.png"
                                    alt="Facebook Logo"
                                />
                            </div>
                            <div>
                                <p>&copy; 2024 Muso Ltd</p>
                            </div>
                            <div>
                                <ul className='space-y-1 3xs:text-xs xs:text-base lg:text-lg'>
                                    <li><a href="#" className="hover:underline">Terms of Use</a></li>
                                    <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex 3xs:flex-col xs:flex-row 3xs:space-y-5">
                        <ul className="3xs:space-y-2 xs:space-y-3 3xs:text-xs xs:text-base lg:text-lg">
                            <li><a href="#" className="hover:underline">View recent music</a></li>
                            <li><a href="#" className="hover:underline">#SustainableCurator</a></li>
                            <li><a href="#" className="hover:underline">Contact us</a></li>
                        </ul>
                        <div className="xs:absolute xs:right-0">
                            <button className="bg-[#eff5f7] text-[#1d4a5d] px-4 py-2 rounded-lg flex items-center 3xs:text-xs sm:text-sm md:text-lg">
                                <img
                                    src="/images/music-note-plus-dark.png"
                                    alt="Submit Icon Dark"
                                    className="mr-2 h-5 w-5"
                                />
                                Submit music
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
