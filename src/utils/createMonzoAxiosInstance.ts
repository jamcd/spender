import axios from 'axios';

const createMonzoAxiosInstance = (tokenType: string, accessToken: string) =>
  axios.create({
    baseURL: 'https://api.monzo.com',
    headers: { Authorization: `${tokenType} ${accessToken}` }
  });

export default createMonzoAxiosInstance;
