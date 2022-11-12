import cn from 'classnames';

type ToolCardContentProps = {
  title: string;
  description: string;
  className?: string;
};

export default function ToolCardContent({
  title,
  description,
  className,
}: ToolCardContentProps) {
  return (
    <div className={cn('flex flex-col m-2', className)}>
      <div className="text-lg font-extrabold">{title}</div>
      <div className="">{description}</div>
    </div>
  );
}
