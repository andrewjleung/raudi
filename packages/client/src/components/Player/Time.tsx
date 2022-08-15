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
  const minutes = seconds / 60;
  const hours = minutes / 60;

  return {
    hours: Math.floor(hours),
    minutes: Math.floor(minutes),
    seconds: Math.floor(seconds % 60),
  };
};

const TimeStamp = ({ seconds, className }: TimeStampProps) => {
  const hms = getHMS(seconds);
  const pad = (timePart: number) => String(timePart).padStart(2, '0');
  const classNameProps = className || '';

  // TODO: Perfect the widths a bit more.
  if (hms.hours < 1) {
    return (
      <span className={`w-10 ${classNameProps}`}>{`${hms.minutes}:${pad(
        hms.seconds,
      )}`}</span>
    );
  }

  return (
    <span className={`w-20 ${classNameProps}`}>
      {`${hms.hours}:${pad(hms.minutes)}:${pad(hms.seconds)}`}
    </span>
  );
};

export default function Time({ duration, progress }: TimeProps) {
  return (
    <div className="flex flex-row">
      <TimeStamp seconds={(progress / 100) * duration} />
      /
      <TimeStamp className="flex justify-end" seconds={duration} />
    </div>
  );
}
