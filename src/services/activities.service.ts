import { environment } from "@/environments/environment";
import { toast } from "sonner";
import * as userService from "./users.service";
import { Activity } from "@/interfaces/strava";

const apiUrl = environment.apiUrl;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
};

export const loadActivities = async (): Promise<Activity[] | undefined> => {
  const tokenValid = await checkStravaTokensValidity();
  if (!tokenValid) await userService.refreshStravaTokens();

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    toast.error("You are not identified");
    return;
  }

  const response = await fetch(`${apiUrl}/activities`, {
    headers,
  });

  return response.json();
};

const checkStravaTokensValidity = async () => {
  const tokenExpiresAt = localStorage.getItem("tokenExpiresAt");

  if (!tokenExpiresAt) return false;
  const now = new Date();
  const tokenExpiresAtDate = new Date(Number(tokenExpiresAt) * 1000);
  if (tokenExpiresAtDate < now) {
    return false;
  }
  return true;
};
