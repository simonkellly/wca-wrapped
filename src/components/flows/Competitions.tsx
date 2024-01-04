import { Box, Flex, Text } from "@chakra-ui/react"
import useStore, { StoreState } from "../../store"
import CompetitionsChart from "../charts/CompetitionsChart"
import StaggeredDisplay from "../StaggeredDisplay"
import Mapchart from '../charts/MapChart'
import { countries_iso2 } from "../../consts"


export default function CompetitionAndEvents() {
	const competitions: NonNullable<StoreState['competitionsByYear']> = useStore(state => state.competitionsByYear) as NonNullable<StoreState['competitionsByYear']>
	// const results: NonNullable<StoreState['competitionsByYear']> = useStore(state => state.competitionsByYear) as NonNullable<StoreState['competitionsByYear']>
	const thisYear = (competitions["2023"] ?? []).length
	// @ts-expect-error reducer
	const countries = (competitions["2023"] ?? []).map(competition => competition.country_iso2).filter(iso2 => iso2 in countries_iso2).reduce(function (acc, curr) { return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc }, {});
	const chartText = (competitions["2023"] ?? []).length === (competitions["2022"] ?? []).length ? "That's as many competitions as 2022" : (competitions["2023"] ?? []).length > (competitions["2022"]?.length ?? 0) ? `That's ${Math.abs(competitions["2023"].length - (competitions["2022"] ?? []).length ?? 0)} more competitions than 2022` : `That's ${Math.abs(competitions["2023"].length - competitions["2022"].length ?? 0)} less competitions than 2022`

	return (
		<StaggeredDisplay textAlign={"center"} w="100%" h="100%" direction={"column"} gap="1rem">
			<Box w="100%" display={"inline-block"} opacity="0">
				<Text mr={"5px"} display={"inline-block"} fontSize={"lg"}>{`In 2023, you attended  `}</Text>
				<Text display={"inline-block"} as="b" fontSize="xl">{`${thisYear} ${thisYear === 1 ? "competition" : "competitions"}`}</Text>
			</Box>
			<Box w="100%" display={"inline-block"} opacity="0">
				<Text mr={"5px"} display={"inline-block"} fontSize={"lg"}>{`In ${Object.keys(countries).length} ${Object.keys(countries).length > 1 ? "countries" : "country"}`}</Text>
				<Mapchart />
			</Box>
			<Flex mt="1rem" align={"center"} justify={"center"} h="30%" w="100%" display={"none"} opacity="0">
				<Text>{chartText}</Text>
				<CompetitionsChart />
			</Flex>
		</StaggeredDisplay>
	)
}