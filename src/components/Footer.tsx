// components/Footer.tsx
const Footer = () => {
    return (
        <div className="relative w-full">
            <img
                src="/images/footer-bg.png"
                alt="Footer Image"
                className="w-screen object-cover h-auto"
            />

            <div className="absolute bottom-0 left-0 right-0 z-20 text-white flex bg-transparent mx-24 underline space-x-48 mb-3p h-3/4 overflow-hidden">
                <div className='space-y-8'>
                    <div>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:underline">Submit Your Music</a></li>
                            <li><a href="#" className="hover:underline">How Musosoup Works</a></li>
                            <li><a href="#" className="hover:underline">Our Difference</a></li>
                            <li><a href="#" className="hover:underline">Preparing to Submit</a></li>
                            <li><a href="#" className="hover:underline">Your Curators</a></li>
                            <li><a href="#" className="hover:underline">Blog</a></li>
                        </ul>
                    </div>
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
                        <ul className='space-y-1'>
                            <li><a href="#" className="hover:underline">Terms of Use</a></li>
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col">
                    <ul className="space-y-4">
                        <li><a href="#" className="hover:underline">View recent music</a></li>
                        <li><a href="#" className="hover:underline">#SustainableCurator</a></li>
                        <li><a href="#" className="hover:underline">Contact us</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;
