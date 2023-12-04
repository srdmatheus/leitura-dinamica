import { cn } from '@/utils/cn';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { ComponentProps, SetStateAction } from 'react';
import { Auth } from './auth';
import { useAuth } from '@/hooks/useAuth';
import { UserProfileSidebar } from './user-profile-sidebar';

type SidebarProps = ComponentProps<'div'> & {
  isOpen: boolean;
  handleToggleOpen: React.Dispatch<SetStateAction<boolean>>;
};

export const Sidebar = ({
  className,
  isOpen,
  handleToggleOpen,
  ...props
}: SidebarProps) => {
  const { user } = useAuth();
  return (
    <div
      className={cn(
        'absolute right-0 z-50 h-[100dvh] w-96 shadow-2xl shadow-gray-400/80 transition-all',
        isOpen ? '-right-96' : '',
        className
      )}
      {...props}
    >
      <button
        className="absolute -left-12 top-24 flex h-12 w-12 items-center justify-center rounded-l-lg border border-r-0 border-brand bg-brand-button font-bold text-white outline-none ring-brand ring-offset-2 transition-all hover:bg-brand-button"
        onClick={() => handleToggleOpen((prev) => !prev)}
      >
        {isOpen ? <PanelRightOpen size={32} /> : <PanelLeftOpen size={32} />}
      </button>
      <div className="h-full border-l border-gray-300 bg-gray-200 p-4">
        {user ? <UserProfileSidebar /> : <Auth />}
      </div>
    </div>
  );
};
