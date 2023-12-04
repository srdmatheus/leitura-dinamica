'use client';

import { useState } from 'react';
import { WordPasserUnique } from './word-passer-unique';
import { WordPasserText } from './word-passer-text';
import { Settings } from '../settings-player/settings';

export const Player = () => {
  const [variantMode, setVariantMode] = useState<'word' | 'text'>('word');

  return (
    <div className="flex w-[860px] flex-col gap-8 overflow-auto ">
      <div className="relative flex min-h-[280px] w-full flex-col justify-center overflow-auto rounded-md border border-gray-300 bg-gray-200">
        {variantMode === 'word' ? <WordPasserUnique /> : <WordPasserText />}
      </div>
      <Settings variantMode={variantMode} setVariantMode={setVariantMode} />
    </div>
  );
};
