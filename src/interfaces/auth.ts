export interface User {
  uuid?: string;
  email: string;
  password: string;
  theme: string;
  athleteId?: number;
  strava_code?: string;
  last_login?: Date;
  strava_access_token?: string;
}

export interface SignupResponse {
  access_token: string;
}

export interface LoginResponse extends SignupResponse {
  theme: string;
}
