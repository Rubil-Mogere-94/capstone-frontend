import apiClient from '../utils/apiClient';

export const searchLocation = async (query) => {
  try {
    const data = await apiClient(`/api/location/search?q=${query}`);
    return data;
  } catch (error) {
    console.error("Error searching location:", error);
    return [];
  }
};

export const getReverseGeocode = async (lat, lon) => {
  try {
    const data = await apiClient(`/api/location/reverse?lat=${lat}&lon=${lon}`);
    return data;
  } catch (error) {
    console.error("Error in reverse geocoding:", error);
    return null;
  }
};
