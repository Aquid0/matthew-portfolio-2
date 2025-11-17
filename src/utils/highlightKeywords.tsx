type Highlight = {
  keyword: string;
  color: string;
};

type TextPart = {
  text: string;
  color?: string;
};

/**
 * Highlights specific keywords in text with custom colors.
 * Useful for syntax highlighting or emphasizing terms in typewriter animations.
 *
 * @param text - The displayed text (may be partial during animation)
 * @param fullText - The complete text (used to find keyword positions)
 * @param highlights - Single highlight object or array of highlights
 * @returns JSX with highlighted keywords wrapped in colored spans
 *
 * @example
 * highlightKeywords("Hello React", "Hello React", { keyword: "React", color: "text-blue-500" })
 */
export const highlightKeywords = (
  text: string,
  fullText: string,
  highlights: Highlight | Highlight[],
) => {
  const highlightArray = Array.isArray(highlights) ? highlights : [highlights];
  const parts: TextPart[] = [];
  let currentIndex = 0;

  // Find all keyword positions and sort by appearance order
  const sortedHighlights = highlightArray
    .map((highlight) => ({
      ...highlight,
      position: fullText.indexOf(highlight.keyword),
    }))
    .filter((h) => h.position !== -1)
    .sort((a, b) => a.position - b.position);

  // Split text into parts: plain text and highlighted keywords
  sortedHighlights.forEach(({ keyword, color, position }) => {
    // Add plain text before keyword
    if (currentIndex < position) {
      parts.push({ text: text.slice(currentIndex, position) });
    }

    // Add highlighted keyword
    const keywordEnd = position + keyword.length;
    parts.push({
      text: text.slice(position, keywordEnd),
      color,
    });

    currentIndex = keywordEnd;
  });

  // Add remaining text after last keyword
  if (currentIndex < text.length) {
    parts.push({ text: text.slice(currentIndex) });
  }

  return (
    <>
      {parts.map((part, index) =>
        part.color ? (
          <span key={index} className={`crt-title ${part.color}`}>
            {part.text}
          </span>
        ) : (
          part.text
        ),
      )}
    </>
  );
};
