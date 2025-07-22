import { Theme } from '@/interfaces/project';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_API_URL;

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
};

export const updateTheme = async (theme: Theme): Promise<Theme> => {
  const response = await fetch(`${apiUrl}/users/theme`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ theme }),
  });

  return response.json();
};

export const refreshStravaTokens = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    toast.error('You are not identified');
    return;
  }
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    toast.error('You are not identified');
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/users/strava-refresh-tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    });

    const res = await response.json();
    if (res) {
      const { access_token, refresh_token, expires_at } = res;
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      localStorage.setItem('tokenExpiresAt', expires_at);
      return res;
    }
    throw new Error(res.message);
  } catch (err) {
    console.log('Error', err);
  }
};

export const postStravaToken = async (code: string) => {
  const response = await fetch(`${apiUrl}/users/strava-token`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ code }),
  });

  return response.json();
};
