import { useState } from "react";

const BACK_CARD_HEIGHT = 350;
const FRONT_CARD_HEIGHT = 370;
const NAV_HEIGHT = 70;
const MIN_HEIGHT = 350;

const useCardHeight = (
  activeCard: boolean,
  hasWindowResized: boolean,
  matchesBreakpointSmallScreen: boolean
): [number, (height: number) => void] => {
  const [cardHeight, setCardHeight] = useState(BACK_CARD_HEIGHT);

  const handleHeightChange = (height: number) => {
    const totalCardHeightWithNav = height + NAV_HEIGHT;
    if (activeCard || hasWindowResized) {
      setCardHeight(() =>
        height <= MIN_HEIGHT
          ? Math.max(totalCardHeightWithNav, FRONT_CARD_HEIGHT)
          : totalCardHeightWithNav
      );
    }
    if (!activeCard) {
      matchesBreakpointSmallScreen
        ? setCardHeight(FRONT_CARD_HEIGHT)
        : setCardHeight(BACK_CARD_HEIGHT);
    }
  };

  return [cardHeight, handleHeightChange];
};

export default useCardHeight;
