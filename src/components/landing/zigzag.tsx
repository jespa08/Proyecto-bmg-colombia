import { cn } from "@/lib/utils";
import React from "react";

export function Zigzag({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="400"
      height="200"
      viewBox="0 0 400 200"
      className={cn("pointer-events-none", className)}
      {...props}
    >
      <g>
        <path
          d="M0 50 Q 25 25, 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M0 65 Q 25 40, 50 65 T 100 65 T 150 65 T 200 65 T 250 65 T 300 65 T 350 65 T 400 65"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
