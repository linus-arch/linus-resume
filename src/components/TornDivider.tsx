interface TornDividerProps {
  fill?: string;
  className?: string;
}

const TornDivider = ({ fill = "var(--paper)", className = "" }: TornDividerProps) => (
  <div className={`torn-divider ${className}`}>
    <svg viewBox="0 0 1440 24" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0,12 Q60,2 120,14 T240,8 T360,16 T480,6 T600,15 T720,4 T840,13 T960,7 T1080,17 T1200,5 T1320,14 T1440,8 L1440,24 L0,24 Z"
        fill={fill}
      />
    </svg>
  </div>
);

export default TornDivider;
