import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export const usePartnerLocator = () => {
  const [loading, setLoading] = useState(false);
  const [partners, setPartners] = useState([]);
  const [error, setError] = useState(null);

  const fetchNearbyPartners = useCallback(async (lat, lng, radiusKm = 15, schemeType = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE}/partners/nearby`, {
        params: { lat, lng, radiusKm, schemeType }
      });
      setPartners(response.data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to locate channel partners.';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchNearbyPartners, partners, loading, error };
};