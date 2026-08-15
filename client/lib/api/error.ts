import axios from 'axios';
import type { ApiError } from './types';

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiError>(error)) {
    const message = error.response?.data.message;
    if (Array.isArray(message)) {
      return message.join(', ');
    }
    if (message) {
      return message;
    }
  }
  return 'Something went wrong. Please try again.';
}
