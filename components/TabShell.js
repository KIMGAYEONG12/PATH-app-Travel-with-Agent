import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

// Wraps the five bottom-tab root screens (홈/지도/AI 여행/찜/MY).
// Renders a left sidebar nav on desktop and a bottom tab bar on mobile,
// exactly like the PC / mobile prototype pair.
//
// `crumb`: optional light-grey prefix shown before the bold title on
// desktop, e.g. crumb="MY" title="내 여행 일정" -> "MY   내 여행 일정".
//
// `hideMobileNav`: 뒤로가기가 있는 상세 화면(예: 이동 경로)에서 모바일
// 하단 탭바를 감추고 싶을 때 true로 넘깁니다. 데스크톱 사이드바는 그대로
// 유지됩니다(데스크톱은 항상 사이드바 내비게이션이라 탭바와 무관).
//
// `compactHeader`: MY 관련 화면(내 여행 일정/프로필 수정/설정/고객센터 등)은
// 다른 탭보다 데스크톱 헤더 글씨를 한 단계 작게 씁니다.
//
// `wide`: 내 여행 일정처럼 데스크톱 카드 그리드를 기본 캔버스 폭보다
// 조금 더 크게 보여주고 싶은 화면에서 true로 넘깁니다.
export default function TabShell({
  title,
  crumb,
  children,
  hideMobileNav = false,
  compactHeader = false,
  wide = false,
}) {
  return (
    <div className="pz-shell flex min-h-dvh w-full flex-col bg-transparent lg:flex-row lg:bg-white">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        {title && (
          <header className="hidden shrink-0 items-center gap-2 border-b border-line px-10 py-6 lg:flex">
            {crumb && (
              <span className={`font-medium text-muted ${compactHeader ? "text-[14px]" : "text-[16px]"}`}>
                {crumb}
              </span>
            )}
            <h1 className={`font-bold text-navy-deep ${compactHeader ? "text-[19px]" : "text-[23px]"}`}>
              {title}
            </h1>
          </header>
        )}
        <div className="flex flex-1 flex-col lg:items-start lg:bg-[#eef2fb]">
          {/* lg:max-w — 큰 모니터에서 사진/카드가 가장자리까지 늘어나 지나치게
              커 보이지 않도록 프로토타입 캔버스 폭과 비슷한 값으로 제한합니다. */}
          <div
            className={`flex w-full flex-1 flex-col lg:mx-auto lg:px-10 lg:py-8 ${
              wide ? "lg:max-w-[1320px]" : "lg:max-w-[1180px]"
            }`}
          >

            {children}
          </div>
        </div>
      </div>
      {!hideMobileNav && (
        <div className="lg:hidden fixed bottom-0 left-1/2 z-30 w-full max-w-[480px] -translate-x-1/2">
          <BottomNav />
        </div>
      )}
    </div>
  );
}
