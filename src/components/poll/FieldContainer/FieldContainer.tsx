import { cn } from '@/utils/cn';

interface FieldContainerProps {
  title?: string;
  isLastField?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function FieldContainer({
  title,
  isLastField,
  children,
  className,
}: FieldContainerProps) {
  return (
    <section
      className={cn(
        'py-6 flex flex-col gap-[18px]',
        !isLastField && 'border-b-[1px] border-gray-200',
        className,
      )}
    >
      {title && <h3 className="text-headline-1 text-primary-600">{title}</h3>}
      {children}
    </section>
  );
}
