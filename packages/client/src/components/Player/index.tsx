import { useEffect, useRef, useState } from 'react';
import Controls from './Controls';
import PlayPauseButton from './PlayPauseButton';
import Seeker from './Seeker';
import VolumeSlider from './VolumeSlider';
import Time from './Time';

const NOOP = () => {
  return;
};
const DEFAULT_VOLUME = 50;

type PlayerProps = {
  src: string;
};

export default function Player({ src }: PlayerProps) {
  const audioRef = useRef<HTMLMediaElement>(null);

  const CanPlay = useState(false);
  const Playing = useState(false);
  const Volume = useState(DEFAULT_VOLUME);
  const CurrentTime = useState(0);
  const Duration = useState<number>(0);
  const Progress = useState(0);

  const [canPlay, setCanPlay] = CanPlay;
  const [playing, setPlaying] = Playing;
  const [volume] = Volume;
  const [currentTime, setCurrentTime] = CurrentTime;
  const [duration, setDuration] = Duration;
  const [progress, setProgress] = Progress;

  useEffect(() => {
    setPlaying(false);
    setCurrentTime(0);
    setProgress(0);
  }, [src, setPlaying, setCurrentTime, setProgress]);

  useEffect(() => {
    if (audioRef.current === null) {
      return;
    }

    audioRef.current.volume = volume / 100;
  }, [volume]);

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
      <Controls className="" canPlay={canPlay}>
        <PlayPauseButton Playing={Playing} />
        <VolumeSlider Volume={Volume} />
        <Seeker
          duration={duration}
          progress={progress}
          setCurrentTime={setCurrentTime}
          Playing={Playing}
        />
        <Time duration={duration} progress={progress} />
      </Controls>
      <audio
        ref={audioRef}
        src={src}
        onAbort={NOOP}
        onCanPlay={() => setCanPlay(true)}
        onCanPlayThrough={NOOP}
        onDurationChange={NOOP}
        onEmptied={NOOP}
        onEnded={() => setPlaying(false)}
        onError={NOOP}
        onLoadedData={NOOP}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        onLoadStart={NOOP}
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
