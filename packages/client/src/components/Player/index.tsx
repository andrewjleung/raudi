import { useEffect, useRef, useState } from 'react';
import Controls from './Controls';
import PlayPauseButton from './PlayPauseButton';
import Seeker from './Seeker';
import VolumeSlider from './VolumeSlider';

const NOOP = () => {};
const DEFAULT_VOLUME = 30;

type PlayerProps = {
  src: string;
};

export default ({ src }: PlayerProps) => {
  const audioRef = useRef<HTMLMediaElement>(null);

  const CanPlay = useState(false);
  const Playing = useState(false);
  const Volume = useState(DEFAULT_VOLUME);
  const Time = useState(0);
  const Duration = useState<number>(0);
  const Progress = useState(0);
  const Seeking = useState(false);

  const [canPlay, setCanPlay] = CanPlay;
  const [playing, setPlaying] = Playing;
  const [volume] = Volume;
  const [time, setTime] = Time;
  const [duration, setDuration] = Duration;
  const [progress, setProgress] = Progress;

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

    audioRef.current.currentTime = time;
  }, [time]);

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
      <Controls canPlay={canPlay}>
        <PlayPauseButton Playing={Playing} />
        <VolumeSlider Volume={Volume} />
        <Seeker
          duration={duration}
          progress={progress}
          setTime={setTime}
          Seeking={Seeking}
          Playing={Playing}
        />
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
};
