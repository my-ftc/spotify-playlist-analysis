// lib/trackUtils.ts

export const categorizeTracksByAge = (tracks: any[]): { [key: string]: number } => {
    const now = new Date();
    const categories = {
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
    });
  
    return categories;
  };
  