import { type SVGProps } from "react";
const LinkedInIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={24}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#163C3D"
        d="M5.202 21.002H.847V6.982h4.355zM3.022 5.07C1.63 5.07.5 3.916.5 2.524a2.522 2.522 0 1 1 5.044 0c0 1.393-1.13 2.546-2.522 2.546m18.473 15.932H17.15v-6.825c0-1.626-.033-3.712-2.264-3.712-2.264 0-2.611 1.767-2.611 3.595v6.942h-4.35V6.982h4.177v1.913h.06c.582-1.102 2.002-2.264 4.12-2.264 4.407 0 5.218 2.901 5.218 6.67v7.701z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.5.002h21v24H.5z" />
      </clipPath>
    </defs>
  </svg>
);

export default LinkedInIcon;
