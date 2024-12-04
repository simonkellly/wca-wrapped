import AnimatedTitle from '../AnimatedTitle'
import { useAuth } from '../../providers/AuthProvider'
import { Skeleton, Stack, Text } from '@chakra-ui/react'

export default function None() {
	const { user } = useAuth()
	return (
		<>
			<AnimatedTitle text={`Welcome ${user?.name.split(" ")[0]}!`} />
			<Text textAlign={"center"} fontSize="xl">{`Lets see what 2024 had in store for you`}</Text>

			<Stack h="100%" w="100%">
				<Skeleton height='20%' />
				<Skeleton height='20%' />
				<Skeleton height='20%' />
			</Stack>
		</>
	)
}