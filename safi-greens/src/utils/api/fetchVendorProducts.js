
const apiUrl=process.env.REACT_APP_BASE_URL;
export const fetchVendorProducts = async () => {
  try {
    const response = await fetch(`${apiUrl}/vendor-products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
