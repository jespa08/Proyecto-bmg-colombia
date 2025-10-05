import { cn } from "@/lib/utils";
import React from "react";

export function Zigzag({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="100"
      viewBox="0 0 200 100"
      className={cn("pointer-events-none", className)}
      {...props}
    >
      <path
        d="M0 50 Q 25 25, 50 50 T 100 50 T 150 50 T 200 50"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M0 65 Q 25 40, 50 65 T 100 65 T 150 65 T 200 65"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
