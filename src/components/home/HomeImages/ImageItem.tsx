interface HomeImageType {
  imageUrl: string;
  onClick: () => void;
}

export default function ImageItem({ imageUrl, onClick }: HomeImageType) {
  return (
    <div className="w-[90px] h-[133px ] aspect-[90/113] rounded-xl overflow-hidden bg-gray-100">
      <img
        src={imageUrl}
        alt="뽀또"
        className="w-full h-full object-cover "
        onClick={onClick}
      />
    </div>
  );
}
