import { LoginResponse, SignupResponse } from '@/interfaces/auth';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_API_URL;

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!data.access_token) {
    toast.error(data.message);
    throw new Error(data.message);
  }
  return data;
};

export const signup = async (email: string, password: string): Promise<SignupResponse> => {
  const response = await fetch(`${apiUrl}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!data.access_token) {
    toast.error(data.message);
    throw new Error(data.message);
  }

  return data;
};
