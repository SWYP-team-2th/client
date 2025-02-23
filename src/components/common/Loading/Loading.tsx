import Overlay from '@/components/common/Overlay';

export default function Loading() {
  return (
    <Overlay className="bg-gray-200">
      <div className="flex items-center justify-center h-full">
        <div className="w-10 h-10 border-t-2 border-b-2 border-primary-500 rounded-full animate-spin"></div>
      </div>
    </Overlay>
  );
}
