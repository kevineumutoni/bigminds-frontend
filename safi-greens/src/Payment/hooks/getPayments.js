import { useState, useEffect } from 'react';
import { fetchPaymentsData } from '../utils/paymentUtils';

const useGetPayments = (searchTerm, itemsPerPage, totalItems) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchPaymentsData();
        setPayments(data);
        setError(null);
      } catch (err) {
        console.error('Payments fetch failed:', err);
        setError(err?.message || 'An unexpected error occurred.');
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);
  
  useEffect(() => {
    if (!totalItems) return;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalItems, itemsPerPage, currentPage]);

  return { payments, loading, error, currentPage, setCurrentPage };
};

export default useGetPayments;
