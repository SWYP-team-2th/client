export default function VoteCardItem() {
  return (
    <div className="relative w-[212px] h-[276px] rounded-lg border-[3px] border-primary-500 overflow-hidden">
      <img
        src="https://cdn.travie.com/news/photo/first/201710/img_19975_1.jpg"
        className="w-full h-full object-cover"
      />

      <div className="absolute top-2 left-2 flex space-x-2">
        라벨 들어갈 자리
      </div>

      <div className="absolute bottom-0 w-full bg-black bg-opacity-70 p-2 text-white flex justify-between items-center">
        <span className="font-bold">뽀또 A</span>
        <span className="text-red-500">❤️</span>
      </div>
    </div>
  );
}
