import { useEffect, useRef, useState } from 'react';
import Controls from './Controls';
import PlayPauseButton from './PlayPauseButton';
import VolumeSlider from './VolumeSlider';

const NOOP = () => {};

const DEFAULT_VOLUME = 30;

type PlayerProps = {
  src: string;
};

export default ({ src }: PlayerProps) => {
  const audioRef = useRef<HTMLMediaElement>(null);
  const [canPlayThrough, setCanPlayThrough] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);

  useEffect(() => {
    if (audioRef.current === null) {
      return;
    }

    audioRef.current.volume = volume / 100.0;
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

  return (
    <>
      <Controls canPlayThrough={canPlayThrough}>
        <PlayPauseButton playing={playing} setPlaying={setPlaying} />
        <VolumeSlider volume={volume} setVolume={setVolume} />
      </Controls>
      <audio
        ref={audioRef}
        src={src}
        onCanPlay={NOOP}
        onCanPlayThrough={() => setCanPlayThrough(true)}
        onDurationChange={NOOP}
        onEmptied={NOOP}
        onEnded={NOOP}
        onLoadedData={NOOP}
        onLoadedMetadata={NOOP}
        onPause={NOOP}
        onPlay={NOOP}
        onPlaying={NOOP}
        onRateChange={NOOP}
        onSeeked={NOOP}
        onSeeking={NOOP}
        onStalled={NOOP}
        onSuspend={NOOP}
        onTimeUpdate={NOOP}
        onVolumeChange={NOOP}
        onWaiting={NOOP}
      />
    </>
  );
};
