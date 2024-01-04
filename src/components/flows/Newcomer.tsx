import { Badge, Box, Heading, Text } from "@chakra-ui/react";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import StaggeredDisplay from "../StaggeredDisplay";
import { newcomers, total } from '../../consts/newcomer'
import useStore from "../../store";


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


export default function Newcomer() {
	const [scope, animate] = useAnimate()
	const [complete, setComplete] = useState(false)
	const countryId = useStore(state => state.countryId)

	useEffect(() => {
		const animation = async () => {
			for (let i = 0; i < scope.current.children.length; i++) {
				await animate(scope.current.children[i], { opacity: 0.5, zoom: 1 }, { duration: 0.05 })
				await animate(scope.current.children[i], { opacity: 0.9, zoom: 1.15 }, { duration: 0.05 })
			}

			await animate(scope.current, { opacity: 0.9 }, { duration: 1 })
			await animate(scope.current, { opacity: 0.05 }, { duration: 0.5 })
			await animate(scope.current, { opacity: 0.03 }, { duration: 0.3 })
			setComplete(true)
		}

		animation()

	}, [scope])

	return (
		<>
			<Box zIndex={-1} ref={scope} initial="hidden" animate="visible" variants={container} as={motion.div} h="100%" w="100%" position={"fixed"}>
				{new Array(6).fill(0).map((_, i) => (
					<Box opacity={"0"} position={"absolute"} key={`row1-${i}`} top={`${getRandomInt(20, 0)}%`} left={`${i * 20}%`} as={motion.div}>
						<Badge fontSize='3xl' colorScheme='secondary'>
							2023
						</Badge>
					</Box>
				))}
				{new Array(4).fill(0).map((_, i) => (
					<Box opacity={"0"} position={"absolute"} key={`row2-${i}`} top={`${getRandomInt(40, 20)}%`} left={`${i * 20}%`} as={motion.div}>
						<Badge fontSize='3xl' colorScheme='primary'>
							Newcomer
						</Badge>
					</Box>
				))}
				{new Array(6).fill(0).map((_, i) => (
					<Box opacity={"0"} position={"absolute"} key={`row3-${i}`} top={`${getRandomInt(60, 40)}%`} left={`${i * 20}%`} as={motion.div}>
						<Badge fontSize='3em' colorScheme='secondary'>
							2023
						</Badge>
					</Box>
				))}
				{new Array(4).fill(0).map((_, i) => (
					<Box opacity={"0"} position={"absolute"} key={`row4-${i}`} top={`${getRandomInt(80, 60)}%`} left={`${i * 20}%`} as={motion.div}>
						<Badge fontSize='3em' colorScheme='primary'>
							Newcomer
						</Badge>
					</Box>
				))}
			</Box>
			{complete &&
				<StaggeredDisplay textAlign={"center"} w="100%" h="100%" direction={"column"} gap="2rem">
					<Box w="100%" opacity={"0"} display={"inline-block"}>
						<Heading size={"2xl"}> 🎉🎉🎉🎉🎉🎉🎉</Heading>
						<Heading size={"xl"}> Congratulations on your first year competing! </Heading>
						<Heading size={"2xl"}> 🎉🎉🎉🎉🎉🎉🎉</Heading>
					</Box>
					<Box opacity={"0"} display={"inline-block"}>

						<Text mx={4} fontSize={"lg"}>{`You were one of ${total.toLocaleString()} new WCA Cubers in 2023`}</Text>

					</Box>
					{newcomers[countryId as string] && <Box opacity={"0"} display={"inline-block"}>

						<Text mx={4} fontSize={"lg"}>{`You were one of ${newcomers[countryId as string].toLocaleString()} in ${countryId}`}</Text>

					</Box>
					}
				</StaggeredDisplay>
			}
		</>


	)
}