export default function LoadingWave() {
  return (
    <div className="wave-container mt-20">
      <div className="wave">
        <div className="wave-bar bar1"></div>
        <div className="wave-bar bar2"></div>
        <div className="wave-bar bar3"></div>
        <div className="wave-bar bar4"></div>
        <div className="wave-bar bar5"></div>
        <div className="wave-bar bar6"></div>
        <div className="wave-bar bar7"></div>
        <div className="wave-bar bar8"></div>
        <div className="wave-bar bar9"></div>
        <div className="wave-bar bar10"></div>
        <div className="wave-bar bar11"></div>
        <div className="wave-bar bar12"></div>
        <div className="wave-bar bar13"></div>
        <div className="wave-bar bar14"></div>
        <div className="wave-bar bar15"></div>
      </div>
      <p className="loading-text">Loading</p>
      <style jsx>{`
        .wave-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 60vh;
        }

        .wave {
          display: flex;
          gap: 2px; /* Reduced spacing between each wave bar */
          width: 65%;
          justify-content: center;
          align-items: center;
        }

        .wave-bar {
          width: 2%;
          height: 70px;
          background-color: #1d4a5d;
          border-radius: 50px;
          animation: wave 1.3s ease-in-out infinite;
          box-shadow: 0px 0px 6px rgba(29, 74, 93, 0.4);
        }

        /* Create staggered animation delays for each bar */
        .bar1 { animation-delay: 0s; }
        .bar2 { animation-delay: 0.1s; }
        .bar3 { animation-delay: 0.2s; }
        .bar4 { animation-delay: 0.3s; }
        .bar5 { animation-delay: 0.4s; }
        .bar6 { animation-delay: 0.5s; }
        .bar7 { animation-delay: 0.6s; }
        .bar8 { animation-delay: 0.7s; }
        .bar9 { animation-delay: 0.8s; }
        .bar10 { animation-delay: 0.9s; }
        .bar11 { animation-delay: 1.0s; }
        .bar12 { animation-delay: 1.1s; }
        .bar13 { animation-delay: 1.2s; }
        .bar14 { animation-delay: 1.3s; }
        .bar15 { animation-delay: 1.4s; }

        /* Wave animation */
        @keyframes wave {
          0%, 100% { transform: scaleY(0.2); }
          50% { transform: scaleY(1.2); }
        }

        .loading-text {
          margin-top: 20px;
          font-size: 1.4rem;
          color: #1d4a5d;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
      `}</style>
    </div>
  );
}
