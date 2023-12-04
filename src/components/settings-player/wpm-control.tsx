import { usePlayerContext } from '@/contexts/player';
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';

export const WpmControl = () => {
  const { wordPerMinute, updateWordPerMinute } = usePlayerContext();
  const handleChangeWordPerMinute = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateWordPerMinute(Number(e.target.value));
  };

  return (
    <div className="flex">
      <Button
        className="rounded-r-none border-none"
        onClick={() => updateWordPerMinute(wordPerMinute - 25)}
      >
        <Minus size={16} strokeWidth={3} />
      </Button>
      <input
        className="w-14 py-1 text-center text-sm outline-none ring-brand [appearance:textfield] focus-visible:ring-2 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        type="number"
        min={50}
        value={wordPerMinute}
        step={25}
        onChange={handleChangeWordPerMinute}
      />
      <Button
        className="rounded-l-none border-none"
        onClick={() => updateWordPerMinute(wordPerMinute + 25)}
      >
        <Plus size={16} strokeWidth={3} />
      </Button>
    </div>
  );
};
