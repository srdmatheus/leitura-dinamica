'use client';

import { Settings } from '@/components/settings';
import { WordPasser } from '@/components/word-passer';
import { usePlayerContext } from '@/contexts/player';
import { useState } from 'react';

export default function Home() {
  const [editMode, setEditMode] = useState(true);
  const [variantMode, setVariantMode] = useState<'unique' | 'text'>('unique');
  const { updateText, text } = usePlayerContext();

  return (
    <div className="mx-auto flex h-[100dvh] items-center justify-center">
      <div className="flex min-w-[800px] flex-col gap-8">
        {editMode ? (
          <textarea
            className="flex h-[280px] w-full resize-none rounded-md p-4 outline-none ring-brand focus:ring-2"
            value={text}
            onChange={(e) => updateText(e.target.value)}
          />
        ) : (
          <WordPasser className="h-[280px]" variant={variantMode} />
        )}
        <Settings
          editMode={editMode}
          setEditMode={setEditMode}
          setVariantMode={setVariantMode}
        />
      </div>
    </div>
  );
}
