import usePollBasicInformation from './hooks';

export default function PollBasicInformation() {
  const { title, description, setTitle, setDescription } =
    usePollBasicInformation();

  return (
    <div className="flex flex-col gap-4">
      <input
        placeholder="투표 제목을 입력해주세요."
        className="bg-white text-heading-1 px-0 border-none placeholder:text-gray-400 focus:outline-none"
        maxLength={50}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="고민하고 계신 내용을 알려주세요."
        className="bg-white text-headline-2 px-0 h-fit border-none resize-none placeholder:text-gray-400 focus:outline-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
}
