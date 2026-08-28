import { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export const useSchemeRecommender = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getRecommendations = async (userProfile) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE}/schemes/recommend`, userProfile);
      setData(response.data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch scheme recommendations.';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { getRecommendations, data, loading, error };
};