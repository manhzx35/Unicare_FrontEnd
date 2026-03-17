import axiosClient from '../lib/axiosClient';

export interface TestSubmissionData {
  testType: string;
  answers: number[];
}

export interface TestSubmissionResponse {
  totalScore: number;
  riskLevel: string;
  isSosTriggered: boolean;
}

const testService = {
  submitTest: async (data: TestSubmissionData): Promise<TestSubmissionResponse> => {
    // If the user is a Guest (no token in localStorage), the axiosClient interceptor
    // will just send the request without the Authorization header.
    // If logged in, the token is automatically attached.
    const response = await axiosClient.post('/test/submit', data);
    return response.data;
  }
};

export default testService;
