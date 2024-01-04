import { Badge, Box, Flex, Heading, Image, Tag, Wrap, WrapItem, } from "@chakra-ui/react";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useMemo } from "react";
import useStore, { StoreState } from "../../store";
import {
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
	StatGroup,
} from '@chakra-ui/react'
import "@cubing/icons";
import MapChart from "../charts/MapChart";

const delegate = {
	"candidate_delegate": "Junior Delegate",
	"delegate": "Delegate",
	"trainee_delegate": "Trainee Delegate",
	"senior_delegate": "Senior Delegate"
}

function countries(competitions: NonNullable<StoreState['competitionsByYear']>) {
	const countries2023 = (competitions!["2023"] ?? []).map(competition => competition.country_iso2).reduce(function (acc, curr) {
		// @ts-expect-error reducer
		return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
	}, {});
	const countriesRest = Object.keys(competitions).filter(year => year !== "2023").map(year => competitions[year]).flat().map(competition => competition.country_iso2).reduce(function (acc, curr) {
		// @ts-expect-error reducer
		return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
	}, {});
	let newCountries = 0;
	for (const country in countries2023) {
		if (!(country in countriesRest) && !country.startsWith("X")) newCountries++;
	}
	return { newCountries, countries2023, countriesRest }
}


const container = {
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delay: 0.5,
			delayChildren: 0.3,
			staggerChildren: 0.5
		}
	}
}

function getRandomInt(maximum: number, minimum?: number) {
	return Math.floor(Math.random() * (maximum - (minimum || 0) + 1)) + (minimum || 0);

}

export default function Thanks() {
	const [scope, animate] = useAnimate()
	const [flexScope, flexAnimate] = useAnimate()
	const user = useStore(state => state.user)
	const competitionsByYear = useStore(state => state.competitionsByYear)
	const positionsByYear = useStore(state => state.positionsByYear)
	const eventsCompetedInThisYear = (competitionsByYear!["2023"] ?? []).map(competition => competition.results?.map(result => result.event_id)).flat().reduce(function (acc, curr) {
		// @ts-expect-error reduer
		return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
	}, {});
	const eventsCompetedInLastYear = (competitionsByYear!["2022"] ?? []).map(competition => competition.results?.map(result => result.event_id)).flat().reduce(function (acc, curr) {
		// @ts-expect-error reduer
		return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
	}, {});
	console.log(Object.keys(eventsCompetedInThisYear).length - Object.keys(eventsCompetedInLastYear).length)

	const diffs = useMemo(() => ({
		countries: countries(competitionsByYear!),
		competitions: (competitionsByYear!["2023"]?.length ?? 0) - (competitionsByYear!["2022"]?.length ?? 0),
		podiums: (positionsByYear!["2023"]?.filter(p => p.pos <= 3).length ?? 0) - (positionsByYear!["2022"]?.filter(p => p.pos <= 3).length ?? 0),
		events: Object.keys(eventsCompetedInThisYear).length - Object.keys(eventsCompetedInLastYear).length
	}), [competitionsByYear, positionsByYear, eventsCompetedInThisYear, eventsCompetedInLastYear])
	console.log(diffs)

	useEffect(() => {
		const animation = async () => {
			for (let i = 0; i < scope.current.children.length; i++) {
				await animate(scope.current.children[i], { opacity: 0.5, zoom: 1 }, { duration: 0.05 })
				await animate(scope.current.children[i], { opacity: 0.9, zoom: 1.15 }, { duration: 0.05 })
			}

			await animate(scope.current, { opacity: 0.9 }, { duration: 1 })
			await animate(scope.current, { opacity: 0.05 }, { duration: 0.5 })
			await animate(scope.current, { opacity: 0.02 }, { duration: 0.3 })
			flexAnimate(flexScope.current, { opacity: 1 }, { duration: 0.5 })
		}

		animation()

	}, [scope])
	return (
		<>
			<Box h="100%" id="wrapped-final">
				<Box zIndex={-1} ref={scope} initial="hidden" animate="visible" variants={container} as={motion.div} h="100%" w="100%" position={"fixed"}>
					{new Array(6).fill(0).map((_, i) => (
						<Box opacity={"0"} position={"absolute"} key={`row1-${i}`} top={`${getRandomInt(20, 0)}%`} left={`${i * 20}%`} as={motion.div}>
							<Badge fontSize='3xl' colorScheme='secondary'>
								{user?.wca_id}
							</Badge>
						</Box>
					))}
					{new Array(6).fill(0).map((_, i) => (
						<Box opacity={"0"} position={"absolute"} key={`row2-${i}`} top={`${getRandomInt(40, 20)}%`} left={`${i * 20}%`} as={motion.div}>
							<Badge fontSize='3xl' colorScheme='primary'>
								Wrapped
							</Badge>
						</Box>
					))}
					{new Array(6).fill(0).map((_, i) => (
						<Box opacity={"0"} position={"absolute"} key={`row3-${i}`} top={`${getRandomInt(60, 40)}%`} left={`${i * 20}%`} as={motion.div}>
							<Badge fontSize='3em' colorScheme='secondary'>
								{user?.wca_id}
							</Badge>
						</Box>
					))}
					{new Array(6).fill(0).map((_, i) => (
						<Box opacity={"0"} position={"absolute"} key={`row4-${i}`} top={`${getRandomInt(80, 60)}%`} left={`${i * 20}%`} as={motion.div}>
							<Badge fontSize='3em' colorScheme='primary'>
								Wrapped
							</Badge>
						</Box>
					))}
					{new Array(6).fill(0).map((_, i) => (
						<Box opacity={"0"} position={"absolute"} key={`row4-${i}`} top={`${getRandomInt(100, 80)}%`} left={`${i * 20}%`} as={motion.div}>
							<Badge fontSize='3em' colorScheme='primary'>
								{user?.wca_id}
							</Badge>
						</Box>
					))}
				</Box>
				<Flex gap="2rem" align={"center"} mx={4} ref={flexScope} opacity={"0"} w="100%" h="100%" direction={"column"}>
					<Flex gap="0.2rem" align={"center"} direction={"column"}>
						<Heading size="lg">{user?.name}</Heading>
						<Heading size="md">{user?.wca_id}</Heading>
						<Wrap>

							{
								// @ts-expect-error user
								user?.teams.map(role =>
									<WrapItem key={role}>
										<Tag key={role} colorScheme={"blue"}>{role.friendly_id.toUpperCase()}</Tag>
									</WrapItem>)}

							{
								// @ts-expect-error user
								user?.delegate_status && <WrapItem><Tag key={user?.delegate_status} colorScheme={"green"}>{delegate[user.delegate_status]}</Tag></WrapItem>
							}
						</Wrap>
					</Flex>
					<Flex h="30%" gap="1rem" justify={"space-around"}>
						<Box display="contents" w="50%" h="100%">
							<Image borderRadius={"20%"} objectFit={"contain"} alt={user?.name} src={user?.avatar?.url} />
						</Box>
						<StatGroup w="50%" display={"grid"} gridTemplateColumns={"repeat(2, 1fr)"}>
							<Stat >
								<StatLabel>Competitions</StatLabel>
								<StatNumber>{competitionsByYear!["2023"].length}</StatNumber>
								<StatHelpText>
									<StatArrow color={diffs.competitions < 0 ? "red.300" : "green"} type={diffs.competitions < 0 ? "decrease" : "increase"} />
									{diffs.competitions}
								</StatHelpText>
							</Stat>

							<Stat>
								<StatLabel>Podiums</StatLabel>
								<StatNumber>{positionsByYear!["2023"] ? positionsByYear!["2023"].filter(p => p.pos <= 3).length : 0}</StatNumber>
								<StatHelpText>
									<StatArrow color={diffs.podiums < 0 ? "red.300" : "green"} type={diffs.podiums < 0 ? "decrease" : "increase"} />
									{diffs.podiums}
								</StatHelpText>
							</Stat>
							<Stat>
								<StatLabel>Countries</StatLabel>
								<StatNumber>{Object.keys(diffs.countries.countries2023).filter(key => !key.startsWith("X")).length}</StatNumber>
								{diffs.countries.newCountries > 0 && <StatHelpText>
									<StatArrow color={"green"} type={"increase"} />
									{diffs.countries.newCountries}
								</StatHelpText>}
							</Stat>
							<Stat>
								<StatLabel>Events</StatLabel>
								<StatNumber>{Object.keys(eventsCompetedInThisYear).length}</StatNumber>
								<StatHelpText>
									<StatArrow color={diffs.events < 0 ? "red.300" : "green"} type={diffs.events < 0 ? "decrease" : "increase"} />
									{diffs.events}
								</StatHelpText>
							</Stat>
						</StatGroup>
					</Flex>
					<MapChart />
					<Wrap mx={4} align="center" justify={"center"}>
						{Object.keys(eventsCompetedInThisYear).map(event =>
							<WrapItem key={event}>
								<Box w="32px" h="32px" as="span" className={`cubing-icon event-${event}`} />
							</WrapItem>)}
					</Wrap>
				</Flex >
			</Box>
		</>
	)

}