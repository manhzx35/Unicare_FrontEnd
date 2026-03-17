import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import type { MoodCheckInRequest } from '../services/moodService';
import moodService from '../services/moodService';
import { useAuth } from '../context/AuthContext';

export function useMoodSubmit(onSuccessCallback?: () => void) {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const submitMood = useCallback(async (data: MoodCheckInRequest) => {
    if (!isAuthenticated) {
      toast.error('Please log in to check in your mood.');
      return false;
    }

    setIsLoading(true);
    try {
      await moodService.checkInMood(data);
      toast.success('MSG03: Mood logged successfully!');
      if (onSuccessCallback) {
        onSuccessCallback();
      }
      return true;
    } catch (error) {
      console.error('Failed to log mood:', error);
      toast.error('Failed to log mood. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, onSuccessCallback]);

  return { submitMood, isLoading };
}
