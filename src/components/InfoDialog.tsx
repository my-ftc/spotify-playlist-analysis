import React from 'react';

interface InfoDialogProps {
    title: string;
    content: string;
    onClose: () => void;
    safe: true | false;
}

const InfoDialog: React.FC<InfoDialogProps> = ({ title, content, onClose, safe }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white rounded-lg shadow-lg 3xs:w-screen 2xs:w-2/3 sm:w-1/3 3xs:mx-2 2xs:mx-0 p-6">
                {/* Title and Close Button */}
                <div className="flex justify-between items-center mb-4">
                    <div className='flex flex-row'>
                        <h2 className="flex items-center font-semibold text-black 3xs:text-base xs:text-lg">{title}</h2>
                        {/* Display the status dynamically */}
                        <div className={`flex items-center px-2 py-1 rounded-md ml-4 ${safe === true ? 'bg-[#eefaf0]' : 'bg-[#f9e8e8]'}`}>
                            <img
                                src={safe === true ? "/images/safe-logo.png" : "/images/issues-logo.png"}
                                alt={safe === true ? 'Safe Icon' : 'Warning Icon'}
                                className="w-4 h-5 mr-2"
                            />
                            <span className="text-[#0a0f26] font-semibold 3xs:text-xs xs:text-base">
                                {safe ? 'Safe' : 'Issues Detected'}
                            </span>
                        </div>
                    </div>
                    <img
                        src="/images/x-close.png"
                        alt="Close Icon"
                        className="w-6 h-6 cursor-pointer"
                        onClick={onClose}
                    />
                </div>
                {/* Content Section */}
                <div className="text-[#515268] mb-6">
                    <p>{content}</p>
                </div>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="px-3 py-2 bg-[#eff5f7] rounded-lg hover:bg-gray-300 text-[#1d4a5d] font-semibold"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default InfoDialog;
