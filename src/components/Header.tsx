// components/Header.tsx
const Header = () => {
    return (
        <div className="absolute w-full overflow-hidden">
            <img
                src="/images/Vector.png"
                alt="Top Image"
                className="w-screen h-auto object-cover sm:w-screen sm:h-auto sm:object-cover sm:relative sm:left-0 xxs:w-[180vw] xxs:object-center xxs:left-[-40vw]"
                style={{
                    maxWidth: "none", // Removes default max width to allow full overflow
                }}
            />
        </div>
    );
};

export default Header;
