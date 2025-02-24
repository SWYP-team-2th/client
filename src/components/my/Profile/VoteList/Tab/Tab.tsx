import { TABS } from './constants';

interface TabProps {
  selectedTab: 'my' | 'participated';
  onClickTabMenu: (tab: 'my' | 'participated') => () => void;
}

export default function Tab({ selectedTab, onClickTabMenu }: TabProps) {
  const baseStyle = 'px-4 py-2 rounded-lg transition-colors duration-200';
  const tabStyle = (isSelected: boolean) =>
    isSelected
      ? `${baseStyle} bg-primary text-gray-900 border-b-[2px] border-gray-900 rounded-none`
      : `${baseStyle} bg-gray-100 text-gray-500`;

  return (
    <div className="border-b-[2px] border-gray-200 text-title-medium">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={tabStyle(selectedTab === tab.id)}
          onClick={onClickTabMenu(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
