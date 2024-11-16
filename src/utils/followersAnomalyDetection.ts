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
    if (n < 2) return false;

    // Check extreme variations in the entire sequence
    const counts = followerCountArray.map(d => d.count);
    const maxCount = Math.max(...counts);
    const minCount = Math.min(...counts);
    const medianCount = [...counts].sort((a, b) => a - b)[Math.floor(n / 2)];

    // Add two new anomaly indicators for the entire sequence
    const hasExtremeVariation = maxCount / minCount > 1000; // 1000x difference between max and min
    const hasExtremeSpike = maxCount / medianCount > 100;   // 100x difference from median

    const latestFollowerCount = followerCountArray[n - 1].count;
    const previousFollowerCount = followerCountArray[n - 2].count;

    // Original calculations
    const mean = followerCountArray.reduce((sum, data) => sum + data.count, 0) / n;
    const variance = followerCountArray.reduce((sum, data) => sum + Math.pow(data.count - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);

    const zScore = calculateZScore(latestFollowerCount, mean, stdDev);
    const isZScoreAnomalous = Math.abs(zScore) > threshold;

    const windowSize = Math.min(7, n);
    const rollingMean = followerCountArray.slice(-windowSize).reduce((sum, data) => sum + data.count, 0) / windowSize;
    const rollingVariance = followerCountArray.slice(-windowSize).reduce((sum, data) => sum + Math.pow(data.count - rollingMean, 2), 0) / windowSize;
    const rollingStdDev = Math.sqrt(rollingVariance);
    const rollingZScore = calculateZScore(latestFollowerCount, rollingMean, rollingStdDev);
    const isRollingZScoreAnomalous = Math.abs(rollingZScore) > threshold;

    const latestGrowthRate = ((latestFollowerCount - previousFollowerCount) / previousFollowerCount) * 100;
    const historicalGrowthRate = followerCountArray.slice(1).reduce((acc, data, i) => {
        const prevCount = followerCountArray[i].count;
        return acc + ((data.count - prevCount) / prevCount) * 100;
    }, 0) / (n - 1);
    const isGrowthRateAnomalous = Math.abs(latestGrowthRate - historicalGrowthRate) > growthRateThreshold;

    // Modified thresholds for jump and drop checks
    const isAbsoluteJumpAnomalous = latestFollowerCount / previousFollowerCount > absoluteJumpThreshold;
    const isSuddenDropAnomalous = (previousFollowerCount > 0 && (latestFollowerCount / previousFollowerCount) < dropThreshold);

    // Check for spike-then-drop pattern in any consecutive triplet
    let hasSpikeDropPattern = false;
    for (let i = 1; i < n - 1; i++) {
        const prev = followerCountArray[i - 1].count;
        const current = followerCountArray[i].count;
        const next = followerCountArray[i + 1].count;

        if (current > prev * 100 && next < current * 0.1) { // 100x increase then 90% drop
            hasSpikeDropPattern = true;
            break;
        }
    }

    // Combined anomaly score with new indicators
    const anomalyScore = [
        isZScoreAnomalous,
        isRollingZScoreAnomalous,
        isGrowthRateAnomalous,
        isAbsoluteJumpAnomalous,
        isSuddenDropAnomalous,
        hasExtremeVariation,    // New
        hasExtremeSpike,        // New
        hasSpikeDropPattern     // New
    ].filter(Boolean).length;

    // Lower the threshold since we added more indicators
    return anomalyScore >= 2;
}
