import { Flex, FlexProps } from '@chakra-ui/react'
import { useAnimate } from 'framer-motion'
import React, { useEffect } from 'react'

interface Props extends FlexProps {

}

export default function StaggeredDisplay({ children, ...flexProps }: React.PropsWithChildren<Props>) {
	const [scope, animate] = useAnimate()

	useEffect(() => {
		async function startAnimate() {
			for (let i = 0; i < scope.current.children.length; i++) {
				await animate(scope.current.children[i], { opacity: 1, display: "unset" }, { duration: 1.5 })
			}
		}
		startAnimate()
	}, [scope])

	return (
		<Flex {...flexProps} ref={scope}>
			{children}
		</Flex>
	)
}