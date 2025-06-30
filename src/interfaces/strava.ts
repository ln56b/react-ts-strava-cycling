interface Athlete {
	id: number;
	resource_state: number;
}

interface ActivityMap {
	id: string;
	summary_polyline?: string;
	resource_state?: number;
}

export interface Activity {
	id: number;
	resource_state: number;
	athlete: Athlete;
	name: string;
	achievement_count: number;
	athlete_count: number;
	average_speed: number;
	comment_count: number;
	commute: boolean;
	display_hide_heartrate_option: boolean;
	distance: number;
	elapsed_time: number;
	elev_high: number;
	elev_low: number;
	end_latlng: [number, number];
	external_id: string;
	flagged: boolean;
	from_accepted_tag: boolean;
	gear_id: string | null;
	has_heartrate: boolean;
	has_kudoed: boolean;
	heartrate_opt_out: boolean;
	kudos_count: number;
	location_city: string | null;
	location_country: string | null;
	location_state: string | null;
	manual: boolean;
	map: ActivityMap;
	max_speed: number;
	moving_time: number;
	photo_count: number;
	pr_count: number;
	private: boolean;
	sport_type: string;
	start_date: string;
	start_date_local: string;
	start_latlng: [number, number];
	timezone: string;
	total_elevation_gain: number;
	total_photo_count: number;
	trainer: boolean;
	type: string;
	upload_id: number;
	upload_id_str: string;
	utc_offset: number;
	visibility: string;
	workout_type: number;
}
