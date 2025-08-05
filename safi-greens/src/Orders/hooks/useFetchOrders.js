import { useEffect, useState } from "react";
import { fetchOrders } from "../../utils/fetchOrders";

export const useFetchOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrdersData = async () => {
        try {
            setLoading(true);
            const response = await fetchOrders();
            setOrders(response);
        } catch (error) {
            setError(error.message ?? 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            await fetchOrdersData();
        })();
    }, []);

    return { loading, error, orders };
};