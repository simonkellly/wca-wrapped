
import { Box, BoxProps } from '@chakra-ui/react';
import { TwistyPlayer as TP, TwistyPlayerConfig } from 'cubing/twisty';
import { useEffect, useRef } from 'react';

interface TwistyPlayerReactConfig extends TwistyPlayerConfig {
  boxProps?: BoxProps;
  onTwistyInit?: (twisty: TP) => void;
}

export const Cube = ({
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
      ref.current.appendChild(twisty)
    }

  }, [])

  return <Box ref={ref} {...boxProps} />;
};
