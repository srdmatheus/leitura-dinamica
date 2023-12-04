import { PlayerContext } from '@/contexts/player';
import { useContext } from 'react';

export const usePlayer = () => {
  return useContext(PlayerContext);
};
