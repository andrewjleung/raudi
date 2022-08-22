import cn from 'classnames';

type FooterProps = {
  className?: string;
};

export default function Footer({ className = '' }: FooterProps) {
  return (
    <div
      className={cn(
        className,
        'h-10 flex justify-center items-center border-t-1',
        'text-xs',
      )}
    >
      Made by Andrew Leung
    </div>
  );
}
