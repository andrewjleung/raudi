type ToolCardContentProps = {
  title: string;
  description: string;
};

export default function ToolCardContent({
  title,
  description,
}: ToolCardContentProps) {
  return (
    <div className="flex flex-col m-2">
      <div className="text-lg font-extrabold">{title}</div>
      <div className="">{description}</div>
    </div>
  );
}
