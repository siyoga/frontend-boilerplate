'use client';

import type { ReactNode } from 'react';

export interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  disabled: boolean;
  className: string;
}

export default function Button({
  children,
  onClick,
  disabled,
  className,
}: Omit<Partial<ButtonProps>, 'provider'>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg flex flex-row items-center justify-between${
        className ? ` ${className}` : ''
      }`}
    >
      {children}
    </button>
  );
}
