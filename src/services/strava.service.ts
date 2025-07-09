import { Activity } from "@/interfaces/strava";
import { useActivitiesStore } from "@/stores/activitiesStore";
import { environment } from "@/environments/environment";
import { toast } from "sonner";

const apiUrl = environment.apiUrl;

export const loadActivities = async (): Promise<Activity[] | undefined> => {
  const tokenValid = await checkStravaTokensValidity();
  if (!tokenValid) await refreshStravaTokens();

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    toast.error("You are not identified");
    return;
  }

  let page = 1;
  const per_page = 100;
  const allActivities: Activity[] = [];

  try {
    while (true) {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        per_page: per_page.toString(),
      });
      const url = `https://www.strava.com/api/v3/athlete/activities?${queryParams.toString()}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data: Activity[] = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid response from Strava API");
      }

      allActivities.push(...data);

      if (data.length < per_page) break;

      page++;
    }

    useActivitiesStore.setState({ activities: allActivities });
    return allActivities;
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    toast.error(err.message);
  }
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

const refreshStravaTokens = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    toast.error("You are not identified");
    return;
  }
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    toast.error("You are not identified");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/users/strava-refresh-tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    });

    const res = await response.json();
    if (res) {
      const { access_token, refresh_token, expires_at } = res;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      localStorage.setItem("tokenExpiresAt", expires_at);
      return res;
    }
    throw new Error(res.message);
  } catch (err) {
    console.log("Error", err);
  }
};
