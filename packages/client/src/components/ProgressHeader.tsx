import { Progress } from '@chakra-ui/react';

type ProgressHeaderProps = {
  showing?: boolean;
};

export default function ProgressHeader(
  { showing }: ProgressHeaderProps = { showing: true },
) {
  if (!showing) {
    return null;
  }

  return <Progress size="xs" isIndeterminate />;
}
