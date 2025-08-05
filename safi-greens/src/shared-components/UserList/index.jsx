import { useState, useEffect } from "react";
import { fetchUsersData } from "../utils/fetchUsersData";

export function useFetchUsersData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchUsersData()
      .then(setUsers)
      .catch((err) => {
        setError(err.message);
        setUsers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { users, loading, error };
}