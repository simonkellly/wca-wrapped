import { Button, Flex } from "@chakra-ui/react";

import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../providers/AuthProvider";

export default function Start() {
	const auth = useAuth()
	return (
		<AnimatePresence>
			<Flex as={motion.div} animate={{
				opacity: [0, 1], transition: {
					delay: 1.5,
					staggerChildren: 0.5,
					duration: 2
				}
			}} h="100%" justify={"center"} mt="2rem">
				{!auth.signedIn() && <Button onClick={auth.signIn} colorScheme="secondary">Get Started</Button>}
			</Flex>
		</AnimatePresence>

	)
}