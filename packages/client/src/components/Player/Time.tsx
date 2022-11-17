import classNames from 'classnames';

type HoursMinutesSeconds = {
  hours: number;
  minutes: number;
  seconds: number;
};

type TimeStampProps = {
  seconds: number;
  className?: string;
};

type TimeProps = {
  duration: number;
  progress: number;
};

const getHMS = (seconds: number): HoursMinutesSeconds => {
  const minutes = (seconds / 60) % 60;
  const hours = seconds / (60 * 60);

  return {
    hours: Math.floor(hours),
    minutes: Math.floor(minutes),
    seconds: Math.floor(seconds % 60),
  };
};

const TimeStamp = ({ seconds, className = '' }: TimeStampProps) => {
  const hms = getHMS(seconds);
  const pad = (timePart: number) => String(timePart).padStart(2, '0');
  const timeString =
    hms.hours < 1
      ? `${hms.minutes}:${pad(hms.seconds)}`
      : `${hms.hours}:${pad(hms.minutes)}:${pad(hms.seconds)}`;
  const width =
    timeString.length < 5 ? 'w-10' : timeString.length < 6 ? 'w-12' : 'w-20';

  return <span className={classNames(width, className)}>{timeString}</span>;
};

export default function Time({ duration, progress }: TimeProps) {
  return (
    <div className="flex flex-row">
      <TimeStamp
        className="flex justify-start"
        seconds={(progress / 100) * duration}
      />
      /
      <TimeStamp className="flex justify-end" seconds={duration} />
    </div>
  );
}
