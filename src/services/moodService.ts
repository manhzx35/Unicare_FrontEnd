import axiosClient from '../lib/axiosClient';

export interface MoodCheckInRequest {
  score: number;
  tags: string[];
  note?: string;
}

export interface MoodHistory {
  id: string;
  userId: string;
  score: number;
  tags: string[];
  note?: string;
  createdAt: string;
}

const moodService = {
  checkInMood: async (data: MoodCheckInRequest): Promise<MoodHistory> => {
    const response = await axiosClient.post('/mood/check-in', data);
    return response.data;
  },

  getMoodHistory: async (): Promise<MoodHistory[]> => {
    const response = await axiosClient.get('/mood/history');
    return response.data;
  }
};

export default moodService;
