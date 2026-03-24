import logoImage from '../../assets/Gemini_Generated_Image_ps2770ps2770ps27.png';

interface LogoProps {
  /** Height in pixels. Width auto-scales. Default: 36px */
  height?: number;
  /** className forwarded to the <img> element */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

const Logo = ({ height = 36, className, style }: LogoProps) => (
  <img
    src={logoImage}
    alt="UniCare"
    height={height}
    style={{ height: `${height}px`, width: 'auto', objectFit: 'contain', display: 'block', ...style }}
    className={className}
  />
);

export default Logo;
