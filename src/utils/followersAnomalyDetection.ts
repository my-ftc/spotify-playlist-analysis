// utils/followersAnomalyDetection.ts

interface FollowerData {
    count: number;
    updated_time: string;
}

export function calculateZScore(latest: number, mean: number, stdDev: number): number {
    return stdDev === 0 ? 0 : (latest - mean) / stdDev;
}

export function detectAnomaly(followerCountArray: FollowerData[], threshold = 3.0, growthRateThreshold = 50, absoluteJumpThreshold = 10, dropThreshold = 0.5): boolean {
    const n = followerCountArray.length;
    if (n < 2) return false; // Not enough data to calculate trends

    const latestFollowerCount = followerCountArray[n - 1].count;
    const previousFollowerCount = followerCountArray[n - 2].count;

    // Calculate mean and standard deviation of all follower counts
    const mean = followerCountArray.reduce((sum, data) => sum + data.count, 0) / n;
    const variance = followerCountArray.reduce((sum, data) => sum + Math.pow(data.count - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);

    // Z-score check
    const zScore = calculateZScore(latestFollowerCount, mean, stdDev);
    const isZScoreAnomalous = Math.abs(zScore) > threshold;

    // Rolling window (last 7 counts) Z-score check
    const windowSize = Math.min(7, n); // Window size should not exceed the available data points
    const rollingMean = followerCountArray.slice(-windowSize).reduce((sum, data) => sum + data.count, 0) / windowSize;
    const rollingVariance = followerCountArray.slice(-windowSize).reduce((sum, data) => sum + Math.pow(data.count - rollingMean, 2), 0) / windowSize;
    const rollingStdDev = Math.sqrt(rollingVariance);
    const rollingZScore = calculateZScore(latestFollowerCount, rollingMean, rollingStdDev);
    const isRollingZScoreAnomalous = Math.abs(rollingZScore) > threshold;

    // Growth rate check
    const latestGrowthRate = ((latestFollowerCount - previousFollowerCount) / previousFollowerCount) * 100;
    const historicalGrowthRate = followerCountArray.slice(1).reduce((acc, data, i) => {
        const prevCount = followerCountArray[i].count;
        return acc + ((data.count - prevCount) / prevCount) * 100;
    }, 0) / (n - 1);
    const isGrowthRateAnomalous = Math.abs(latestGrowthRate - historicalGrowthRate) > growthRateThreshold;

    // Absolute jump check (for small datasets like [5, 6, 1000])
    const isAbsoluteJumpAnomalous = latestFollowerCount / previousFollowerCount > absoluteJumpThreshold;

    // Sudden drop check (detects if the follower count has dropped by more than 50%)
    const isSuddenDropAnomalous = (previousFollowerCount > 0 && (latestFollowerCount / previousFollowerCount) < dropThreshold);

    // Combined anomaly score
    const anomalyScore = [
        isZScoreAnomalous,
        isRollingZScoreAnomalous,
        isGrowthRateAnomalous,
        isAbsoluteJumpAnomalous,
        isSuddenDropAnomalous,
    ].filter(Boolean).length;

    return anomalyScore >= 2; // Flag as an anomaly if 2 or more indicators are triggered
}
