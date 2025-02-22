export default function VoteCardItem() {
  return (
    <div className="relative w-full aspect- rounded-2xl bg-gray-100 overflow-hidden">
      {/* grid로 박아놓는다? */}

      <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-gray-100">
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20210316/pngtree-vertical-version-of-romantic-spring-cherry-blossom-photography-image_586813.jpg"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute top-2 left-2 flex space-x-2">
        추후 라벨 들어갈 자리
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-gray-950/40 px-[13px] pt-[7px] pb-[11px] flex justify-between items-center rounded-b-2xl overflow-hidden box-border">
        <span className="text-gray-100 text-label-medium">사진 이름</span>
        <div></div>
      </div>
    </div>
  );
}
