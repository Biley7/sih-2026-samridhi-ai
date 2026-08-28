import { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export const useEMICalculator = () => {
  const [loading, setLoading] = useState(false);
  const [calculation, setCalculation] = useState(null);
  const [error, setError] = useState(null);

  const calculateEMI = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE}/calculator/emi`, params);
      setCalculation(response.data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Calculation failed.';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { calculateEMI, calculation, loading, error };
};