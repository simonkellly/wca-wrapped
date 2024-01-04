import { Box, Flex, Badge, Text } from "@chakra-ui/react"
import useStore, { StoreState } from "../../store"
import StaggeredDisplay from "../StaggeredDisplay"
import { puzzle } from "../../store/cubeStore";
import { Cube } from "../Cube";
import { EventId, getEventName } from '@wca/helpers'
import { useEffect, useMemo, useState } from "react";
import { useToast } from '@chakra-ui/react'

import {
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
	StatGroup,
} from '@chakra-ui/react'
import { ResultsEntity } from "../../types/competition";


function getTotalAttempts(competitions: NonNullable<StoreState['competitionsByYear']>, filter: { year?: string, event?: string }) {
	if (filter.year && !filter.event) {
		return competitions[filter.year].map(competition => competition.results?.map(result => result.attempts?.length ?? 0)).flat().reduce((acc: number, curr: number | undefined) => acc + (curr ?? 0), 0)
	}
	if (filter.event && filter.year) {
		return competitions[filter.year].map(competition => competition.results?.filter(result => result.event_id === filter.event).map(result => result.attempts?.length ?? 0)).flat().reduce((acc: number, curr: number | undefined) => acc + (curr ?? 0), 0)

	}
	if (filter.event && !filter.year) {
		return Object.keys(competitions).map(year => year !== "2023" ? competitions[year] : []).flat().map(competition => competition.results?.filter(result => result.event_id === filter.event).map(result => result.attempts?.length ?? 0)).flat().reduce((acc: number, curr: number | undefined) => acc + (curr ?? 0), 0)
	}
}

function diffPercent(a: number, b: number) {
	return `${Math.abs(Math.round(((a - b) / Math.max(b, 1)) * 100))}%`
}

function getFinals(events: NonNullable<StoreState['positionsByYear']>, filter: { year?: string, event?: string, topN?: number }) {
	let finals: ResultsEntity[] = []
	if (filter.year && !filter.event) {
		finals = events[filter.year]
	}
	if (filter.year && filter.event) {
		finals = events[filter.year].filter(result => result.event_id === filter.event)
	}
	if (filter.event && !filter.year) {
		finals = Object.keys(events).map(year => year !== "2023" ? events[year] : []).flat().filter(result => result.event_id === filter.event)
	}
	if (filter.topN !== undefined) return finals.filter(result => result.pos <= filter.topN!).length
	else return finals.length
}

export default function CompetitionAndEvents() {
	const toast = useToast();
	useEffect(() => {
		const timeout = setTimeout(() => {
			toast({
				title: "Click on an event to see stats about it",
				duration: 4000,
				position: "bottom-right",
				colorScheme: "primary"
			})
		}, 4000)
		return () => clearTimeout(timeout)
	}, [])
	const competitions: NonNullable<StoreState['competitionsByYear']> = useStore(state => state.competitionsByYear) as NonNullable<StoreState['competitionsByYear']>
	const eventsCompetedInThisYear = competitions["2023"].map(competition => competition.results?.map(result => result.event_id)).flat().reduce(function (acc, curr) {
		// @ts-expect-error reduer
		return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
	}, {});
	const eventsCompetedRestYear: { [key: string]: unknown } = Object.keys(competitions).filter(year => year !== "2023").map(year => competitions[year]).flat().map(competition => competition.results?.map(result => result.event_id)).flat().reduce(function (acc, curr) {
		// @ts-expect-error reduer
		return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
	}, {});
	const positionsByYear = useStore(state => state.positionsByYear)
	function getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}
	const moves = ["z", "z'", "z2", "x", "x'", "x2", "y", "y'", "y2"]

	const [selected, setSelected] = useState("")


	const attempts = useMemo(() => {
		const curr = selected === "" ? getTotalAttempts(competitions, { year: "2023" }) : getTotalAttempts(competitions, { year: "2023", event: selected })
		const prev = selected === "" ? getTotalAttempts(competitions, { year: "2022" }) : getTotalAttempts(competitions, { year: "2022", event: selected })
		return { text: curr, diff: diffPercent(curr ?? 0, prev ?? 0), type: (curr ?? 0) < (prev ?? 0) ? "decrease" : "increase" }
	}, [selected, competitions])

	const finals = useMemo(() => {
		const curr = selected === "" ? getFinals(positionsByYear!, { year: "2023" }) : getFinals(positionsByYear!, { year: "2023", event: selected })
		const prev = selected === "" ? getFinals(positionsByYear!, { year: "2022" }) : getFinals(positionsByYear!, { year: "2022", event: selected })
		return { text: curr, diff: diffPercent(curr ?? 0, prev ?? 0), type: (curr ?? 0) < (prev ?? 0) ? "decrease" : "increase" }
	}, [selected, positionsByYear])
	const podiums = useMemo(() => {
		const curr = selected === "" ? getFinals(positionsByYear!, { year: "2023", topN: 3 }) : getFinals(positionsByYear!, { year: "2023", event: selected, topN: 3 })
		const prev = selected === "" ? getFinals(positionsByYear!, { year: "2022", topN: 3 }) : getFinals(positionsByYear!, { year: "2022", event: selected, topN: 3 })
		return { text: curr, diff: diffPercent(curr ?? 0, prev ?? 0), type: (curr ?? 0) < (prev ?? 0) ? "decrease" : "increase" }
	}, [selected, positionsByYear])

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
			<Box display={"inline-block"} opacity={"0"}>
				<StatGroup mb="0.5rem">
					<Stat>
						<StatLabel>Attempts</StatLabel>
						<StatNumber>{attempts.text}</StatNumber>
						<StatHelpText>
							<StatArrow type={attempts.type as "decrease" | "increase"} />
							{attempts.diff}
						</StatHelpText>
					</Stat>

					<Stat>
						<StatLabel>Finals</StatLabel>
						<StatNumber>{finals.text}</StatNumber>
						<StatHelpText>
							<StatArrow type={finals.type as "decrease" | "increase"} />
							{finals.diff}
						</StatHelpText>
					</Stat>
					<Stat>
						<StatLabel>Podiums</StatLabel>
						<StatNumber>{podiums.text}</StatNumber>
						<StatHelpText>
							<StatArrow type={podiums.type as "decrease" | "increase"} />
							{podiums.diff}
						</StatHelpText>
					</Stat>
				</StatGroup>
				<Flex flexWrap={"wrap"} gap="1rem" justifyItems={"center"} justify={"center"} mx={2}>
					{Object.keys(eventsCompetedInThisYear).map(event =>
						<Flex w="fit-content" as="button" position={"relative"} maxH="64px" className={event === selected ? "selected" : ""} onClick={() => setSelected(event)} align={"center"} justify={"center"} direction={"column"} key={`${event}-selected${selected}`}>
							<Cube alg={moves[getRandomInt(moves.length)]} className={`events`} hintFacelets="none" background="none" controlPanel="none" puzzle={puzzle[event]} />
							{!eventsCompetedRestYear[event] && <Badge minH={"10px"} top={0} zIndex={2000} position="absolute" fontSize={"0.5rem"} colorScheme="green" variant="solid">New</Badge>}
							<Text fontSize={"xs"}>{getEventName(event as EventId)}</Text>
						</Flex>
					)}
				</Flex>
			</Box>
		</StaggeredDisplay >
	)
}