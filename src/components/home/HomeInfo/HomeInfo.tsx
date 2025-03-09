import { Label } from '@/components/common/Label/Label';
import { useState } from 'react';

export default function HomeInfo() {
  const [isFullTextShown, setIsFullTextShown] = useState(false);
  const description =
    '안녕하세요.안녕하세요안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요..안녕하세요..안녕하세요..안녕하세요..안녕하세요..안녕하세요.';

  const maxLength = 70;
  const overComment = description.length > maxLength;

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-2">
        <img src="" alt="유저 이미지" className="w-8 h-8 rounded-full mr-2" />
        <span className="text-title-small-1 mr-1">닉네임</span>
        {/* 진행중인지 마감인지*/}
        <Label variant="outline" color="isProgress">
          진행중
        </Label>
        {/* vertical Ellipsis 버튼 하나 */}
      </div>

      <div className="text-sm text-gray-700 pb-2">
        <p className="inline">
          {!isFullTextShown ? description.slice(0, maxLength) : description}
          {!isFullTextShown && overComment && (
            <>
              <button
                onClick={() => setIsFullTextShown(true)}
                className="text-accent-700"
              >
                ...더보기
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
