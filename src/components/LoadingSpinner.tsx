export default function LoadingSpinner() {
  return (
    <div className="spinner mx-100 my-100">
      <div className="bounce-ball ball1"></div>
      <div className="bounce-ball ball2"></div>
      <div className="bounce-ball ball3"></div>
      <style jsx>{`
        .spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 80px; /* Adjust the height for larger animations */
        }

        .bounce-ball {
          width: 20px;
          height: 20px;
          margin: 0 5px;
          background-color: #3498db;
          border-radius: 50%;
          animation: bounce 1.5s infinite ease-in-out;
        }

        .ball1 {
          animation-delay: -0.3s;
        }

        .ball2 {
          animation-delay: -0.15s;
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
