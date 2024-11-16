// components/Header.tsx
const Header = () => {
    return (
        <div className="absolute w-full overflow-hidden">
            <img
                src="/images/Vector.png"
                alt="Top Image"
                className="w-screen h-auto object-cover mxs:w-screen mxs:h-auto mxs:object-cover mxs:relative mxs:left-0 2xs:w-[120vw] 2xs:left-[-10vw] 3xs:w-[180vw] 3xs:left-[-40vw]"
                style={{
                    maxWidth: "none", // Removes default max width to allow full overflow
                }}
            />
        </div>
    );
};

export default Header;
