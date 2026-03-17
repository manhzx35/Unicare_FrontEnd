import axiosClient from '../lib/axiosClient';

export interface RegisterData {
  email: string;
  password?: string;
  displayName: string;
}

export interface LoginData {
  email: string;
  password?: string;
}

const authService = {
  login: async (data: LoginData) => {
    const response = await axiosClient.post('/auth/login', data);
    return response.data; // Usually contains JWT + User info
  },

  register: async (data: RegisterData) => {
    const response = await axiosClient.post('/auth/register', data);
    return response.data;
  },

  toggleAnonymous: async () => {
    const response = await axiosClient.put('/user/anonymous');
    return response.data;
  },

  verifyOtp: async (email: string, otp: string) => {
    const response = await axiosClient.post(`/auth/verify-otp?email=${email}&otp=${otp}`);
    return response.data;
  },

  resendOtp: async (email: string) => {
    const response = await axiosClient.post(`/auth/resend-otp?email=${email}`);
    return response.data;
  }
};

export default authService;
