import { highlightKeywords } from "../../../utils/highlightKeywords";
import { TYPE_SPEED } from "../constants";
import { useTypewriter } from "../hooks/useTypewriter";

export const About = () => {
  const line1 = "hey! I'm Matthew";
  const line2 =
    "A Front-End Engineer Intern at Amazon and third-year Computer Science student at the University of Bath.";
  const line3 =
    "I'm currently a Swansea-based FEE Intern building the Veeqo product, an all-in-one e-commerce platform that provides multi-channel shipping, order, and inventory management software for online sellers.";
  const line4 =
    "When I'm not coding, I'm probably reading, writing, or drawing!";

  const displayed1 = useTypewriter(line1, TYPE_SPEED);
  const displayed2 = useTypewriter(
    line2,
    TYPE_SPEED,
    line1.length * TYPE_SPEED,
  );
  const displayed3 = useTypewriter(
    line3,
    TYPE_SPEED,
    (line1.length + line2.length) * TYPE_SPEED,
  );
  const displayed4 = useTypewriter(
    line4,
    TYPE_SPEED,
    (line1.length + line2.length + line3.length) * TYPE_SPEED,
  );

  const showCaret = (
    prevLine: string,
    prevDisplayed: string,
    currentDisplayed: string,
    currentLine: string,
  ) =>
    prevDisplayed.length >= prevLine.length &&
    currentDisplayed.length < currentLine.length;

  return (
    <div className="my-2 border border-dashed border-[#2D2B40] p-4 text-xs text-[#E0DEF4]/80">
      <p>
        {highlightKeywords(displayed1, line1, {
          keyword: "Matthew",
          color: "text-[#fc3468]",
        })}
        <span
          className={`text-lg ${displayed1.length < line1.length ? "caret-blink" : "invisible"}`}
        >
          ▋
        </span>
      </p>
      <p className="mt-4 min-h-[1rem]">
        {highlightKeywords(displayed2, line2, [
          { keyword: "Amazon", color: "text-[#FF9900]" },
          { keyword: "University of Bath", color: "text-[#7B9FF2]" },
        ])}
        <span
          className={`text-lg ${showCaret(line1, displayed1, displayed2, line2) ? "caret-blink" : "invisible"}`}
        >
          ▋
        </span>
      </p>
      <p className="mt-4 min-h-[1rem]">
        {highlightKeywords(displayed3, line3, [
          { keyword: "Veeqo", color: "text-[#297fcd]" },
        ])}
        <span
          className={`text-lg ${showCaret(line2, displayed2, displayed3, line3) ? "caret-blink" : "invisible"}`}
        >
          ▋
        </span>
      </p>
      <p className="mt-4 min-h-[1rem]">
        {displayed4}
        <span
          className={`text-lg ${showCaret(line3, displayed3, displayed4, line4) ? "caret-blink" : "invisible"}`}
        >
          ▋
        </span>
      </p>
    </div>
  );
};
