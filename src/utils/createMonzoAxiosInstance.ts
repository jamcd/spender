import axios from 'axios';

const createMonzoAxiosInstance = (tokenType?: string, accessToken?: string) =>
  axios.create({
    baseURL: 'https://api.monzo.com',
    ...(tokenType && accessToken ? { headers: { Authorization: `${tokenType} ${accessToken}` } } : {})
  });

export default createMonzoAxiosInstance;
