interface EdgeLabelProps {
  text: string;
  className?: string;
}

const EdgeLabel = ({ text, className = "" }: EdgeLabelProps) => (
  <span className={`edge-label ${className}`} aria-hidden="true">
    {text}
  </span>
);

export default EdgeLabel;
