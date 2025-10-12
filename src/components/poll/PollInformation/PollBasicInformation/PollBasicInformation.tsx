import { useRef, useEffect } from 'react';
import usePollBasicInformation from './hooks';

export default function PollBasicInformation() {
  const { title, description, setTitle, setDescription } =
    usePollBasicInformation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [description]);

  return (
    <div className="flex flex-col gap-3">
      <input
        placeholder="투표 제목을 입력해주세요."
        className="bg-white text-heading-2 px-0 border-none placeholder:text-gray-400 focus:outline-none"
        maxLength={50}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        ref={textareaRef}
        rows={1}
        placeholder="고민하고 계신 내용을 알려주세요."
        className="bg-white text-headline-2 px-0 border-none resize-none placeholder:text-gray-400 focus:outline-none overflow-hidden"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          adjustTextareaHeight();
        }}
      />
    </div>
  );
}
