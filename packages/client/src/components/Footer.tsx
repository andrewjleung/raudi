import { Link } from '@chakra-ui/react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

type FooterProps = {
  className?: string;
};

export default function Footer({ className = '' }: FooterProps) {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        className,
        'h-16 flex flex-col justify-center items-center border-t-1 gap-3',
        'text-xs',
      )}
    >
      <div>
        Made by{' '}
        <Link href="https://andrewjleung.me/" isExternal>
          Andrew Leung
        </Link>
      </div>
      <div
        className="flex flex-row gap-3 hover:underline"
        onClick={() => navigate('/privacy')}
      >
        Privacy Policy
      </div>
    </div>
  );
}
