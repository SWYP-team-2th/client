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
        'flex flex-col gap-4 px-6 py-8',
        !isLastField && 'border-b-[5px] border-gray-300',
      )}
    >
      <h3 className="text-h3">{fieldTitle}</h3>
      {children}
    </div>
  );
}
