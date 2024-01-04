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
	const res = await wcaApiFetch(`/me`, accessToken, {})
	const userCompetitions: Omit<Competition, "results">[] = await wcaApiFetch(`/persons/${user.wca_id}/competitions`, accessToken, {})
	const personalResults: ResultsEntity[] = await wcaApiFetch(`/persons/${user.wca_id}/results`, accessToken, {})
	const results: { [key: string]: any[] } = objectify(personalResults, (result) => result.competition_id)
	const competitions: Competition[] = userCompetitions.map((competition: any) => ({ ...competition, results: results[competition.id] }))
	const competitionsByYear = objectify<Competition>(competitions, (competition) => competition.id.substring(competition.id.length - 4))
	const positionsByYear = objectify<ResultsEntity>(competitions.flatMap(competition => (competition.results ?? []).filter(r => r.round_type_id === "f")), result => result.competition_id.substring(result.competition_id.length - 4))
	if (!competitionsByYear["2023"]) {
		return {
			flows: [WrappedState.NoCompetitions, WrappedState.Thanks],
			competitionsByYear,
			positionsByYear,
			countryId: res?.me?.country?.id
		}
	}

	const flows: WrappedState[] = []

	if (competitionsByYear["2023"].length > 0) {
		flows.push(WrappedState.Competitions)
		flows.push(WrappedState.Events)
	}
	if (user.wca_id.includes("2023")) flows.push(WrappedState.Newcomer)
	if (competitionsByYear["2023"] && competitionsByYear["2023"].length > 0) {
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