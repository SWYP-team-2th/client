import { useState } from 'react';
import Icon from '@/components/common/Icon';
import TextInput from '@/components/common/TextInput';

export default function CommentInput() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="w-full px-lg py-3 bg-gray-100 bottom-0 fixed left-1/2 -translate-x-1/2 z-4 max-w-[480px]">
      <TextInput
        placeholder="댓글을 입력해주세요"
        variant="solid"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        rightNode={<Icon name="Send" size="medium" />}
      />
    </div>
  );
}
