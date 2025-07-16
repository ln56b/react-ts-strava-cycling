export interface User {
	id?: string;
	email: string;
	password: string;
	strava_code?: string;
	last_login?: Date;
	theme: string;
}

export interface SignupResponse {
	access_token: string;
}

export interface LoginResponse extends SignupResponse {
	theme: string;
}
