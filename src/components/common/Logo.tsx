import logoImage from '../../assets/Gemini_Generated_Image_ps2770ps2770ps27.png';

interface LogoProps {
  /** Height in pixels. Width auto-scales. Default: 36px */
  height?: number;
  /** className forwarded to the <img> element */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * UniCare official logo image.
 * The logo already contains the brand name, so do NOT add extra text when using this.
 *
 * Usage:
 *   <Logo height={40} />          — standard navbar size
 *   <Logo height={56} />          — larger hero/profile banner size
 *   <Logo height={28} />          — compact footer/sidebar size
 */
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
