import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react"
import { useMemo } from "react"
import useStore from "../../store"
import { DelegatesEntity } from "../../types/competition"
import StaggeredDisplay from "../StaggeredDisplay"



export default function FavStaff() {
	const competitionsByYear = useStore(state => state.competitionsByYear)
	const favStaff = useMemo(() => {
		const competitions = competitionsByYear!["2024"]
		const delegates = competitions?.map(competition => competition.delegates ?? []).flat().sort((a, b) => a.id - b.id)
		let count = 1;
		let max = 0;
		let el: DelegatesEntity | undefined = undefined;
		for (let i = 1; i < delegates.length; ++i) {
			if (delegates[i].id === delegates[i - 1].id) {
				count++;
			} else {
				count = 1;
			}
			if (count > max) {
				max = count;
				el = delegates[i];
			}
		}
		return { delegate: el, count: delegates.filter(delegate => delegate.id === el?.id).length }
	}, [competitionsByYear])
	console.log(favStaff)

	return (

		<StaggeredDisplay textAlign={"center"} w="100%" h="100%" direction={"column"} gap="0.5rem">
			<Box w="100%" display={"inline-block"} opacity="0">
				<Text display={"inline-block"} fontSize={"lg"}>{`Out of all competitions in 2024`}</Text>
			</Box>
			<Box w="100%" display={"inline-block"} opacity="0">
				<Text display={"inline-block"} fontSize={"lg"}>{`One Delegate was your favorite`}</Text>
			</Box>
			<Box w="100%" display={"inline-block"} opacity="0">
				<Text display={"inline-block"} fontSize={"lg"}>{`You attended ${favStaff.count} competitions they delegated`}</Text>
			</Box>
			<Box w="100%" display={"inline-block"} opacity="0" my="1rem">
				<Flex gap="0.5rem" direction={"column"} align={"center"} justify={"center"}>
					<Heading as="h2" fontSize="xl" ml="1rem">{favStaff.delegate?.name}</Heading>
					<Heading fontSize="sm">{favStaff.delegate?.location}</Heading>
					{// Avatar and name in large font and their location
						<Image borderRadius={"10%"} maxH={"200px"} alt={favStaff.delegate?.name} src={favStaff.delegate?.avatar.url} />
					}
				</Flex>
			</Box>
			<Box w="100%" display={"inline-block"} opacity="0">
				<Button as="a" href={`mailto:${favStaff.delegate?.email}?subject=Thank%20you%20for%20Delegating!&body=Hi%20 ${favStaff.delegate?.name}%2C%0A%0AYou%20delegated%20the%20most%20amount%20of%20competitions%20I%20attended%20in%202024.%20I'm%20sending%20out%20this%20email%20as%20a%20token%20of%20appreciation.%20Thank%20you%20for%20all%20your%20hard%20work!%0A%0A`} colorScheme="primary">Say thanks</Button>
			</Box>
		</StaggeredDisplay>

	)
}