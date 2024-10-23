import Link from 'next/link';
import { extractPlaylistId } from '../utils/helpers';

interface InputAnalyzeProps {
  query: string;
  setQuery: (query: string) => void;
}

const InputAnalyze: React.FC<InputAnalyzeProps> = ({ query, setQuery }) => {
  const playlistId = extractPlaylistId(query);

  return (
    <div className="flex flex-col bg-white mt-3 p-5 rounded-lg shadow-lg font-poppins">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" id="spotify">
          <g id="Icons" fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <g id="Color-" fill="#00DA5A" transform="translate(-200 -460)">
              <path id="Spotify" d="M238.16 481.36c-7.68-4.56-20.52-5.04-27.84-2.76-1.2.36-2.4-.36-2.76-1.44-.36-1.2.36-2.4 1.44-2.76 8.52-2.52 22.56-2.04 31.44 3.24 1.08.6 1.44 2.04.84 3.12-.6.84-2.04 1.2-3.12.6m-.24 6.72c-.6.84-1.68 1.2-2.52.6-6.48-3.96-16.32-5.16-23.88-2.76-.96.24-2.04-.24-2.28-1.2-.24-.96.24-2.04 1.2-2.28 8.76-2.64 19.56-1.32 27 3.24.72.36 1.08 1.56.48 2.4m-2.88 6.6c-.48.72-1.32.96-2.04.48-5.64-3.48-12.72-4.2-21.12-2.28-.84.24-1.56-.36-1.8-1.08-.24-.84.36-1.56 1.08-1.8 9.12-2.04 17.04-1.2 23.28 2.64.84.36.96 1.32.6 2.04M224 460c-13.2 0-24 10.8-24 24s10.8 24 24 24 24-10.8 24-24-10.68-24-24-24"></path>
            </g>
          </g>
        </svg>
        <strong className="ml-2 text-black">Paste a Spotify URL to check it for bots</strong>
      </div>

      <div className="flex flex-row mt-4 w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && playlistId) {
              window.location.href = `/playlist/${playlistId}`;
            }
          }}
          placeholder="Paste URL"
          className="border border-gray-300 rounded-l-lg text-black focus:outline-none py-3 px-4 w-full"
          style={{ animation: "blinkingCursor 1.2s steps(12) infinite" }}
        />
        {playlistId ? (
          <Link href={`/playlist/${playlistId}`} passHref>
            <span className={`border-gray-300 bg-[#1d4a5d] text-white font-bold rounded-r-lg px-4 py-3 transition duration-200 w-auto whitespace-nowrap inline-flex items-center justify-center cursor-pointer`}>
              Analyze playlist
            </span>
          </Link>
        ) : (
          <span className={`border-gray-300 bg-[#afb7be] text-white font-bold rounded-r-lg px-4 py-3 transition duration-200 w-auto whitespace-nowrap inline-flex items-center justify-center cursor-not-allowed`}>
            Analyze playlist
          </span>
        )}
      </div>
    </div>
  );
};

export default InputAnalyze;
