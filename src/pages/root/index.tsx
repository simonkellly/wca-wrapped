import { Box, Container, Flex, IconButton } from '@chakra-ui/react';
import { TwistyPlayer } from 'cubing/twisty';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import { useEffect, useState, useRef, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import AnimatedTitle from '../../components/AnimatedTitle';
import { Cube } from '../../components/Cube';
import AuthProvider from '../../providers/AuthProvider';
import { Scrambow } from 'scrambow';
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import useStore, { WrappedState } from '../../store';
import ControllerButton from '../../components/flows/controllerButton';
import useCubeStore, { puzzle } from '../../store/cubeStore';
import SettingsModal from '../../components/SettingsModal';



export default function Root() {
	const cube = useCubeStore(state => state.puzzleType)
	const [cubeScope, cubeAnimate] = useAnimate();
	const [divScope, divAnimate] = useAnimate();
	const [twisty, setTwisty] = useState<TwistyPlayer>();
	const alg = useRef<string[]>([])
	const scrambow = useMemo(() => new Scrambow(), [])

	const { index } = useStore(state => state.wrappedState)
	const flows = useStore(state => state.flows)
	const changeWrappedState = useStore(state => state.changeWrappedState)
	const wrappedState = useStore(state => state.wrappedState)

	async function animation() {
		await cubeAnimate(cubeScope.current, { scale: [5, 1], opacity: [0, 1], y: ["100%", "0%"], rotate: [0, 360] }, { duration: 1.5 })
		await divAnimate(divScope.current, { display: ["none", "grid"] }, { duration: 0.5 })
		await cubeAnimate(cubeScope.current, {
			x: ['0%', '5%', '0%'], // Move the shapes along the x-axis
			rotateZ: [-40, 40], // Rotate from 0 degrees to 360 degrees on the z-axis
		}, {
			repeat: Infinity, // Repeat the animation indefinitely
			duration: 20, // Animation duration in seconds
			ease: 'easeInOut', // Ease-in-out for a smoother animation
			repeatType: 'reverse', // Reverse the animation on each repeat
		})
	}

	useEffect(() => {
		if (twisty) {
			alg.current = []
			twisty.puzzle = puzzle[cube]
			twisty.alg = ""
		}
	}, [cube, twisty])

	useEffect(() => {
		animation()
	}, [])

	useEffect(() => {
		const interval = setInterval(() => {
			if (alg.current.length > 0) {
				twisty?.experimentalAddMove(alg.current.shift()!)
			}
			else {
				alg.current = scrambow.setType(cube).get(1)[0].scramble_string.split(" ").filter(x => x !== "")
			}
		}, 1000);

		return () => {
			console.log("clearing")
			clearInterval(interval);
		}
	}, [twisty, cube])

	return (
		<AuthProvider>
			<SettingsModal />
			<AnimatePresence>
				<Flex direction={"row"} justify={"center"} align="center" bg="gray.800" w="100vw" h="100vh">
					<Container px={{ base: '0', lg: 4 }} h="98%" display={"flex"} alignContent={"center"} alignItems={"center"} gap="1rem" >
						<IconButton
							onClick={() => changeWrappedState("left")}
							isDisabled={index <= 0}
							display={{
								base: "none",
								md: "block",
							}}
							variant='outline'
							colorScheme='primary'
							size={"sm"}
							aria-label='back' icon={<ArrowBackIcon />} />
						<Box id="wrapped-container" borderRadius={"2%"} w="100%" h="100%" overflow={"hidden"} background={"rgb(34,193,195) radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);"}>
							{wrappedState.state !== WrappedState.Thanks &&
								<Flex justify={"center"} w="100%" m="auto" as={motion.div} ref={cubeScope}>
									<Cube className='twisty' key={puzzle[cube]} puzzle={puzzle[cube]} onTwistyInit={twisty => setTwisty(twisty)} controlPanel='none' hintFacelets='none' background="none" />
								</Flex>}
							<Box mt={wrappedState.state === WrappedState.Thanks ? "1rem" : "0"} h={{
								base: "calc(100% - 100px)",
								lg: "calc(100% - 200px)"
							}} w="100%" display={"none"} gridTemplateAreas={`"title" "content" "buttons"`} gridTemplateRows={{
								base: "10% 80% 10%",
								lg: "10% 90% 0%"
							}} as={motion.div} animate={{ opacity: 1, transition: { staggerChildren: 2 } }} ref={divScope}>
								<AnimatedTitle text={"Cubing Wrapped 2023"} />
								<Outlet />
								<ControllerButton />
							</Box>
						</Box>
						<IconButton
							onClick={() => changeWrappedState("right")}
							isDisabled={index >= flows.length - 1 || index === -1}
							display={{
								base: "none",
								md: "block",
							}}
							variant='outline'
							colorScheme='primary'

							size={"sm"} aria-label='next' icon={<ArrowForwardIcon />} />
					</Container>
				</Flex>
			</AnimatePresence >
		</AuthProvider >
	);
}
