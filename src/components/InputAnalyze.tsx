// components/InputAnalyze.tsx

interface InputAnalyzeProps {
    query: string;
    setQuery: (query: string) => void;
    handleAnalyze: () => void;
  }
  
  const InputAnalyze: React.FC<InputAnalyzeProps> = ({ query, setQuery, handleAnalyze }) => (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter Spotify playlist URL or ID"
        className="p-2 border border-gray-300 rounded-lg text-black caret-black w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ animation: "blinkingCursor 1.2s steps(12) infinite" }}
      />
      <button
        onClick={handleAnalyze}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg px-4 py-2 transition duration-200"
      >
        Analyze
      </button>
  
      <style jsx>{`
        @keyframes blinkingCursor {
          0% { border-right-color: black; }
          50% { border-right-color: black; }
          100% { border-right-color: black; }
        }
        input { caret-color: black; }
      `}</style>
    </div>
  );
  
  export default InputAnalyze;
  