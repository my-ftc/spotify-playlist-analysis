import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';
import Title from './Title';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col bg-[#f5f9fa] min-h-screen font-poppins">
            <Header />
            <div className="flex-grow top-0 left-0 right-0 xs:mx-8 sm:mx-16 md:mx-24 lg:mx-24 my-2p z-10">
                <NavBar />
                <Title />
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
