import { useEffect, useRef, useState } from 'react';
import Controls from './Controls';
import DownloadButton from './DownloadButton';
import PlayPauseButton from './PlayPauseButton';
import Seeker from './Seeker';
import { VolumeSetter, VolumeButton, VolumeSlider } from './VolumeSetter';
import Time from './Time';
import NextButton from './NextButton';
import { Box, Skeleton, Spacer } from '@chakra-ui/react';
import { FreesoundSoundInstance } from '@raudi/common';
import { State } from '../../types';

const NOOP = () => {
  return;
};

type PlayerProps = {
  sound: FreesoundSoundInstance;
  Volume: State<number>;
  onClickNext: () => void;
  canGetNextSound: boolean;
};

// Volume should be a controlled state within the player because a player is
// meant to be associated with a single sound. When the sound changes, it
// should be considered a new component. Volume on the other hand, is persistent
// and not associated with a single sound.
//
// Use the `key` prop to ensure the player state resets whenever the sound
// is changed: https://beta.reactjs.org/learn/you-might-not-need-an-effect#resetting-all-state-when-a-prop-changes
export default function Player({
  sound,
  Volume,
  onClickNext,
  canGetNextSound,
}: PlayerProps) {
  const audioRef = useRef<HTMLMediaElement>(null);

  const CanPlay = useState(false);
  const Playing = useState(false);
  const Muted = useState(false);
  const CurrentTime = useState(0);
  const Duration = useState<number>(0);
  const Progress = useState(0);

  const [canPlay, setCanPlay] = CanPlay;
  const [playing, setPlaying] = Playing;
  const [volume] = Volume;
  const [muted, setMuted] = Muted;
  const [currentTime, setCurrentTime] = CurrentTime;
  const [duration, setDuration] = Duration;
  const [progress, setProgress] = Progress;

  const [switching, setSwitching] = useState(false);

  // TODO: Really need to clean up this pattern...
  useEffect(() => {
    if (audioRef.current === null) {
      return;
    }

    setMuted(false);
    audioRef.current.volume = volume / 100;
  }, [setMuted, volume]);

  useEffect(() => {
    if (audioRef.current === null) {
      return;
    }

    if (playing) {
      audioRef.current.play();
      return;
    }

    audioRef.current.pause();
  }, [playing]);

  useEffect(() => {
    if (audioRef.current === null) {
      return;
    }

    audioRef.current.currentTime = currentTime;
  }, [currentTime]);

  useEffect(() => {
    if (audioRef.current === null) {
      return;
    }

    audioRef.current.muted = muted;
  }, [muted]);

  const onTimeUpdate = () => {
    if (audioRef.current === null) {
      return;
    }

    const audio = audioRef.current;
    const duration = audio.duration;

    if (duration > 0) {
      setProgress((audio.currentTime / duration) * 100);
    }
  };

  return (
    <>
      <Controls className="flex flex-col items-center gap-2 min-w-fit">
        <div className="pl-3 pr-3 flex flex-row w-full gap-2 sm:gap-3">
          <PlayPauseButton Playing={Playing} canPlay={canPlay} />
          <NextButton onClick={onClickNext} disabled={!canGetNextSound} />
          <DownloadButton sound={sound} />
          <Spacer className="grow" />
          <VolumeSetter>
            <VolumeButton Volume={Volume} Muted={Muted} />
            <VolumeSlider Volume={Volume} Muted={Muted} />
          </VolumeSetter>
        </div>
        <div className="w-full">
          <Seeker
            duration={duration}
            progress={progress}
            setCurrentTime={setCurrentTime}
            Playing={Playing}
          />
          {switching ? (
            <Box height="1.25em">
              <Skeleton marginTop="1" width="5.5em" height="1em" />
            </Box>
          ) : (
            <Time duration={duration} progress={progress} />
          )}
        </div>
      </Controls>

      <audio
        ref={audioRef}
        src={sound.previews['preview-hq-mp3']}
        onAbort={NOOP}
        onCanPlay={() => setCanPlay(true)}
        onCanPlayThrough={NOOP}
        onDurationChange={() => setSwitching(false)}
        onEmptied={NOOP}
        onEnded={() => setPlaying(false)}
        onError={NOOP}
        onLoadedData={NOOP}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        onLoadStart={() => setSwitching(true)}
        onPause={NOOP}
        onPlay={NOOP}
        onPlaying={NOOP}
        onProgress={NOOP}
        onRateChange={NOOP}
        onSeeked={NOOP}
        onSeeking={NOOP}
        onStalled={NOOP}
        onSuspend={NOOP}
        onTimeUpdate={onTimeUpdate}
        onVolumeChange={NOOP}
        onWaiting={NOOP}
      />
    </>
  );
}
