import LogoIcon from '@/assets/logo.svg?react';

// TODO [CHALLENGE: Component Design]
// 1. How would you support light and dark variants of this logo?
// 2. How would you handle multiple logos for different NHS trusts?
// 3. What WCAG accessibility attributes does a logo SVG need?
// To swap the logo: replace src/assets/logo.svg

interface LogoProps {
  /** Rendered width in pixels. Height scales proportionally. */
  width?: number;
  /** Accessible label for screen readers */
  label?: string;
  className?: string;
}

export function Logo({ width = 160, label = 'HomeWard', className }: LogoProps) {
  return (
    <LogoIcon
      width={width}
      aria-label={label}
      role="img"
      className={className}
      data-testid="logo"
    />
  );
}
