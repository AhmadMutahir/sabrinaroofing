import type { SVGProps } from "react";

/** Brand mark — a gable roof with a chimney. Pure SVG, no network request. */
export function RoofMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 40 30"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M1.6 16.4 20 1.9l18.4 14.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.9 19.6V28h24.2v-8.4"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4 28v-6.6h7.2V28"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.4 6.2v5.1"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
