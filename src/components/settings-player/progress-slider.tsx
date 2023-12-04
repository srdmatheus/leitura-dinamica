import { usePlayerContext } from '@/contexts/player';

export const ProgressSlider = () => {
  const { words, saveCurrentWordIndex, currentWordIndex } = usePlayerContext();

  const totalWords = words.length - 1;

  const handleChangeSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
    saveCurrentWordIndex(Number(event.target.value));
  };

  return (
    <input
      type="range"
      className="slider w-full cursor-pointer ring-brand ring-offset-2 focus-visible:ring-2"
      min={1}
      max={totalWords}
      value={currentWordIndex}
      onChange={handleChangeSlider}
    />
  );
};
