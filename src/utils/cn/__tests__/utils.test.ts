import { describe, it, expect } from 'vitest';
import cn from '../cn';

describe('test cn(): className을 오버라이딩하고, 조건부 스타일링을 할 수 있게 도와주는 유틸 함수', () => {
  it('cn() 함수는 두 개의 인자를 받아서 두 개의 인자를 합친 결과를 반환한다.', () => {
    // when
    const firstInput = 'pt-4';
    const secondInput = 'bg-red-500';

    // given
    const result = cn(firstInput, secondInput);

    // then
    expect(result).toBe('pt-4 bg-red-500');
  });

  it('cn() 함수는 아래와 같이 조건부 스타일링이 가능하다.', () => {
    // when
    const defaultInput = 'pt-4';
    const isActive1 = true;
    const isActive2 = false;

    // given
    const result1 = cn(
      defaultInput,
      isActive1 && 'bg-red-500',
      !isActive1 && 'bg-blue-500',
    );

    const result2 = cn(
      defaultInput,
      isActive2 && 'bg-red-500',
      !isActive2 && 'bg-blue-500',
    );

    // then
    expect(result1).toBe('pt-4 bg-red-500');
    expect(result2).toBe('pt-4 bg-blue-500');
  });
});
