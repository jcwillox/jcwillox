import {
  useEventListener,
  useMountEffect,
  useThrottledCallback,
} from "@react-hookz/web";
import { useState } from "react";

export const useNearBottom = (offset = 192) => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = useThrottledCallback(
    () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.innerHeight + window.scrollY;
      setIsAtBottom(scrollHeight - scrollPosition <= offset);
    },
    [offset],
    100,
  );

  useMountEffect(handleScroll);
  useEventListener(
    import.meta.env.SSR ? null : window,
    "scroll",
    handleScroll,
    { passive: true },
  );

  return isAtBottom;
};
