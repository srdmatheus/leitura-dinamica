import { Dispatch, SetStateAction } from 'react';
import { Button } from './ui/button';
import { usePlayerContext } from '@/contexts/player';

type SettingsProps = {
  editMode: boolean;
  setEditMode: (state: boolean) => void;
  setVariantMode: Dispatch<SetStateAction<'unique' | 'text'>>;
};

export const Settings = ({
  editMode,
  setEditMode,
  setVariantMode
}: SettingsProps) => {
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
    setEditMode(false);
    toggleIsProgressing();
  };

  const handleToggleEditMode = () => setEditMode(!editMode);
  const totalWords = words.length - 1;

  const handleChangeSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
    saveCurrentWordIndex(Number(event.target.value));
  };

  const handleChangeWordPerMinute = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateWordPerMinute(Number(e.target.value));
  };

  const handleChangeVariant = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === 'unique' || value === 'text') {
      setVariantMode(value);
    }
  };

  return (
    <div className="relative flex flex-col rounded-md bg-gray-200">
      <input
        type="range"
        className="slider w-full cursor-pointer ring-brand ring-offset-2 focus:ring-2"
        min={1}
        max={totalWords}
        value={currentWordIndex}
        onChange={handleChangeSlider}
      />
      <div className="flex gap-8 p-2">
        <div>
          <Button
            className="rounded-r-none border-none"
            onClick={() => updateWordPerMinute(wordPerMinute - 25)}
          >
            -
          </Button>
          <input
            className="w-14 py-1 text-center text-sm outline-none ring-brand [appearance:textfield] focus:ring-2 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
            +
          </Button>
        </div>
        <Button onClick={handleToggleProgressing}>
          {isProgressing ? 'Pausar' : 'Iniciar'}
        </Button>
        <Button onClick={handleToggleEditMode}>
          {editMode ? 'Salvar' : 'Editar'}
        </Button>

        <select onChange={handleChangeVariant}>
          <option value="text">Texto completo</option>
          <option value="unique">Palavra única</option>
        </select>
      </div>
    </div>
  );
};
