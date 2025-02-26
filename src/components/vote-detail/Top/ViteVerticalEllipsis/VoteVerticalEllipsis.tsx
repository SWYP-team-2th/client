import { useState, useRef, useEffect } from 'react';
import More from '@/assets/icons/more_24px.svg?react';
import Icon from '@/components/common/Icon';

export default function VoteVerticalEllipsis() {
  const [isOpen, setIsOpen] = useState(false);
  const ellipsisRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 메뉴 닫히도록
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ellipsisRef.current &&
        !ellipsisRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={ellipsisRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full cursor-pointer"
      >
        <More />
      </button>

      {isOpen && (
        <div className=" absolute right-0 py-[10px] w-[126px] bg-gray-100 rounded-xl z-50 text-caption shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05),0px_2px_15px_0px_rgba(0,0,0,0.10)]">
          {/* 추후에 공통으로 빼도 좋을듯 */}
          <button className="flex items-center w-full px-4 gap-sm cursor-pointer">
            <Icon name="VoteClose" size="small" />
            <span>투표 마감</span>
          </button>
          <button className="flex items-center w-full px-4 py-sm gap-sm cursor-pointer">
            <Icon name="Link" size="small" />
            <span>링크 공유</span>
          </button>
          <hr className="text-gray-300"></hr>
          <button className="flex items-center w-full px-4 pt-sm gap-sm cursor-pointer">
            <Icon name="Trash" size="small" />
            <span>게시글 삭제</span>
          </button>
        </div>
      )}
    </div>
  );
}
