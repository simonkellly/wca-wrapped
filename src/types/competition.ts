export interface Competition {
	id: string;
	name: string;
	registration_open: string;
	registration_close: string;
	announced_at: string;
	start_date: string;
	end_date: string;
	competitor_limit: number;
	cancelled_at?: null;
	url: string;
	website: string;
	short_name: string;
	city: string;
	venue_address: string;
	venue_details: string;
	latitude_degrees: number;
	longitude_degrees: number;
	country_iso2: string;
	event_ids?: (string)[] | null;
	delegates?: (DelegatesEntity)[] | null;
	organizers?: (OrganizersEntity)[] | null;
	class: string;
	results?: (ResultsEntity)[] | null;
}
export interface DelegatesEntity {
	id: number;
	created_at: string;
	updated_at: string;
	name: string;
	delegate_status: string;
	wca_id: string;
	gender: string;
	country_iso2: string;
	url: string;
	country: Country;
	email: string;
	location: string;
	senior_delegate_id: number;
	class: string;
	teams?: (TeamsEntity | null)[] | null;
	avatar: Avatar;
}
export interface Country {
	id: string;
	name: string;
	continentId: string;
	iso2: string;
}
export interface TeamsEntity {
	id: number;
	friendly_id: string;
	leader: boolean;
	name: string;
	senior_member: boolean;
	wca_id: string;
	avatar: Avatar1;
}
export interface Avatar1 {
	url: string;
	thumb: Thumb;
}
export interface Thumb {
	url: string;
}
export interface Avatar {
	url: string;
	pending_url: string;
	thumb_url: string;
	is_default: boolean;
}
export interface OrganizersEntity {
	id: number;
	created_at: string;
	updated_at: string;
	name: string;
	delegate_status?: string | null;
	wca_id?: string | null;
	gender: string;
	country_iso2: string;
	url: string;
	country: Country;
	email?: string | null;
	location?: string | null;
	senior_delegate_id?: number | null;
	class: string;
	teams?: (TeamsEntity1 | null)[] | null;
	avatar: Avatar;
}
export interface TeamsEntity1 {
	id: number;
	friendly_id: string;
	leader: boolean;
	name: string;
	senior_member: boolean;
	wca_id: string;
	avatar: Avatar1;
}
export interface ResultsEntity {
	id: number;
	pos: number;
	best: number;
	average: number;
	name: string;
	country_iso2: string;
	competition_id: string;
	event_id: string;
	round_type_id: string;
	format_id: string;
	wca_id: string;
	attempts?: (number)[] | null;
	best_index: number;
	worst_index: number;
	regional_single_record?: null;
	regional_average_record?: null;
}
