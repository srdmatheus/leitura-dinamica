import { ComponentProps } from 'react';
import { cn } from '@/utils/cn';

type InputProps = ComponentProps<'input'>;

export const Input = ({ className, type, ...props }: InputProps) => {
  return (
    <input
      type={type}
      className={cn(
        'w-full rounded-md border border-gray-200 p-2 outline-none ring-brand focus-visible:ring-2',
        className
      )}
      {...props}
    />
  );
};
