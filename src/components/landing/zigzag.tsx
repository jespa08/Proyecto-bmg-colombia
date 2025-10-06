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
          d="M0 50 Q 50 20, 100 50 T 200 50 T 300 50 T 400 50"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M0 65 Q 50 35, 100 65 T 200 65 T 300 65 T 400 65"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M0 80 Q 50 50, 100 80 T 200 80 T 300 80 T 400 80"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
