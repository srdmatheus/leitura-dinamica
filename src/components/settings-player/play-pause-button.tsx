import { Pause, Play } from 'lucide-react';

import { Button } from '../ui/button';

import { usePlayerStore } from '@/store/player';

export const PlayPauseButton = () => {
  const {
    state: { isProgressing },
    actions: { toggleIsProgressing }
  } = usePlayerStore();

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
