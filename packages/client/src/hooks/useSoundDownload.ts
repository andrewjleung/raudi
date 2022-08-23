import { useToast } from '@chakra-ui/react';
import { FreesoundSoundInstance } from '@raudi/types';
import { EitherAsync } from 'purify-ts';
import { downloadSound } from '../api/soundsApi';
import { useAuthorizedFetch } from './useAuthorizedFetch';

export default function useSoundDownload() {
  const downloadToast = useToast();
  const authorizedFetch = useAuthorizedFetch();

  return (sound: FreesoundSoundInstance) =>
    EitherAsync.fromPromise(() => downloadSound(authorizedFetch)(sound)).caseOf(
      {
        Left: () =>
          downloadToast({
            title: 'Download failed.',
            description: 'Please try again.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          }),
        Right: () =>
          downloadToast({
            title: 'Sound downloaded.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          }),
      },
    );
}
