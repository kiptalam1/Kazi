import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeoutErrorMessage: 'TimeOut was exceeded.Please try again later.',
});
