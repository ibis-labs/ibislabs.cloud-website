"use client";

import { AnchorHTMLAttributes } from "react";

export default function StopPropLink({
  children,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
