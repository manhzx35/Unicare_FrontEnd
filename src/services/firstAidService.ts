import axiosClient from '../lib/axiosClient';

export interface ExerciseCompletionData {
  exerciseId: string;
  completionPercentage: number;
}

const firstAidService = {
  getRecommendations: async (): Promise<string[]> => {
    const response = await axiosClient.get('/first-aid/recommendations');
    return response.data;
  },

  completeExercise: async (data: ExerciseCompletionData) => {
    const response = await axiosClient.post('/first-aid/complete', data);
    return response.data;
  }
};

export default firstAidService;
