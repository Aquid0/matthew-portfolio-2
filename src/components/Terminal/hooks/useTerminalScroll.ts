import { useLayoutEffect, useRef } from "react";

export const useTerminalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (!containerRef.current) return;
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      scrollPositionRef.current = containerRef.current.scrollTop;
    }, 100);
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    scrollPositionRef.current = containerRef.current.scrollTop;
  };

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollPositionRef.current;
    }
  });

  return { containerRef, scrollToBottom, handleScroll };
};
