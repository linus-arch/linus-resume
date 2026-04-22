interface SlashNumberProps {
  number: string;
  light?: boolean;
  className?: string;
}

const SlashNumber = ({ number, light = false, className = "" }: SlashNumberProps) => (
  <span
    className={`slash-number ${light ? "slash-number--light" : ""} ${className}`}
    aria-hidden="true"
  >
    /{number}
  </span>
);

export default SlashNumber;
