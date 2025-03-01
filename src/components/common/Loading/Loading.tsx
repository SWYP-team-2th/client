import Spinner from '@/assets/gif/spinner.gif';
import { cn } from '@/utils/cn';

export default function Loading({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-center w-full h-full',
        className,
      )}
      {...props}
    >
      <img src={Spinner} alt="loading" className="w-10 h-10" />
    </div>
  );
}
