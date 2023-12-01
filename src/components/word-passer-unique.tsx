import { useWordPasser } from '@/hooks/useWordPasser';

export const WordPasserUnique = () => {
  const { words, currentWordIndex } = useWordPasser();

  return (
    <span className="text-center text-7xl font-semibold transition-all">
      {words[currentWordIndex]}
    </span>
  );
};
