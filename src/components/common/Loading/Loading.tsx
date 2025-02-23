import Spinner from '@/assets/gif/spinner.gif';

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <img src={Spinner} alt="loading" className="w-10 h-10" />
    </div>
  );
}
