import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();

  const handleClickBackButton = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-8 p-6 max-w-[480px] mx-auto">
      <Header
        leftNode={
          <Icon
            name="ArrowLeft"
            size="medium"
            onClick={handleClickBackButton}
          />
        }
        centerNode={<h1 className="text-title-medium">개인정보처리방침</h1>}
      />
      <section className="flex flex-col gap-4 pt-[55px] text-gray-800">
        <h2 className="text-headline-1 text-gray-900">제1조(목적)</h2>
        <p className="text-body-1-long">
          츄즈는 제공하고자 하는 서비스를 이용하는 개인(이하 '이용자' 또는
          '개인')의 정보(이하 '개인정보')를 보호하기 위해, 개인정보 보호법,
          정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하 '정보통신망법') 등
          관련 법령을 준수하고, 서비스 이용자의 개인정보 보호 관련한 고충을
          신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이
          개인정보처리방침(이하 '본 방침')을 수립합니다.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-headline-1 text-gray-900">제2조(개인정보 수집)</h2>
        <p className="text-body-1-long">
          츄즈는 서비스 제공을 위해 개인정보 관련 법령 및 본 방침에 따라
          이용자의 개인정보를 수집하고 있습니다.
        </p>

        <div className="flex flex-col gap-3 ml-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-body-1-long font-semibold">
              1. 필수 수집 정보
            </h3>
            <p className="text-body-1-long">
              카카오 소셜 로그인을 통해 연동되는 이용자의 다음 정보
            </p>
            <ul className="list-disc list-inside text-body-1-long ml-4">
              <li>카카오 고유 식별자 (카카오 ID)</li>
              <li>닉네임 (이용자가 제공에 동의한 경우)</li>
              <li>프로필 이미지(이용자가 제공에 동의한 경우)</li>
            </ul>
            <p className="text-body-1-long">
              ※ 수집되는 정보는 카카오 로그인 시 이용자가 동의한 범위 내에서
              제공되며, 서비스 제공에 반드시 필요한 최소한의 항목만 수집됩니다.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-body-1-long font-semibold">
              2. 자동 수집 항목
            </h3>
            <p className="text-body-1-long">
              서비스 이용 과정에서 아래 정보가 자동으로 수집될 수 있습니다.
            </p>
            <ul className="list-disc list-inside text-body-1-long ml-4">
              <li>접속 IP, 서비스 이용기록, 기기정보, 브라우저 정보</li>
              <li>
                Google Analytics 등 웹 분석 도구를 통한 비식별 통계 데이터
              </li>
            </ul>
            <p className="text-body-1-long">
              ※ 수집되는 정보는 이용자의 동의 범위 내에서 서비스 제공 및 품질
              향상을 위해 사용되며, 법령에서 정한 경우를 제외하고 제3자에게
              제공되지 않습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-headline-1 text-gray-900">제3조(개인정보 이용)</h2>
        <p className="text-body-1-long">
          회사는 수집한 개인정보를 다음의 목적에 한해 이용합니다.
        </p>
        <ol className="list-decimal list-inside text-body-1-long ml-4">
          <li>회원관리 및 서비스 제공·운영·개선</li>
          <li>문의사항 또는 불만처리, 공지사항 전달</li>
          <li>Google Analytics 등 분석 도구를 통한 이용 현황 분석</li>
          <li>서비스 품질 향상 및 신규 기능 개발을 위한 통계분석</li>
          <li>법령 및 약관 위반 행위에 대한 이용 제한 및 대응</li>
        </ol>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-headline-1 text-gray-900">제4조(본 방침의 공개)</h2>
        <ol className="list-decimal list-inside text-body-1-long ml-4">
          <li>
            회사는 이용자가 언제든지 쉽게 본 방침을 확인할 수 있도록 츄즈 서비스
            내 마이페이지 {'>'} 설정 {'>'} 개인정보처리방침을 통해 본 방침을
            공개하고 있습니다.
          </li>
        </ol>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-headline-1 text-gray-900">제5조(본 방침의 변경)</h2>
        <ol className="list-decimal list-inside text-body-1-long ml-4 space-y-2">
          <li>
            본 방침은 개인정보 관련 법령, 지침, 고시 또는 정부나 회사 서비스의
            정책이나 내용의 변경에 따라 개정될 수 있습니다.
          </li>
          <li>
            회사는 제1항에 따라 본 방침을 개정하는 경우 아래 방법으로
            공지합니다.
            <ul className="list-none text-body-1-long ml-4 mt-1">
              <li>가. 츄즈 서비스 내 알림 센터의 알림으로 공지</li>
            </ul>
          </li>
          <li>
            회사는 제2항의 공지는 본 방침 개정의 시행일로부터 최소 7일 이전에
            공지합니다. 다만, 이용자 권리에 중요한 변경이 있을 경우에는 최소
            30일 전에 공지합니다.
          </li>
        </ol>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-headline-1 text-gray-900">
          제6조(개인정보의 보유 및 이용기간)
        </h2>
        <ol className="list-decimal list-inside text-body-1-long ml-4 space-y-2">
          <li>
            회사는 개인정보 수집·이용 목적이 달성된 후에는 지체 없이 해당 정보를
            파기합니다.
          </li>
          <li>
            이용자가 회원 탈퇴를 요청할 경우, 회사는 관련 법령에 따라 즉시
            파기하며, 카카오로부터 제공받은 정보는 카카오의 정책에 따릅니다.
          </li>
          <li>
            웹 분석 도구를 통해 수집된 비식별 통계 데이터는 서비스 개선을 위한
            분석 목적으로 일정 기간 보관될 수 있습니다.
          </li>
          <li>
            법령에 따라 일정 기간 보관이 필요한 경우, 해당 법령에서 정한 기간
            동안 보관 후 파기합니다.
          </li>
        </ol>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-headline-1 text-gray-900">부칙</h2>
        <p className="text-body-1-long">
          제1조 본 방침은 2025.12.01 부터 시행합니다.
        </p>
      </section>
    </div>
  );
}
