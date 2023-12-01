import { usePlayerContext } from '@/contexts/player';
import { useEffect, useRef } from 'react';

export const useWordPasser = () => {
  const {
    words,
    isProgressing,
    toggleIsProgressing,
    currentWordIndex,
    saveCurrentWordIndex,
    wordPerMinute
  } = usePlayerContext();

  const wordPerMinuteInMilliseconds = Math.round(60000 / wordPerMinute);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const isEndOfWords = currentWordIndex >= words.length;

    if (isEndOfWords) {
      toggleIsProgressing();
      saveCurrentWordIndex(0);
    }

    if (isProgressing) {
      timerRef.current = setTimeout(() => {
        saveCurrentWordIndex(currentWordIndex + 1);
      }, wordPerMinuteInMilliseconds);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [
    currentWordIndex,
    isProgressing,
    saveCurrentWordIndex,
    toggleIsProgressing,
    wordPerMinuteInMilliseconds,
    words.length
  ]);

  return { words, currentWordIndex };
};
