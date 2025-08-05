import { useFetchData } from './useFetchData';
import { fetchUsersData } from '../utils/api/fetchUserData';

export function useFetchUsersData() {
  const { data, loading, error } = useFetchData(fetchUsersData);
  return { users: data, loading, error };
}
