export const getOrdersPerDayData = (orders) => {
    const dayCountMap = {};
    orders.forEach((order) => {
      const date = new Date(order.order_date);
      const dayKey = date.toISOString().slice(0, 10); 
      dayCountMap[dayKey] = (dayCountMap[dayKey] || 0) + 1;
    });

    return Object.entries(dayCountMap).map(([date, count]) => ({
      date,
      count,
    }));
  };