import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

type NavButtonProps = {
  href: string;
  children: React.ReactNode;
};

export default function NavButton({ href, children }: NavButtonProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isSelected = location.pathname === href;

  const btnClassName = cn(
    isSelected ? 'font-semibold' : '',
    'px-2 py-1 rounded-lg',
    'transition ease-out hover:bg-gray-100 duration-200',
    'cursor-pointer',
  );

  return (
    <div className={btnClassName} onClick={() => navigate(href)}>
      {children}
    </div>
  );
}
