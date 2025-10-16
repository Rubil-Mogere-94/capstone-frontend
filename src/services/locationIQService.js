const ACCESS_TOKEN = 'pk.d660c139248f799fac0643567e846cde';

export const searchLocation = async (query) => {
  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/search.php?key=${ACCESS_TOKEN}&q=${query}&format=json`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching location:", error);
    return [];
  }
};
