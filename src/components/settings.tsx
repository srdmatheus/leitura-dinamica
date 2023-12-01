import { Dispatch, SetStateAction } from 'react';
import { Button } from './ui/button';
import { usePlayerContext } from '@/contexts/player';
import { Minus, Pause, Play, Plus } from 'lucide-react';

type SettingsProps = {
  setVariantMode: Dispatch<SetStateAction<'word' | 'text'>>;
  variantMode: 'word' | 'text';
};

export const Settings = ({ variantMode, setVariantMode }: SettingsProps) => {
  const {
    toggleIsProgressing,
    isProgressing,
    saveCurrentWordIndex,
    words,
    currentWordIndex,
    wordPerMinute,
    updateWordPerMinute
  } = usePlayerContext();

  const handleToggleProgressing = () => {
    toggleIsProgressing();
  };

  const totalWords = words.length - 1;

  const handleChangeSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
    saveCurrentWordIndex(Number(event.target.value));
  };

  const handleChangeWordPerMinute = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateWordPerMinute(Number(e.target.value));
  };

  const handleChangeVariant = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { value } = e.currentTarget;
    if (value === 'word' || value === 'text') {
      setVariantMode(value);
    }
  };

  return (
    <div className="relative flex flex-col rounded-md border border-gray-300 bg-gray-200">
      <input
        type="range"
        className="slider w-full cursor-pointer ring-brand ring-offset-2 focus-visible:ring-2"
        min={1}
        max={totalWords}
        value={currentWordIndex}
        onChange={handleChangeSlider}
      />

      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col gap-2 text-center">
          <span className="text-sm font-semibold">Palavras por minuto</span>
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
        </div>

        <Button
          onClick={handleToggleProgressing}
          className="h-10 w-56 self-end"
        >
          {isProgressing ? (
            <Pause strokeWidth={2} fill="white" />
          ) : (
            <Play strokeWidth={3} fill="white" />
          )}
        </Button>

        <div className="flex flex-col gap-2 text-center">
          <span className="text-sm font-semibold">Modo</span>
          <div className="flex">
            <Button
              className={`rounded-r-none border-none ${
                variantMode === 'word' ? 'bg-brand-button' : 'bg-gray-500'
              }`}
              value="word"
              onClick={(e) => handleChangeVariant(e)}
            >
              Palavra
            </Button>
            <Button
              className={`rounded-l-none border-none ${
                variantMode === 'text' ? 'bg-brand-button' : 'bg-gray-500'
              }`}
              value="text"
              onClick={(e) => handleChangeVariant(e)}
            >
              Texto
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
