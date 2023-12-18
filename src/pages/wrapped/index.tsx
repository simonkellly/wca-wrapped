import { Box } from "@chakra-ui/react"
import { motion } from "framer-motion"

export default function Wrapped() {
	console.log("hello")
	return (
		<Box as={motion.div} animate={{ opacity: [0, 1] }}>wrapp222ed</Box>
	)
}