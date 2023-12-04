import { Pause, Play } from 'lucide-react';

import { Button } from '../ui/button';

import { usePlayerContext } from '@/contexts/player';

export const PlayPauseButton = () => {
  const { isProgressing, toggleIsProgressing } = usePlayerContext();

  return (
    <Button onClick={toggleIsProgressing} className="h-10 w-56 self-end">
      {isProgressing ? (
        <Pause strokeWidth={2} fill="white" />
      ) : (
        <Play strokeWidth={3} fill="white" />
      )}
    </Button>
  );
};