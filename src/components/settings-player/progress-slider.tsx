import { usePlayer } from '@/hooks/usePlayer';

export const ProgressSlider = () => {
  const { text, saveCurrentWordIndex, currentWordIndex } = usePlayer();

  const totalWords = text.split(' ').length - 1;

  const handleChangeSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
    saveCurrentWordIndex(Number(event.target.value));
  };

  return (
    <input
      type="range"
      className="slider w-full cursor-pointer ring-brand ring-offset-2 focus-visible:ring-2"
      min={0}
      max={totalWords}
      value={currentWordIndex}
      onChange={handleChangeSlider}
    />
  );
};
