import { Gear } from '@/interfaces/strava';
import * as userService from './users.service';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_API_URL;

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
};

export const loadGears = async (): Promise<Gear[] | undefined> => {
  const tokenValid = await checkStravaTokensValidity();
  if (!tokenValid) await userService.refreshStravaTokens();

  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    toast.error('You are not identified');
    return;
  }

  const response = await fetch(`${apiUrl}/gears`, {
    headers,
  });

  const data = await response.json();
  return data;
};

export const updateGear = async (gear: Partial<Gear>): Promise<Gear | undefined> => {
  const response = await fetch(`${apiUrl}/gears/${gear.uuid}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify(gear),
  });

  const data = await response.json();
  return data;
};

export const deleteGear = async (gearUuid: string): Promise<boolean> => {
  const response = await fetch(`${apiUrl}/gears/${gearUuid}`, {
    headers,
    method: 'DELETE',
  });

  return response.ok;
};

const checkStravaTokensValidity = async () => {
  const tokenExpiresAt = localStorage.getItem('tokenExpiresAt');

  if (!tokenExpiresAt) return false;
  const now = new Date();
  const tokenExpiresAtDate = new Date(Number(tokenExpiresAt) * 1000);
  if (tokenExpiresAtDate < now) {
    return false;
  }
  return true;
};
