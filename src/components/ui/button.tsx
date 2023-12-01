import { cn } from '@/utils/cn';
import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  children: React.ReactNode;
};

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'flex min-h-[2rem] items-center justify-center gap-2 rounded-md border border-brand bg-brand-button px-4 py-1 text-sm font-semibold text-white outline-none ring-brand transition hover:bg-brand-button/80 focus-visible:ring-2',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
