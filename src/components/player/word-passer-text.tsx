import { useWordPasser } from '@/hooks/useWordPasser';
import { cn } from '@/utils/cn';

export const WordPasserText = () => {
  const { words, currentWordIndex } = useWordPasser();

  return (
    <div className="overflow-y-auto p-4">
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
  );
};
