export default function VoteCardItem() {
  return (
    <div className="relative w-[212px] h-[276px] rounded-2xl bg-gray-100 overflow-hidden">
      {/* 이미지 테두리 */}
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-100">
        <img
          src="https://cdn.travie.com/news/photo/first/201710/img_19975_1.jpg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 상단 라벨 자리 */}
      <div className="absolute top-2 left-2 flex space-x-2">
        추후 라벨 들어갈 자리
      </div>

      {/* 하단 텍스트 박스 */}
      <div className="absolute bottom-0 left-0 w-full bg-gray-950/40 px-[13px] pt-[7px] pb-[11px] flex justify-between items-center rounded-b-2xl overflow-hidden box-border">
        <span className="text-gray-100 text-label-medium">사진 이름</span>
        <div></div>
      </div>
    </div>
  );
}
