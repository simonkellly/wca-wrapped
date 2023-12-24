import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	IconButton,
	useDisclosure,
	Link,
	Text,
	Button,
} from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import useCubeStore, { puzzle } from '../store/cubeStore'
import {
	FormControl,
	FormLabel,
} from '@chakra-ui/react'
import { useAuth } from '../providers/AuthProvider'


export default function CubeSelectModal() {
	const { isOpen, onClose, onToggle } = useDisclosure()
	const cube = useCubeStore(state => state.puzzleType)
	const updateCube = useCubeStore(state => state.setPuzzleType)
	const { user, signOut } = useAuth()

	return (
		<>
			<IconButton colorScheme='teal' variant={"ghost"} zIndex={"3000"} onClick={onToggle} aria-label='menu' position={"absolute"} top="4" left="5" icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} />
			<Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "lg" }}>
				<ModalOverlay />
				<ModalContent alignItems={"center"} justifyContent={"center"} gap="1rem">
					<ModalHeader mt="2rem">Cubing Wrapped 2023</ModalHeader>
					<ModalBody w="100%">
						<FormControl w="100%">
							<FormLabel>Puzzle to show</FormLabel>
							<Select placeholder='Select Cube' value={cube} onChange={(e) => updateCube(e.target.value)}>
								{Object.keys(puzzle).map((key) => <option key={key} value={key}>{puzzle[key]}</option>)}
							</Select>
						</FormControl>
						<Text>{`Logged in as ${user?.name}`}</Text>
						<Button colorScheme='primary' onClick={() => {
							signOut()
							onToggle()
						}}>{`Logout`}</Button>
					</ModalBody>
					<ModalFooter justifyContent={"center"}>
						<span>{`Made with ❤️ by `} <Link href="https://www.saranshgrover.com">Saransh Grover</Link></span>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}