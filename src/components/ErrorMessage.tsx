// components/ErrorMessage.tsx

interface ErrorMessageProps {
    error: string | null;
  }
  
  const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
    if (!error) return null;
  
    return (
      <div className="text-red-500">
        <p>{error}</p>
      </div>
    );
  };
  
  export default ErrorMessage;
  