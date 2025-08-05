const apiUrl = process.env.REACT_APP_BASE_URL;

export const fetchPaymentsData = async () => {
  try {
    if (!apiUrl) {
      throw new Error('API URL is not provided');
    }
    const response = await fetch(`${apiUrl}/payments`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Network response was not ok: ${response.status} - ${errorText || response.statusText}`
      );
    }
    const data = await response.json();
    if (!data || (Array.isArray(data) && data.length === 0)) {
      throw new Error('No payment data returned from API');
    }
    const transformedData = Array.isArray(data)
      ? data.map((payment) => ({
          ...payment,
          receiver_phone: payment.receiver_phone || 'Merchant (N/A)',
        }))
      : { ...data, receiver_phone: data.receiver_phone || 'Merchant (N/A)' };
    return transformedData;
  } catch (err) {
    console.error('fetchPaymentsData error:', err);
  }
};
