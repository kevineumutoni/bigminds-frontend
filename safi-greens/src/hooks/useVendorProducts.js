import { useFetchData } from './useFetchData';
import { fetchVendorProducts } from '../utils/api/fetchVendorProducts';

export function useVendorProducts() {
  const { data, loading, error } = useFetchData(fetchVendorProducts);
  return { vendorProducts: data, loading, error };
}
