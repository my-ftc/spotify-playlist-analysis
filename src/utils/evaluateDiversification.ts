// utils/diversificationUtils.ts

// Define the expanded genre clusters
const genreClusters: { [key: string]: string[] } = {
  pop: ['pop', 'indie pop', 'dance pop', 'synthpop', 'pop rock'],
  rock: ['rock', 'alternative rock', 'classic rock', 'metal', 'heavy metal', 'punk rock', 'grunge'],
  hipHop: ['hip hop', 'rap', 'trap', 'grime', 'freestyle', 'gangster rap'],
  electronic: ['edm', 'house', 'techno', 'trance', 'dubstep', 'electronic'],
  jazz: ['jazz', 'smooth jazz', 'bebop', 'vocal jazz', 'swing', 'big band'],
  blues: ['blues', 'electric blues', 'delta blues', 'acoustic blues'],
  country: ['country', 'bluegrass', 'country rock', 'honky tonk'],
  classical: ['classical', 'symphony', 'baroque', 'romantic', 'modern classical'],
  latin: ['latin', 'reggaeton', 'salsa', 'latin pop', 'mariachi'],
  reggae: ['reggae', 'ska', 'dancehall', 'roots reggae'],
  folk: ['folk', 'indie folk', 'traditional folk', 'americana'],
  soul: ['soul', 'motown', 'neo-soul', 'r&b'],
  metal: ['metal', 'heavy metal', 'black metal', 'death metal', 'doom metal'],
  world: ['world music', 'afrobeat', 'k-pop', 'j-pop', 'bollywood', 'cumbia'],
  // Additional clusters as needed
};

// Function to calculate diversification
export const evaluateDiversification = (genres: { [genre: string]: number }): boolean => {
  const clusterCounts: { [cluster: string]: number } = {};
  const totalGenres = Object.values(genres).reduce((sum, count) => sum + count, 0);

  // Aggregate genres into their clusters or create individual clusters for unclustered genres
  Object.entries(genres).forEach(([genre, count]) => {
    let foundCluster = false;

    // Check if the genre belongs to any predefined cluster
    Object.entries(genreClusters).forEach(([cluster, clusterGenres]) => {
      if (clusterGenres.includes(genre)) {
        clusterCounts[cluster] = (clusterCounts[cluster] || 0) + count;
        foundCluster = true;
      }
    });

    // If the genre is not part of any cluster, treat it as its own cluster
    if (!foundCluster) {
      clusterCounts[genre] = (clusterCounts[genre] || 0) + count;
    }
  });

  // Calculate each cluster’s percentage
  const clusterPercentages = Object.values(clusterCounts).map(
    (count) => (count / totalGenres) * 100
  );

  // Diversification condition: At least two clusters should be >= 10% of the total
  return clusterPercentages.filter((percent) => percent >= 10).length >= 2;
};
