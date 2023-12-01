import { cn } from '@/utils/cn';
import { ComponentProps } from 'react';

type SideBarProps = ComponentProps<'div'> & {
  className?: string;
};

export const SideBar = ({ className, ...props }: SideBarProps) => {
  return (
    <div
      className={cn(
        'absolute right-0 z-50 h-[100dvh] w-96 bg-brand transition-all',
        className
      )}
      {...props}
    >
      <div className="absolute -left-12 h-12 w-12 bg-brand-button" />
      sidebar
    </div>
  );
};
