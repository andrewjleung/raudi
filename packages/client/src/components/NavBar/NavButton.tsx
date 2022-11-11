import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

type NavButtonProps = {
  href: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function NavButton({
  href,
  onClose,
  className,
  children,
}: NavButtonProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isSelected = location.pathname === href;

  return (
    <div
      className={cn(
        isSelected ? 'font-semibold' : '',
        'px-2 py-1 rounded-lg',
        'transition ease-out hover:bg-gray-100 duration-200',
        'cursor-pointer',
        'text-center',
        'border-1',
        className,
      )}
      onClick={() => {
        onClose();
        navigate(href);
      }}
    >
      {children}
    </div>
  );
}
