import { SVGProps } from 'react';

const EditIcon = ({
    width = 16,
    height = 16,
    ...svgProps
}: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 16 16"
            fill="none"
            {...svgProps}
        >
            <g clipPath="url(#clip0_1057_6392)">
                <path
                    d="M12 6.66671L9.33331 4.00004M1.66663 14.3334L3.92287 14.0827C4.19853 14.0521 4.33636 14.0367 4.46519 13.995C4.57949 13.958 4.68826 13.9058 4.78855 13.8396C4.9016 13.7651 4.99966 13.667 5.19578 13.4709L14 4.66671C14.7364 3.93033 14.7364 2.73642 14 2.00004C13.2636 1.26366 12.0697 1.26366 11.3333 2.00004L2.52911 10.8042C2.33299 11.0003 2.23493 11.0984 2.16038 11.2114C2.09425 11.3117 2.04197 11.4205 2.00497 11.5348C1.96326 11.6636 1.94795 11.8015 1.91732 12.0771L1.66663 14.3334Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_1057_6392">
                    <rect width="16" height="16" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default EditIcon;
