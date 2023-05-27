import { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

export default function NumberAnimation({ finalNumber }) {
  const [number, setNumber] = useState(0);
  const { animatedNumber } = useSpring({
    animatedNumber: number,
    from: { animatedNumber: 0 },
    to: { animatedNumber: finalNumber },
    config: { duration: 500 },
    onRest: () => setNumber(finalNumber)
  });

  useEffect(() => {
    setNumber(finalNumber);
  }, [finalNumber]);

  return <animated.span className="text-purple">{animatedNumber.to((val) => Math.floor(val))}</animated.span>;
};
