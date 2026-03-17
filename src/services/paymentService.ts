import axiosClient from '../lib/axiosClient';

const paymentService = {
  createPayment: async (amount: number, planName: string) => {
    const response = await axiosClient.post(`/payment/create-payment?amount=${amount}&planName=${planName}`);
    return response.data; // Expected: { paymentUrl: '...' }
  },

  verifyPayment: async (queryString: string) => {
    const response = await axiosClient.get(`/payment/vnpay-callback${queryString}`);
    return response.data;
  },

  getCurrentSubscription: async () => {
    const response = await axiosClient.get('/subscription/current');
    return response.data;
  },

  cancelSubscription: async () => {
    const response = await axiosClient.post('/subscription/cancel');
    return response.data;
  }
};

export default paymentService;
