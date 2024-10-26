import React from 'react';

interface InfoDialogProps {
    title: string;
    content: string;
    onClose: () => void;
}

const InfoDialog: React.FC<InfoDialogProps> = ({ title, content, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white rounded-lg shadow-lg w-1/3 p-6">
                {/* Title and Close Button */}
                <div className="flex justify-between items-center mb-4">
                    <div className='flex flex-row'>
                        <h2 className="text-lg font-semibold text-black">{title}</h2>
                        <div className="flex items-center bg-[#eefaf0] px-2 py-1 rounded-md ml-4">
                            <img src="/images/safe-logo.png" alt="Safe Icon" className="w-4 h-5 mr-2" />
                            <span className="text-[#0a0f26] font-semibold">Safe</span>
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
