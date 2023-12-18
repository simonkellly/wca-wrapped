import { Box, Flex } from '@chakra-ui/react';
import { randomScrambleForEvent } from 'cubing/scramble';
import { TwistyPlayer } from 'cubing/twisty';
import { motion, useAnimate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AnimatedTitle from '../../components/AnimatedTitle';
import { Cube } from '../../components/Cube';
import AuthProvider from '../../providers/AuthProvider';


export default function Root() {
	const [cubeScope, cubeAnimate] = useAnimate();
	const [divScope,] = useAnimate();

	const [twisty, setTwisty] = useState<TwistyPlayer>();
	const alg = useRef<string[]>([])


	async function animation() {
		await cubeAnimate(cubeScope.current, { scale: [5, 1], opacity: [0, 1], y: [0, 1] }, { duration: 1.5 })
		// await divAnimate(divScope.current, { opacity: [0, 1] }, { duration: 0.5 })
		await cubeAnimate(cubeScope.current, {
			x: ['0%', '5%', '0%'], // Move the shapes along the x-axis
			rotateZ: [0, 360], // Rotate from 0 degrees to 360 degrees on the z-axis
		}, {
			repeat: Infinity, // Repeat the animation indefinitely
			duration: 20, // Animation duration in seconds
			ease: 'easeInOut', // Ease-in-out for a smoother animation
			repeatType: 'reverse', // Reverse the animation on each repeat
		})
	}

	useEffect(() => {
		animation()
	}, [])

	useEffect(() => {
		let interval: number;
		if (twisty) {
			interval = setInterval(() => {
				if (alg.current.length > 0) {
					twisty.experimentalAddMove(alg.current.shift()!)
				}
				else {
					randomScrambleForEvent('333').then(scramble =>
						alg.current = scramble.toString().split(' ')
					)
				}
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [twisty])

	return (
		<AuthProvider>
			<Box h="100vh" w="100vw" overflow={"hidden"} background={"rgb(34,193,195) radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);"}>
				<Box m="auto" as={motion.div} w="fit-content" ref={cubeScope}>
					<Cube onTwistyInit={twisty => setTwisty(twisty)} controlPanel='none' hintFacelets='none' background="none" />
				</Box>

				<Flex direction={"column"} as={motion.div} animate={{ opacity: 1, transition: { staggerChildren: 1 } }} w="100%" align={"center"} justify={"center"} ref={divScope}>
					<AnimatedTitle text={"Cubing Wrapped 2023"} />
					<Outlet />
				</Flex>
			</Box>
		</AuthProvider >
	);
}
