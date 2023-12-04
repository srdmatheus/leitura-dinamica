import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';

type ModeSelectorProps = {
  setVariantMode: Dispatch<SetStateAction<'word' | 'text'>>;
  variantMode: 'word' | 'text';
};

export const ModeSelector = ({
  setVariantMode,
  variantMode
}: ModeSelectorProps) => {
  const handleChangeVariant = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { value } = e.currentTarget;
    if (value === 'word' || value === 'text') {
      setVariantMode(value);
    }
  };

  return (
    <div className="flex">
      <Button
        className={`w-20 rounded-r-none border-none ${
          variantMode === 'word' ? 'bg-brand-button' : 'bg-gray-500'
        }`}
        value="word"
        onClick={(e) => handleChangeVariant(e)}
      >
        Palavra
      </Button>
      <Button
        className={`w-20 rounded-l-none border-none ${
          variantMode === 'text' ? 'bg-brand-button' : 'bg-gray-500'
        }`}
        value="text"
        onClick={(e) => handleChangeVariant(e)}
      >
        Texto
      </Button>
    </div>
  );
};
