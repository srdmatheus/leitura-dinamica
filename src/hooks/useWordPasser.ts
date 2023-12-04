import { usePlayer } from '@/hooks/usePlayer';
import { useEffect, useRef } from 'react';

export const useWordPasser = () => {
  const {
    text,
    isProgressing,
    toggleIsProgressing,
    currentWordIndex,
    saveCurrentWordIndex,
    wordPerMinute
  } = usePlayer();

  const wordPerMinuteInMilliseconds = Math.round(60000 / wordPerMinute);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const words = text.trim().split(' ');

  useEffect(() => {
    const isEndOfWords = currentWordIndex >= words.length;

    if (isEndOfWords) {
      saveCurrentWordIndex(words.length - 1);
      toggleIsProgressing();
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
