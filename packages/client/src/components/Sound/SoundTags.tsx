import { Tag } from '@chakra-ui/react';
import { FreesoundSoundInstance } from '@raudi/common';

type SoundTagsProps = {
  sound: FreesoundSoundInstance;
};

export default function SoundTags({ sound }: SoundTagsProps) {
  return (
    <div className="flex flex-wrap mb-3">
      {sound.tags.map((tag) => (
        <Tag
          margin="0.5"
          key={tag}
          size="sm"
          variant="solid"
          colorScheme="purple"
        >
          #{tag}
        </Tag>
      ))}
    </div>
  );
}
