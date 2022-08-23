// TODO: add key listeners to map certain functions to expected keys

type ControlsProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Controls({ children, className }: ControlsProps) {
  return <div className={className}>{children}</div>;
}
