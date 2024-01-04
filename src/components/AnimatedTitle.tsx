// AnimatedTitle.js

import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Title = styled.h2`
  font-size: 32px;
  font-weight: 600;
  text-align:center;
  white-space: nowrap;
`;

const Word = styled(motion.span)`
	font-family: var(--chakra-fonts-heading);
  display: inline-block;
  margin-right: 0.25em;
  white-space: nowrap;
`;

const Character = styled(Text)`
	font-family: var(--chakra-fonts-heading);
  display: inline-block;
  margin-right: -0.05em;
`;

export default function AnimatedTitle({ text }: { text: string }) {

	const ctrls = useAnimation();

	const { ref, inView } = useInView({
		threshold: 0.5,
		triggerOnce: true,
		delay: 30,
	});

	useEffect(() => {
		if (inView) {
			ctrls.start("visible");
		}
		if (!inView) {
			ctrls.start("hidden");
		}
	}, [ctrls, inView]);

	const wordAnimation = {
		hidden: {},
		visible: {},
	};

	const characterAnimation = {
		hidden: {
			opacity: 0,
			y: `0.25em`,
		},
		visible: {
			opacity: 1,
			y: `0em`,
			transition: {
				duration: 1,
				ease: [0.2, 0.65, 0.3, 0.9],
			},
		},
	};

	return (
		<Title aria-label={text} role="heading">
			{text.split(" ").map((word, index) => {
				return (
					<Word
						ref={ref}
						aria-hidden="true"
						key={index}
						initial="hidden"
						animate={ctrls}
						variants={wordAnimation}
						transition={{
							delayChildren: index * 0.25,
							staggerChildren: 0.05,
						}}
					>
						{word.split("").map((character, index) => {
							return (
								<Character
									as={motion.span}
									aria-hidden="true"
									key={index}
									variants={characterAnimation}
								>
									{character}
								</Character>
							);
						})}
					</Word>
				);
			})}
		</Title>
	);
}