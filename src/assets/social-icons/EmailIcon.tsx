import { type SVGProps } from "react";

const EmailIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#163C3D"
      d="M2.75 3.002a2.25 2.25 0 0 0-1.35 4.05l10.2 7.65a1.505 1.505 0 0 0 1.8 0l10.2-7.65a2.251 2.251 0 0 0-1.35-4.05zM.5 8.252v9.75c0 1.655 1.345 3 3 3h18c1.655 0 3-1.345 3-3v-9.75l-10.2 7.65a2.995 2.995 0 0 1-3.6 0z"
    />
  </svg>
);
export default EmailIcon;
