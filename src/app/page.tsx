"use client";

import React, { useEffect, useState } from 'react';
import { getPreviousSearches } from "../lib/localStorageUtils";
import MainLayout from '@/components/MainLayout';
import LandingSegment from '@/components/LandingSegment';

export default function Home() {
  const [query, setQuery] = useState("");
  const [previousSearches, setPreviousSearches] = useState<{
    name: string,
    url: string,
    ownerId: string;
    followers: number;
    tracks: number;
    date: string;
    image: string | null;
  }[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  useEffect(() => {
    setPreviousSearches(getPreviousSearches());
  }, []);

  const totalPages = Math.ceil(previousSearches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSearches = previousSearches.slice(startIndex, startIndex + itemsPerPage);

  return (
    <MainLayout>
      <div className="mt-10">
        <LandingSegment
          query={query}
          setQuery={setQuery}
          previousSearches={previousSearches}
          paginatedSearches={paginatedSearches}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </MainLayout>
  );
}
