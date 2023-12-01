'use client';

import { usePlayerContext } from '@/contexts/player';
import { cn } from '@/utils/cn';
import { useEffect } from 'react';

type WordPasserProps = {
  className: string;
  variant?: 'unique' | 'text';
};

export const WordPasser = ({
  className,
  variant = 'unique'
}: WordPasserProps) => {
  const {
    words,
    isProgressing,
    currentWordIndex,
    saveCurrentWordIndex,
    wordPerMinute
  } = usePlayerContext();

  const wordPerMinuteInMilliseconds = Math.round(60000 / wordPerMinute);

  useEffect(() => {
    if (isProgressing) {
      const timer = setTimeout(() => {
        saveCurrentWordIndex(currentWordIndex + 1);
      }, wordPerMinuteInMilliseconds);
      return () => clearTimeout(timer);
    }
  }, [
    currentWordIndex,
    isProgressing,
    saveCurrentWordIndex,
    wordPerMinuteInMilliseconds
  ]);

  return (
    <div
      className={cn(
        'relative flex w-full flex-col justify-center rounded-md bg-gray-200',
        className
      )}
    >
      {variant === 'unique' ? (
        <span className="text-center text-7xl font-semibold transition-all">
          {words[currentWordIndex]}
        </span>
      ) : (
        <div className="overflow-auto p-4">
          {words.map((word, index) => (
            <span
              key={`word-${index}`}
              className={cn(
                'text-lg',
                currentWordIndex - 1 === index ? 'text-shadow' : 'opacity-60'
              )}
            >
              {word}{' '}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
