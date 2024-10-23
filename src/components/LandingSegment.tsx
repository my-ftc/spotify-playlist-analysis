import React from 'react';
import InputAnalyze from './InputAnalyze';
import RecentlyChecked from './RecentlyChecked';
import HowItWorks from './HowItWorks';

interface LandingSegmentProps {
    query: string;
    setQuery: (query: string) => void;
    previousSearches: any[];
    paginatedSearches: any[];
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const LandingSegment: React.FC<LandingSegmentProps> = ({
    query,
    setQuery,
    previousSearches,
    paginatedSearches,
    totalPages,
    currentPage,
    setCurrentPage
}) => {
    return (
        <>
            <InputAnalyze query={query} setQuery={setQuery} />
            {previousSearches.length > 0 && (
                <div className="mt-2p flex space-x-2">
                    <RecentlyChecked
                        paginatedSearches={paginatedSearches}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    <HowItWorks />
                </div>
            )}
        </>
    );
};

export default LandingSegment;
