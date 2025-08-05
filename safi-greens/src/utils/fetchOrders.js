const baseUrl = process.env.REACT_APP_BASE_URL;
const token = process.env.REACT_APP_API_TOKEN;

export const fetchOrders = async () => {
  try {
    const response = await fetch(`${baseUrl}/orders/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Failed to fetch orders ${response.status}: ${errorData.detail || response.statusText}`
      );
    }

  
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
};