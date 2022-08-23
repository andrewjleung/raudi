import { useEffect, useRef, useState } from 'react';
import Controls from './Controls';
import PlayPauseButton from './PlayPauseButton';
import Seeker from './Seeker';
import { VolumeSetter, VolumeButton, VolumeSlider } from './VolumeSetter';
import Time from './Time';
import NextButton from './NextButton';
import { Box, Skeleton, Spacer } from '@chakra-ui/react';

const NOOP = () => {
  return;
};
const DEFAULT_VOLUME = 50;

type PlayerProps = {
  src: string;
  onClickNext: () => void;
  canGetNextSound: boolean;
};

export default function Player({
  src,
  onClickNext,
  canGetNextSound,
}: PlayerProps) {
  const audioRef = useRef<HTMLMediaElement>(null);

  const CanPlay = useState(false);
  const Playing = useState(false);
  const Volume = useState(DEFAULT_VOLUME);
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

  useEffect(() => {
    setPlaying(false);
    setCurrentTime(0);
    setProgress(0);
  }, [src, setPlaying, setCurrentTime, setProgress]);

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
        <div className="pl-3 pr-3 flex flex-row w-full gap-3">
          <PlayPauseButton Playing={Playing} canPlay={canPlay} />
          <NextButton onClick={onClickNext} disabled={!canGetNextSound} />
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
        src={src}
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
