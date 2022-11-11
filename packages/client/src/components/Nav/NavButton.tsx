import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

type NavButtonProps = {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function NavButton({
  href,
  onClick,
  className,
  children,
}: NavButtonProps) {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'px-2 py-1 rounded-lg',
        'transition ease-out hover:bg-gray-100 duration-200',
        'cursor-pointer',
        'text-center',
        'border-1',
        className,
      )}
      onClick={() => {
        onClick();
        navigate(href);
      }}
    >
      {children}
    </div>
  );
}
