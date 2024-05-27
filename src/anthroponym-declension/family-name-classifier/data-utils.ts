/**
 * Represents a split of a dataset into training and validation sets.
 */
export type SplitData<T> = {
  trainingData: T[];
  validationData: T[];
};

/**
 * Splits an array of objects into training and validation datasets, grouped by a specific feature and shuffled randomly within each group.
 */
export function splitData<T>(data: T[], features: (keyof T)[], splitRatio: number): SplitData<T> {
  if (splitRatio < 0 || splitRatio > 1) {
    throw new TypeError('"splitRatio" must be between 0 and 1.');
  }

  // Group the data by feature value.
  const featureGroups = new Map<string, T[]>();
  for (const dataItem of data) {
    const featureGroup = features.map((splitKey) => dataItem[splitKey]).join('::');
    if (!featureGroups.has(featureGroup)) {
      featureGroups.set(featureGroup, []);
    }
    featureGroups.get(featureGroup)?.push(dataItem);
  }

  // Shuffle each feature group data.
  for (const featureData of featureGroups.values()) {
    shuffleData(featureData);
  }

  // Split each feature group into training and validation sets.
  const trainingData: T[] = [];
  const validationData: T[] = [];

  for (const featureData of featureGroups.values()) {
    const trainingDataSize = Math.round(splitRatio * featureData.length);
    trainingData.push(...featureData.slice(0, trainingDataSize));
    validationData.push(...featureData.slice(trainingDataSize));
  }

  // Shuffle the training and validation sets again to ensure randomness.
  shuffleData(trainingData);
  shuffleData(validationData);

  return { trainingData, validationData };
}

/**
 * Shuffles the given array in place using the Fisher-Yates shuffle algorithm.
 */
export function shuffleData<T>(data: T[]): void {
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
}
