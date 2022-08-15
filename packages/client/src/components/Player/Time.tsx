type HoursMinutesSeconds = {
  hours: number;
  minutes: number;
  seconds: number;
};

type TimeStampProps = {
  seconds: number;
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

const TimeStamp = ({ seconds }: TimeStampProps) => {
  const hms = getHMS(seconds);
  const pad = (timePart: number) => String(timePart).padStart(2, '0');

  if (hms.hours < 1) {
    return (
      <span className="w-10 flex justify-center">{`${hms.minutes}:${pad(
        hms.seconds,
      )}`}</span>
    );
  }

  return (
    <span className="w-20 flex justify-center">
      {`${hms.hours}:${pad(hms.minutes)}:${pad(hms.seconds)}`}
    </span>
  );
};

export default function Time({ duration, progress }: TimeProps) {
  return (
    <div className="flex flex-row">
      <TimeStamp seconds={(progress / 100) * duration} />
      /
      <TimeStamp seconds={duration} />
    </div>
  );
}
