// components/Footer.tsx
const Footer = () => {
    return (
        <div className="relative w-full">
            <img
                src="/images/footer-bg.png"
                alt="Footer Image"
                className="w-screen object-cover h-auto"
            />

            <div className="absolute bottom-0 left-0 right-0 z-20 text-white flex bg-transparent xs:mx-8 sm:mx-16 md:mx-24 lg:mx-24 underline xs:space-x-24 sm:space-x-48 md:space-x-48 lg:space-x-48 mb-3p xs:h-3/4 sm:h-3/5 md:h-3/5 lg:h-3/4 overflow-hidden">
                <div className="flex xs:flex-row sm:flex-row md:flex-row lg:flex-col xs:space-x-24 sm:space-x-48 md:space-x-48 lg:space-x-0">
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
                    <div className="space-y-8">
                        <div className='flex flex-row space-x-4'>
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
                            <ul className='space-y-1 xs:text-xs sm:text-sm md:text-sm lg:text-lg'>
                                <li><a href="#" className="hover:underline">Terms of Use</a></li>
                                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:underline">View recent music</a></li>
                        <li><a href="#" className="hover:underline">#SustainableCurator</a></li>
                        <li><a href="#" className="hover:underline">Contact us</a></li>
                    </ul>
                </div>

                <div className="absolute right-0">
                    <button className="bg-[#eff5f7] text-[#1d4a5d] px-4 py-2 rounded-lg flex items-center xs:text-xs sm:text-sm md:text-lg lg:text-lg">
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
    );
};

export default Footer;
