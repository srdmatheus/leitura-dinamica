import { cn } from '@/utils/cn';
import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  children: React.ReactNode;
};

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'rounded-md border border-brand bg-brand-button px-4 py-1 text-sm font-semibold text-white outline-none ring-brand transition hover:bg-brand-button/80 focus:ring-2',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
