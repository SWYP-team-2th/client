import ImageItem from '@/components/home/HomeImages/ImageItem';

export default function ImageList() {
  return (
    <div className="w-full overflow-x-auto mb-[6px] pl-[2px]">
      <div className="flex space-x-[6px] w-max">
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
        <ImageItem />
      </div>
    </div>
  );
}
