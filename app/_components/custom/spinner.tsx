import React from "react";

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    count?: number;
    barWidth?: number;
    barHeight?: number;
    duration?: number;
    borderRadius?: number;
    fill?: string;
}

// eslint-disable-next-line prefer-spread, @typescript-eslint/no-explicit-any
const repeat = (count: number): any[] => Array.apply(null, Array(count));

const Spinner = ({
    size = 40,
    count = 8,
    barWidth = 3,
    barHeight = 10,
    duration = 1,
    borderRadius = 4,
    fill = "#000",
    ...rest
}: SpinnerProps) => {
    const radius = size / 2 - barHeight / 2;

    return (
        <svg {...rest} width={size} height={size}>
            {repeat(count).map((_, i) => {
                const angle = (360 / count) * i;
                /* (barWidth + borderRadius) / 2 is used to fix the excursion caused by thickness */
                const x =
                    Math.cos((Math.PI * angle) / 180) * radius +
                    radius +
                    (barWidth + borderRadius) / 2;
                const y = Math.sin((Math.PI * angle) / 180) * radius + radius;

                return (
                    <rect
                        x={x}
                        y={y}
                        fill={fill}
                        key={`r-${i}`}
                        width={barWidth}
                        height={barHeight}
                        rx={borderRadius}
                        ry={borderRadius}
                        transform={`rotate(${90 + angle} ${x + barWidth / 2} ${y + barHeight / 2})`}
                    >
                        <animate
                            attributeName="opacity"
                            values="0; 0.3; 1"
                            begin={`${((duration * 0.8) / count) * i}s`}
                            dur={`${duration}s`}
                            repeatCount="indefinite"
                        />
                    </rect>
                );
            })}
        </svg>
    );
};

export default Spinner;
