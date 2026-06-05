"use client";

export default function ClickableCard({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={className}
      onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
    >
      {children}
    </div>
  );
}
