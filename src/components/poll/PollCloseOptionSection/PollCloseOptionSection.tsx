import { useEffect, useState } from 'react';
import usePollCloseOptionSection from './hooks';
import FieldContainer from '../../poll/FieldContainer';
import RadioGroup from '@/components/common/RadioGroup';

export default function PollCloseOptionSection() {
  const {
    closeType,
    setCloseType,
    closedAt,
    setClosedAt,
    maxVoterCount,
    handleMaxVoterCount,
  } = usePollCloseOptionSection();

  return (
    <FieldContainer title="마감 설정" isLastField>
      <RadioGroup
        size="medium"
        options={[
          {
            value: 'DATE',
            label: '시간으로 마감',
            Content: (
              <TimeCloseContent
                closedAt={closedAt ?? ''}
                setClosedAt={setClosedAt}
              />
            ),
          },
          {
            value: 'VOTER',
            label: '투표 수로 마감',
            Content: (
              <MaxVoterCountContent
                maxVoterCount={maxVoterCount ?? 0}
                setMaxVoterCount={handleMaxVoterCount}
              />
            ),
          },
          { value: 'SELF', label: '직접 마감' },
        ]}
        value={closeType}
        onChange={(value) => setCloseType(value as 'SELF' | 'DATE' | 'VOTER')}
      />
    </FieldContainer>
  );
}

function TimeCloseContent({
  closedAt,
  setClosedAt,
}: {
  closedAt: string;
  setClosedAt: (value: string) => void;
}) {
  const [date, setDate] = useState(closedAt);
  const [time, setTime] = useState(closedAt);

  useEffect(() => {
    if (date && time) {
      setClosedAt(`${date}T${time}`);
    } else {
      setClosedAt('');
    }
  }, [date, time]);

  return (
    <div className="flex flex-col gap-3 text-gray-600 text-body-1-long">
      <div className="flex gap-[18px]">
        <p className="text-primary-700 text-body-1-long">날짜 선택</p>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="flex gap-[18px]">
        <p className="text-primary-700 text-body-1-long">시간 선택</p>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
    </div>
  );
}

function MaxVoterCountContent({
  maxVoterCount,
  setMaxVoterCount,
}: {
  maxVoterCount: number;
  setMaxVoterCount: (value: string) => void;
}) {
  return (
    <div className="flex gap-[18px]">
      <p className="text-primary-700 text-body-1-long">최대 참여자 수</p>
      <div className="flex items-center">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={maxVoterCount === 0 ? '' : String(maxVoterCount)}
          onChange={(e) => {
            setMaxVoterCount(e.target.value);
          }}
          className="border-none focus:outline-none text-right w-[34px]"
        />
        <span className="ml-1">명</span>
      </div>
    </div>
  );
}
