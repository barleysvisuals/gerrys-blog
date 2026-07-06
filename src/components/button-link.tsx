import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const classes =
    variant === "primary"
      ? "bg-petrol text-white hover:bg-petrol-dark"
      : "border border-line bg-surface text-petrol-dark hover:border-petrol";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-md px-5 text-sm font-semibold transition ${classes}`}
    >
      {children}
    </Link>
  );
}
