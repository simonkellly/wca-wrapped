/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../../types";
import { WrappedState } from "../store";
import { Competition, ResultsEntity } from "../types/competition";
import { wcaApiFetch } from "./wcaApi";
// import { competitions2023, competitionsRest } from '../data'

function objectify<T>(arr: T[], mapKey: (i: T) => string) {
	return arr.reduce((acc: { [key: string]: T[] }, item) => {
		acc[mapKey(item)] = [...(acc[mapKey(item)] || []), item];
		return acc;
	}, {});
}

// This function takes a user and access token, fetches relevant data and creates the flow
export async function createWrapped(user: User, accessToken: string): Promise<{
	flows: WrappedState[];
	competitionsByYear: {
		[key: string]: Competition[];
	};
	positionsByYear: {
		[key: string]: ResultsEntity[];
	};
	countryId: string | undefined;
}> {
	console.log(`Creating Wrapped for user ${user.name}`)
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
	const wca_id = id ?? user.wca_id
	const res = await wcaApiFetch(`/me`, accessToken, {})
	const userCompetitions: Omit<Competition, "results">[] = await wcaApiFetch(`/persons/${wca_id}/competitions`, accessToken, {})
	const personalResults: ResultsEntity[] = await wcaApiFetch(`/persons/${wca_id}/results`, accessToken, {})
	const results: { [key: string]: any[] } = objectify(personalResults, (result) => result.competition_id)
	const competitions: Competition[] = userCompetitions.map((competition: any) => ({ ...competition, results: results[competition.id] }))
	const competitionsByYear = objectify<Competition>(competitions, (competition) => competition.id.substring(competition.id.length - 4))
	const positionsByYear = objectify<ResultsEntity>(competitions.flatMap(competition => (competition.results ?? []).filter(r => {
		return r.round_type_id === "f" || r.round_type_id === "c"
	})), result => result.competition_id.substring(result.competition_id.length - 4))
	if (!competitionsByYear["2024"]) {
		return {
			flows: [WrappedState.NoCompetitions, WrappedState.Thanks],
			competitionsByYear,
			positionsByYear,
			countryId: res?.me?.country?.id
		}
	}

	const flows: WrappedState[] = []

	if (competitionsByYear["2024"].length > 0) {
		flows.push(WrappedState.Competitions)
		flows.push(WrappedState.Events)
	}
	if (user.wca_id.includes("2024")) flows.push(WrappedState.Newcomer)
	if (competitionsByYear["2024"] && competitionsByYear["2024"].length > 0) {
		flows.push(WrappedState.FavStaff)
	}
	flows.push(WrappedState.Thanks)
	console.log(`Created Wrapped for user ${user.name}`)
	return {
		flows,
		competitionsByYear,
		positionsByYear,
		countryId: res?.me?.country?.id
	}
}