import { Link } from '@chakra-ui/react';
import { FreesoundSoundInstance } from '@raudi/types';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { Setter } from '../../types';

const CHAR_LIMIT = 200;

// TODO: Test.
const truncateByWord = (str: string, charLimit: number) => {
  const lastWhitespace = str.lastIndexOf(' ', charLimit);
  return str.slice(0, lastWhitespace);
};

type UseTruncation = {
  truncated: string;
  shouldTruncate: boolean;
  isTruncated: boolean;
  setIsTruncated: Setter<boolean>;
};

const useTruncation = (str: string, charLimit: number): UseTruncation => {
  const [isTruncated, setIsTruncated] = useState(true);

  // Only truncate if half or more of the string would be truncated by the
  // character limit.
  const shouldTruncate = str.length > charLimit * 2;

  useEffect(() => {
    setIsTruncated(true);
  }, [str]);

  return {
    truncated:
      shouldTruncate && isTruncated
        ? `${truncateByWord(str, charLimit)}...`
        : str,
    shouldTruncate,
    isTruncated,
    setIsTruncated,
  };
};

type SoundDescriptionProps = {
  sound: FreesoundSoundInstance;
  charLimit?: number;
  className?: string;
};

export default function SoundDescription({
  sound,
  charLimit = CHAR_LIMIT,
}: SoundDescriptionProps) {
  const sanitizedDescription = DOMPurify.sanitize(sound.description);
  const { truncated, shouldTruncate, isTruncated, setIsTruncated } =
    useTruncation(sanitizedDescription, charLimit);

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: truncated,
        }}
      />
      {shouldTruncate && (
        <Link
          color="teal.500"
          onClick={() => setIsTruncated((truncated) => !truncated)}
        >
          Show {isTruncated ? 'more' : 'less'}
        </Link>
      )}
    </>
  );
}
