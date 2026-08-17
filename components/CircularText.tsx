import React, { useId } from 'react';

interface CircularTextProps {
  text: string;
  className?: string;
  letterSpacing?: string;
}

const SVG_VIEWBOX_SIZE = 200;
const TEXT_PATH_RADIUS = SVG_VIEWBOX_SIZE / 2 - 8;
const TEXT_PATH_LENGTH = 2 * Math.PI * TEXT_PATH_RADIUS;

export const CircularText: React.FC<CircularTextProps> = ({
  text,
  className = '',
  letterSpacing,
}) => {
  const componentId = useId();
  const pathId = `textCirclePath-${componentId}`;

  const pathData = `
    M ${SVG_VIEWBOX_SIZE / 2}, ${SVG_VIEWBOX_SIZE / 2 - TEXT_PATH_RADIUS}
    A ${TEXT_PATH_RADIUS},${TEXT_PATH_RADIUS} 0 1,1 ${SVG_VIEWBOX_SIZE / 2 - 0.01},${SVG_VIEWBOX_SIZE / 2 - TEXT_PATH_RADIUS}
  `;

  return (
    <div
      className={`hero-circular-text-ring pointer-events-none ${className}`}
      dir="ltr"
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${SVG_VIEWBOX_SIZE} ${SVG_VIEWBOX_SIZE}`}
        width="100%"
        height="100%"
      >
        <defs>
          <path id={pathId} d={pathData} />
        </defs>
        <text
          className="hero-circular-text-label"
          dy="0"
          lengthAdjust="spacing"
          textLength={TEXT_PATH_LENGTH}
          style={letterSpacing ? { letterSpacing } : undefined}
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
};
