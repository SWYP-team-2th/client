import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';

export default function TermsPage() {
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
        centerNode={<h1 className="text-title-medium">이용약관</h1>}
      />

      <section className="flex flex-col gap-4 pt-[55px] text-gray-800">
        <h2 className="text-headline-1 text-gray-900">제1조(목적)</h2>
        <p className="text-body-1-long">
          본 약관은 사진 기반 투표 서비스 "츄즈"(이하 "CHOOZ")를 제공하는 운영
          회사(이하 "회사")와 서비스 이용자 간의 권리, 의무 및 책임사항을
          규정하는 것을 목적으로 합니다.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-headline-1 text-gray-900">제2조(정의)</h2>
        <p className="text-body-1-long">
          본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
        </p>
        <ol className="list-decimal list-inside text-body-1-long ml-4 space-y-2">
          <li>
            "CHOOZ": 이용자가 여러 사진을 업로드하고 투표를 생성하여 다른
            이용자들의 의견을 받을 수 있는 SNS 서비스를 말합니다.
          </li>
          <li>"회원": CHOOZ에 가입하여 서비스를 이용하는 자를 말합니다.</li>
          <li>
            "투표": 이용자가 업로드한 사진에 대해 다른 이용자들이 참여하여
            의견을 표현하는 기능을 말합니다.
          </li>
          <li>
            "댓글": 투표에 대한 의견을 남기는 기능을 말합니다. "댓글 좋아요"는
            댓글에 좋아요를 누르는 것을 의미합니다.
          </li>
          <li>
            "공개투표": 모든 이용자가 조회하고 참여할 수 있는 투표를 말합니다.
          </li>
          <li>"비공개 투표": 특정 이용자에게만 공유되는 투표를 말합니다.</li>
        </ol>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-headline-1 text-gray-900">
          제3조(약관의 효력 및 변경)
        </h2>
        <ol className="list-decimal list-inside text-body-1-long ml-4 space-y-2">
          <li>본 약관은 서비스를 이용하는 모든 이용자에게 적용됩니다.</li>
          <li>
            회사는 필요 시 본 약관을 변경할 수 있으며, 변경된 약관은 서비스 내
            공지사항을 통해 사전 공지합니다.
          </li>
          <li>
            변경된 약관은 공지된 날짜부터 효력이 발생하며, 이용자가 변경된
            약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있습니다. 변경
            이후 계속해서 서비스를 이용하는 경우 변경된 약관에 동의한 것으로
            간주합니다.
          </li>
        </ol>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-headline-1 text-gray-900">
          제4조(서비스 제공 및 변경)
        </h2>
        <ol className="list-decimal list-inside text-body-1-long ml-4 space-y-2">
          <li>
            회사는 다음과 같은 서비스를 제공합니다:
            <ul className="list-disc list-inside text-body-1-long ml-4 mt-1">
              <li>사진 업로드 및 투표 생성</li>
              <li>댓글 및 댓글 좋아요 기능</li>
              <li>투표 종료 및 결과 확인</li>
              <li>마이페이지 투표 내역 확인</li>
            </ul>
          </li>
          <li>
            회사는 기술적 변경, 서비스 정책 변경 등의 사유로 서비스 내용을
            변경할 수 있으며, 이 경우 사전 공지합니다.
          </li>
        </ol>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-headline-1 text-gray-900">
          제5조(서비스 이용 제한)
        </h2>
        <p className="text-body-1-long">
          다음의 경우 서비스 이용이 제한될 수 있습니다:
        </p>
        <ol className="list-decimal list-inside text-body-1-long ml-4 space-y-2">
          <li>타인의 사진을 무단으로 사용하여 투표를 생성하는 경우</li>
          <li>음란물, 혐오 콘텐츠, 불법적인 내용을 업로드하는 경우</li>
          <li>타인의 개인정보를 무단으로 공유하는 경우</li>
          <li>서비스의 정상적인 운영을 방해하는 행위</li>
        </ol>
      </section>

      <section className="flex flex-col gap-4">
        <p className="text-body-1-long">
          본 약관 및 개인정보처리방침은 2025년 3월 1일부터 적용됩니다.
        </p>
      </section>
    </div>
  );
}
