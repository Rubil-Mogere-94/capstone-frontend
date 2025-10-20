import axios from 'axios';

export const getWikipediaSummary = async (title) => {
  try {
    const response = await axios.get('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title));
    return response.data;
  } catch (error) {
    console.error("Error fetching Wikipedia summary:", error);
    return null;
  }
};
