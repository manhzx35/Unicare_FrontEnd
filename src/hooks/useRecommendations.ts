import { useState, useCallback, useEffect } from 'react';
import firstAidService from '../services/firstAidService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchRecommendations = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }

    setIsLoading(true);
    try {
      const data = await firstAidService.getRecommendations();
      setRecommendations(data || []);
      if (!data || data.length === 0) {
        // MSG01 as per requirement when empty state
        toast('MSG01: No data found. Start your journey by checking in today!', {
          icon: 'ℹ️',
        });
      }
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      // We don't always want to show a toast error on mount, but could handle here
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchRecommendations();
    }
  }, [isAuthenticated, fetchRecommendations]);

  return { recommendations, isLoading, fetchRecommendations };
}
