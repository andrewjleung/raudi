type WritingProps = {
  children: React.ReactNode;
};

export default function Writing({ children }: WritingProps) {
  return <div className="my-6 flex flex-col gap-4">{children}</div>;
}
