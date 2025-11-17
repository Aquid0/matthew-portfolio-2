import { useEffect, useRef, useState } from "react";

export const useTypewriter = (text: string, speed = 35, delay = 0) => {
  const [displayedText, setDisplayedText] = useState("");
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;

    const timeout = setTimeout(() => {
      hasRun.current = true;
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return displayedText;
};
