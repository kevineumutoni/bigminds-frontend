import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
 fetchUsers,
 fetchOrders,
 fetchPayments,
 fetchVendorProducts,
} from "../utils/api/fetchDashboardData";


export default function useDashboardData(period = "monthly") {
 const [stats, setStats] = useState({});
 const [salesHistory, setSalesHistory] = useState([]);
 const [transactions, setTransactions] = useState([]);
 const [productAnalytics, setProductAnalytics] = useState([]);
 const [categoriesData, setCategoriesData] = useState([]);
 const [loading, setLoading] = useState(true);


 const location = useLocation();


 useEffect(() => {
   let isMounted = true;
   async function getData() {
     setLoading(true);


     const [users, orders, payments, vendorProducts] = await Promise.all([
       fetchUsers(),
       fetchOrders(),
       fetchPayments(),
       fetchVendorProducts(),
     ]);


     // Stats
     const newCustomers = users.filter((u) => u.user_type === "customer").length;
     const totalVendors = users.filter((u) => u.user_type === "vendor").length;
     const totalOrdersPlaced = orders.length;
     const totalProducts = vendorProducts.length;


     const now = new Date();
     let salesFiltered = payments.filter((p) => p.status === "success");
     let monthlySales = salesFiltered
       .filter((p) => {
         const d = new Date(p.transaction_date);
         return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
       })
       .reduce((sum, p) => sum + parseFloat(p.amount), 0);


     // Weekly Sales
     const startOfWeek = new Date(now);
     startOfWeek.setDate(now.getDate() - now.getDay());
     let weeklySales = salesFiltered
       .filter((p) => {
         const d = new Date(p.transaction_date);
         return d >= startOfWeek && d <= now;
       })
       .reduce((sum, p) => sum + parseFloat(p.amount), 0);


     // Sales History
     let salesHistoryData = [];
     if (period === "monthly") {
       for (let i = 1; i <= 31; i++) {
         const daySales = salesFiltered
           .filter((p) => {
             const d = new Date(p.transaction_date);
             return (
               d.getMonth() === now.getMonth() &&
               d.getFullYear() === now.getFullYear() &&
               d.getDate() === i
             );
           })
           .reduce((sum, p) => sum + parseFloat(p.amount), 0);
         salesHistoryData.push({
           label: `Day ${i}`,
           value: daySales,
           quantity: daySales,
         });
       }
     } else {
       for (let w = 0; w < 4; w++) {
         const weekStart = new Date(now);
         weekStart.setDate(now.getDate() - now.getDay() - 7 * w);
         const weekEnd = new Date(weekStart);
         weekEnd.setDate(weekStart.getDate() + 6);
         const weekSales = salesFiltered
           .filter((p) => {
             const d = new Date(p.transaction_date);
             return d >= weekStart && d <= weekEnd;
           })
           .reduce((sum, p) => sum + parseFloat(p.amount), 0);
         salesHistoryData.unshift({
           label: `Week ${4 - w}`,
           value: weekSales,
           quantity: weekSales,
         });
       }
     }


     // Recent Transactions
     const sortedPayments = [...salesFiltered].sort(
       (a, b) =>
         new Date(b.transaction_date) - new Date(a.transaction_date)
     );
     const transactionsData = sortedPayments.slice(0, 6);


     // Product Analytics
     let productMap = {};
     orders.forEach((order) => {
       order.items.forEach((item) => {
         const key = item.product.name;
         if (!productMap[key]) {
           productMap[key] = { label: item.product.name, profit: 0, quantity: 0, category: item.product.category };
         }
         productMap[key].profit +=
           parseFloat(item.price_at_order) * parseInt(item.quantity);
         productMap[key].quantity += parseInt(item.quantity);
       });
     });
     const productAnalyticsData = Object.values(productMap)
       .sort((a, b) => b.profit - a.profit)
       .slice(0, 8);


     // Top categories
     const categoryMap = {};
     Object.values(productMap).forEach((prod) => {
       if (prod.category) {
         categoryMap[prod.category] = (categoryMap[prod.category] || 0) + prod.quantity;
       }
     });
     const categoriesDataArr = Object.entries(categoryMap).map(([category, count]) => ({
       category,
       count,
     }));


     if (isMounted) {
       setStats({
         newCustomers,
         totalVendors,
         totalOrdersPlaced,
         totalProducts,
         monthlySales,
         weeklySales,
       });
       setSalesHistory(salesHistoryData);
       setTransactions(transactionsData);
       setProductAnalytics(productAnalyticsData);
       setCategoriesData(categoriesDataArr);
       setLoading(false);
     }
   }
   getData();
   return () => {
     isMounted = false;
   };
 }, [period, location.pathname]); 


 return {
   stats,
   salesHistory,
   transactions,
   productAnalytics,
   categoriesData,
   loading,
 };
}



