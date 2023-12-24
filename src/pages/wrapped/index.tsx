import { Flex, FlexProps } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import WrappedController from "../../components/flows/controller";
import { useAuth } from "../../providers/AuthProvider";
import useStore from "../../store";

const MotionFlex = motion<Omit<FlexProps, "transition">>(Flex);

export default function Wrapped() {
	const { user, accessToken } = useAuth();
	const initializeWrapped = useStore(state => state.initializeWrapped)
	const wrappedState = useStore(state => state.wrappedState)
	const previous = usePrevious(wrappedState.index)
	const dir = previous! < wrappedState.index
	useEffect(() => {
		initializeWrapped(user!, accessToken!)
	}, [user, accessToken])
	return (
		<AnimatePresence custom={wrappedState}>
			<MotionFlex id="wrapped" className="content" w="100%" gridArea={"content"} key={wrappedState.state} h="100%" mt="0.5rem" direction="column" align={"center"} justify={"flex-start"} gap="1rem"
				initial="enter"
				animate="in"
				exit="exit"
				transition={{
					type: 'linear',
					stiffness: 400,
					damping: 50,
					opacity: {
						duration: 2
					}
				}}
				variants={{
					enter: { x: dir ? "-100%" : "100%", opacity: 0, },
					in: { x: "0%", opacity: 1, scale: 1 },
					exit: () => {
						return {
							x: !dir ? "-100%" : "100%",
							opacity: 0,
							scale: 0.3
						}
					}
				}}>
				<WrappedController />
			</MotionFlex>
		</AnimatePresence>
	)
}


function usePrevious<T>(state: T) {
	const ref = useRef<T>()

	useEffect(() => {
		ref.current = state
	}, [state])

	return ref.current
}