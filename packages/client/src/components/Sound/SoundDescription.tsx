import { Link } from '@chakra-ui/react';
import { FreesoundSoundInstance } from '@raudi/types';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

const CHAR_LIMIT = 200;

// TODO: Test.
const truncateByWord = (str: string, charLimit: number) => {
  const lastWhitespace = str.lastIndexOf(' ', charLimit);
  return str.slice(0, lastWhitespace);
};

type SoundDescriptionProps = {
  sound: FreesoundSoundInstance;
  charLimit?: number;
};

export default function SoundDescription({
  sound,
  charLimit = CHAR_LIMIT,
}: SoundDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const sanitizedDescription = DOMPurify.sanitize(sound.description);

  useEffect(() => {
    setExpanded(false);
  }, [sound]);

  // Only truncate descriptions that would have half or more of their text
  // truncated by the character limit.
  if (sanitizedDescription.length < charLimit * 2) {
    return <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />;
  }

  if (!expanded) {
    return (
      <>
        <div
          dangerouslySetInnerHTML={{
            __html: `${truncateByWord(sanitizedDescription, charLimit)}...`,
          }}
        />
        <Link color="teal.500" onClick={() => setExpanded(true)}>
          Show more
        </Link>
      </>
    );
  }

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizedDescription,
        }}
      />
      <Link color="teal.500" onClick={() => setExpanded(false)}>
        Show less
      </Link>
    </>
  );
}
