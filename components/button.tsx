"use client";

import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  url?: string | undefined;
  type: string;
  onClick?: () => void;
}
export default function Button({
  children,
  className,
  url,
  type,
  onClick,
}: ButtonProps) {
  if (type === "main") {
    return (
      <input
        type="reset"
        className={`px-8 py-2 bg-yellow-200 rounded-lg ${className} cursor-pointer`}
        value="Reset"
      />
    );
  }

  if (type === "submit") {
    return (
      <input
        type="submit"
        // className={`bg-yellow-300 rounded-lg px-8 py-4 ${className}`}
        className={`px-8 py-2 bg-yellow-200 rounded-lg ${className} cursor-pointer`}
        value="Submit"
      />
    );
  }

  if (type === "back") {
    return (
      <button
        onClick={onClick}
        className={`${className} rounded-full px-2 py-2 bg-yellow-300 text-3xl font-roboto-mono`}
      >
        {children}
      </button>
    );
  }

  if (type === "nav" && url) {
    return <Link href={url}>{children}</Link>;
  }

  if (type === "primary" && url) {
    return (
      <Link
        href={url}
        // className={`bg-yellow-300 rounded-lg px-8 py-4 ${className}`}
        className={`px-8 py-3 bg-yellow-300 rounded-lg ${className}`}
      >
        {children}
      </Link>
    );
  }
  if (type === "secondary") {
    return (
      <button
        onClick={onClick}
        className={`${className} rounded-full bg-yellow-300 text-3xl font-roboto-mono`}
      >
        {children}
      </button>
    );
  }
}
