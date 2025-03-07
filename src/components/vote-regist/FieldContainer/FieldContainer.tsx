import { cn } from '@/utils/cn';

interface FieldContainerProps {
  fieldTitle: string;
  isLastField?: boolean;
  children: React.ReactNode;
}

export default function FieldContainer({
  fieldTitle,
  isLastField,
  children,
}: FieldContainerProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 px-6 py-[18px]',
        !isLastField && 'border-b-[3px] border-gray-300',
      )}
    >
      <h3 className="text-title-small-1">{fieldTitle}</h3>
      {children}
    </div>
  );
}
