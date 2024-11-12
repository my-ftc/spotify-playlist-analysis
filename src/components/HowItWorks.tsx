// components/HowItWorks.js
const HowItWorks = () => {
    return (
        <div className="xxs:w-full xs:w-1/4 bg-[#0a0f26] p-5 rounded-lg shadow-md xxs:text-xs xs:text-lg">
            <h2 className="font-extrabold text-white">How does it work</h2>
            <p className="text-[#c0c0c0] mt-2">
                Use our Spotify playlist bot checker to spot fake activity. Analyze streams, likes, and followers for bot signs. Enter playlist URL for a scan on engagement and interactions. Get a report in minutes.
            </p>

            <hr className="my-4 border-[#374151]" />

            <h2 className="font-extrabold text-white">Outcomes</h2>

            {/* Sub-heading 1: Issues detected */}
            <div className="flex items-center mt-3">
                <img src="/images/issues-logo.png" alt="Issues Logo" className="w-5 h-6 mr-2" />
                <h3 className="font-bold text-white">Issues detected</h3>
            </div>
            <p className="text-[#c0c0c0] mt-1">
                Tool found odd patterns in playlist engagement, hinting at bots or manipulated metrics. Act now to investigate and fix to uphold playlist integrity.
            </p>

            {/* Sub-heading 2: Inconclusive */}
            <div className="flex items-center mt-4">
                <img src="/images/inconclusive-logo.png" alt="Inconclusive Logo" className="w-5 h-7 mr-2" />
                <h3 className="font-bold text-white">Inconclusive</h3>
            </div>
            <p className="text-[#c0c0c0] mt-1">
                Results unclear, insufficient data to categorize playlist confidently. No definitive signs of bot activity, but recommend further monitoring or analysis.
            </p>

            {/* Sub-heading 3: Safe */}
            <div className="flex items-center mt-4">
                <img src="/images/safe-logo.png" alt="Safe Logo" className="w-5 h-7 mr-2" />
                <h3 className="font-bold text-white">Safe</h3>
            </div>
            <p className="text-[#c0c0c0] mt-1">
                No suspicious activity detected. Playlist&#39;s growth and engagement seem authentic, no sign of bot involvement. Keep promoting with confidence.
            </p>
        </div>
    );
};

export default HowItWorks;
