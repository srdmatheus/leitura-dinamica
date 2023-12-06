import { usePlayerStore } from '@/store/player';
import { useEffect, useMemo, useRef } from 'react';

export const useWordPasser = () => {
  const {
    state: { text, isProgressing, currentWordIndex, wordPerMinute },
    actions: { saveCurrentWordIndex, toggleIsProgressing }
  } = usePlayerStore();

  const wordPerMinuteInMilliseconds = Math.round(60000 / wordPerMinute);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const words = useMemo(() => text.trim().split(' '), [text]);

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
