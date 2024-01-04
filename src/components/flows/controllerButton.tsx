import useStore, { WrappedState } from '../../store'
import { Flex, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'


export default function ControllerButton() {
	const { index } = useStore(state => state.wrappedState)
	const flows = useStore(state => state.flows)
	const changeWrappedState = useStore(state => state.changeWrappedState)
	const wrappedState = useStore(state => state.wrappedState)
	return (
		<Flex display={wrappedState.state === WrappedState.Thanks ? "none" : "flex"} w="100%" justify={"space-between"}>
			<IconButton
				onClick={() => changeWrappedState("left")}
				w="49%"
				isDisabled={index <= 0}
				display={{
					base: "flex",
					md: "none",
				}}
				variant='solid'
				colorScheme='secondary'
				size={"lg"}
				aria-label='back' icon={<ArrowBackIcon />} />
			<IconButton
				onClick={() => changeWrappedState("right")}
				w="49%"
				isDisabled={index >= flows.length - 1 || index === -1}
				display={{
					base: "flex",
					md: "none",
				}}
				variant='solid'
				colorScheme='secondary'

				size={"lg"} aria-label='next' icon={<ArrowForwardIcon w="80%" />} />
		</Flex>
	)
}