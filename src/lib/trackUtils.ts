// lib/trackUtils.ts

type Category = {
  [key: string]: number; // Ensure all categories are numbers
};

export const categorizeTracksByAge = (
  tracks: any[],
  xxs: boolean // Accepting the isXXS flag as a parameter
): Category => {
  const now = new Date();

  // Define categories based on the isXXS flag passed as parameter
  const categories: Category = xxs
    ? {
      "< 1m": 0,
      "1-3m": 0,
      "3-6m": 0,
      "6-12m": 0,
      "12-18m": 0,
      "> 18m": 0,
    }
    : {
      "Less than 1 month": 0,
      "1 to 3 months": 0,
      "3 to 6 months": 0,
      "6 to 12 months": 0,
      "12 to 18 months": 0,
      "More than 18 months": 0,
    };

  tracks.forEach(track => {
    const releaseDate = new Date(track.track.album.release_date);
    const ageInMonths = (now.getTime() - releaseDate.getTime()) / (1000 * 60 * 60 * 24 * 30);

    // Update categories based on ageInMonths
    if (xxs) {
      if (ageInMonths < 1) {
        categories["< 1m"]++;
      } else if (ageInMonths < 3) {
        categories["1-3m"]++;
      } else if (ageInMonths < 6) {
        categories["3-6m"]++;
      } else if (ageInMonths < 12) {
        categories["6-12m"]++;
      } else if (ageInMonths < 18) {
        categories["12-18m"]++;
      } else {
        categories["> 18m"]++;
      }
    } else {
      if (ageInMonths < 1) {
        categories["Less than 1 month"]++;
      } else if (ageInMonths < 3) {
        categories["1 to 3 months"]++;
      } else if (ageInMonths < 6) {
        categories["3 to 6 months"]++;
      } else if (ageInMonths < 12) {
        categories["6 to 12 months"]++;
      } else if (ageInMonths < 18) {
        categories["12 to 18 months"]++;
      } else {
        categories["More than 18 months"]++;
      }
    }
  });

  return categories;
};
