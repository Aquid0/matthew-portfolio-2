export const highlightKeyword = (
  text: string,
  fullText: string,
  keyword: string,
  color: string,
) => {
  const keywordIndex = fullText.indexOf(keyword);
  const before = text.slice(0, keywordIndex);
  const keywordPart = text.slice(keywordIndex, keywordIndex + keyword.length);
  const after = text.slice(keywordIndex + keyword.length);

  return (
    <>
      {before}
      {keywordPart && <span className={color}>{keywordPart}</span>}
      {after}
    </>
  );
};
