interface TagProps {
  children: React.ReactNode;
}

export default function Tag({ children }: TagProps) {
  return (
    <div className="bg-gray-100 border border-primary-300 text-label-x-small-2 text-primary-600 px-[2px] py-[3px] rounded-[2px]">
      {children}
    </div>
  );
}
