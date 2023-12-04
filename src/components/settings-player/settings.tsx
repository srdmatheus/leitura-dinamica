import { Dispatch, SetStateAction } from 'react';
import { WpmControl } from './wpm-control';
import { ModeSelector } from './mode-selector';
import { ProgressSlider } from './progress-slider';
import { PlayPauseButton } from './play-pause-button';

type SettingsProps = {
  setVariantMode: Dispatch<SetStateAction<'word' | 'text'>>;
  variantMode: 'word' | 'text';
};

export const Settings = ({ variantMode, setVariantMode }: SettingsProps) => {
  return (
    <div className="relative flex flex-col rounded-md border border-gray-300 bg-gray-200">
      <ProgressSlider />

      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col gap-2 text-center">
          <span className="text-sm font-semibold">Palavras por minuto</span>
          <WpmControl />
        </div>

        <PlayPauseButton />

        <div className="flex flex-col gap-2 text-center">
          <span className="text-sm font-semibold">Modo</span>
          <ModeSelector
            setVariantMode={setVariantMode}
            variantMode={variantMode}
          />
        </div>
      </div>
    </div>
  );
};
