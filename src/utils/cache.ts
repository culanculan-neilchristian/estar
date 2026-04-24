// Shared cache for CSV data to break circular dependencies
import { ChurchData } from '@/types/church';

let cachedData: ChurchData[] | null = null;

export const getCachedChurches = () => cachedData;
export const setCachedChurches = (data: ChurchData[]) => {
  cachedData = data;
};
export const clearChurchCache = () => {
  cachedData = null;
};
