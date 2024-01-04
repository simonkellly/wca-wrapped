
import { Box, BoxProps } from '@chakra-ui/react';
import { TwistyPlayer as TP, TwistyPlayerConfig } from 'cubing/twisty';
import { useEffect, useRef } from 'react';
import '../styles/cubes.css'

interface TwistyPlayerReactConfig extends TwistyPlayerConfig {
  className?: string;
  boxProps?: BoxProps;
  onTwistyInit?: (twisty: TP) => void;
}

export const Cube = ({
  className,
  onTwistyInit,
  boxProps,
  ...props
}: TwistyPlayerReactConfig) => {
  const ref = useRef<HTMLDivElement>()
  useEffect(() => {
    const twisty = new TP(props)
    if (ref.current) {
      while (ref.current.firstChild) {
        ref.current.removeChild(ref.current.firstChild);
      }
      onTwistyInit?.(twisty)
      const twistyElement = ref.current.appendChild(twisty)
      if (className) twistyElement.className = className

    }

  }, [])

  return <Box ref={ref} {...boxProps} />;
};
