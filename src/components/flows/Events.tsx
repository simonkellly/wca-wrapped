import { Box, Text } from "@chakra-ui/react"
import useStore, { StoreState } from "../../store"
import StaggeredDisplay from "../StaggeredDisplay"


export default function CompetitionAndEvents() {
	const competitions: NonNullable<StoreState['competitionsByYear']> = useStore(state => state.competitionsByYear) as NonNullable<StoreState['competitionsByYear']>
	const eventsCompetedInThisYear = competitions["2023"].map(competition => competition.results?.map(result => result.event_id)).flat().reduce(function (acc, curr) {
		// @ts-expect-error reduer
		return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
	}, {});
	const eventCount = Object.keys(eventsCompetedInThisYear).length
	// @ts-expect-error reducer
	const totalRounds = Object.values(eventsCompetedInThisYear).reduce((acc, curr) => acc + curr, 0)

	return (
		<StaggeredDisplay textAlign={"center"} w="100%" h="100%" direction={"column"} gap="1rem">
			<Box w="100%" display={"inline-block"} opacity="0">
				<Text mr={"5px"} display={"inline-block"} fontSize={"lg"}>{`You competed in  `}</Text>
				<Text display={"inline-block"} as="b" fontSize="xl">{`${eventCount} ${eventCount === 1 ? "event" : "events"}`}</Text>
			</Box>
			<Box w="100%" display={"inline-block"} opacity="0">
				<Text as="b" display={"inline-block"} fontSize={"xl"}>{`Totaling ${totalRounds} rounds`}</Text>
			</Box>
		</StaggeredDisplay>
	)
}