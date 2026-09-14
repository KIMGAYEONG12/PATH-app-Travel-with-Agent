import Link from "next/link";
import TabShell from "@/components/TabShell";
import LogoHeader from "@/components/LogoHeader";
import Card from "@/components/Card";
import PlacePhoto from "@/components/PlacePhoto";
import { IconSparkle, IconChevronRight } from "@/components/Icons";

// PC 홈 하단 "이런 것도 물어보세요" — 각 칩은 실제로 눌러서 이동 가능한
// 화면으로 연결됩니다 (일본 여행 팁 문서 / 맛집만 필터링된 지도 / 교통패스 항목).
const ASK_CHIPS = [
  { label: "일본 여행 가이드", href: "/my/support/tips" },
  { label: "주변 맛집 추천", href: "/map?filter=맛집" },
  { label: "교통패스 알아보기", href: "/my/support/tips#transit-pass" },
];

// 모바일은 3개 오버레이 타일, PC(프로토타입 "PC 홈")는 4개 카드 + 부제 표기.
const SPOTS = [
  { id: "senso", name: "센소지", time: "관광지 · 도보 8분" },
  { id: "skytree", name: "스카이트리", time: "관광지 · 도보 12분" },
  { id: "shibuya", name: "시부야", time: "관광지 · 도보 5분" },
  { id: "senso", name: "우에노 공원", time: "관광지 · 도보 12분" },
];

export default function HomePage() {
  return (
    <TabShell title="홈">
      <LogoHeader />
      <main className="flex flex-col gap-6 px-5 pt-2 lg:px-0">
        <Link
          href="/ai"
          className="flex items-center justify-between rounded-3xl bg-navy px-6 py-6 text-white shadow-lg shadow-navy/20"
        >
          <div>
            <p className="flex items-center gap-2 text-[18px] font-bold">
              <IconSparkle className="h-5 w-5 text-accent-orange" />
              AI 여행 만들기
            </p>
            <p className="mt-2 text-[14px] text-white/80">
              &ldquo;신주쿠에서 걷기 최소로&rdquo; 한마디면 끝
            </p>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15">
            <IconChevronRight className="h-5 w-5" />
          </span>
        </Link>

        <section>
          <h2 className="mb-3 text-[17px] font-bold text-navy-deep">지금, 도쿄는 어때요?</h2>

          {/* 모바일: 이미지 위에 이름 오버레이 (3개) */}
          <div className="grid grid-cols-3 gap-3 lg:hidden">
            {SPOTS.slice(0, 3).map((s) => (
              <Link key={s.name} href={`/ai/place/${s.id}`}>
                <PlacePhoto name={s.name} className="aspect-square rounded-2xl" />
              </Link>
            ))}
          </div>

          {/* PC: 이미지 아래에 이름/부제 표기 (4개) */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
            {SPOTS.map((s) => (
              <Link key={s.name} href={`/ai/place/${s.id}`} className="block">
                <PlacePhoto
                  name={s.name}
                  className="aspect-[4/3] w-full rounded-2xl"
                  labelClassName="hidden"
                />
                <p className="mt-2.5 text-[15px] font-bold text-navy-deep">{s.name}</p>
                <p className="mt-0.5 text-[13px] text-muted">{s.time}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid gap-4 pb-6 lg:grid-cols-2">
          <Link href="/my/trips" className="block">
            <Card className="flex items-center justify-between">
              <div>
                <p className="text-[13px] text-muted">내 여행 요약</p>
                <p className="mt-1 text-[16px] font-bold text-navy-deep">도쿄 여행 · D-12 진행중</p>
                <p className="mt-0.5 hidden text-[13px] text-muted lg:block">04.12 - 04.14 · 2박 3일</p>
              </div>
              <span className="hidden shrink-0 rounded-xl bg-navy px-5 py-3 text-[14px] font-bold text-white lg:block">
                일정 보기
              </span>
              <IconChevronRight className="h-5 w-5 shrink-0 text-navy lg:hidden" />
            </Card>
          </Link>

          <Link href="/ai/chat" className="block">
            <Card className="flex items-center justify-between">
              <div>
                <p className="text-[13px] text-muted">최근 AI 대화 이어하기</p>
                <p className="mt-1 text-[16px] font-bold text-navy-deep">&quot;점심을 스시로 바꿔줘&quot;</p>
                <p className="mt-0.5 hidden text-[13px] text-muted lg:block">3분 전</p>
              </div>
              <span className="hidden shrink-0 rounded-xl bg-navy px-5 py-3 text-[14px] font-bold text-white lg:block">
                이어서 대화하기
              </span>
              <IconChevronRight className="h-5 w-5 shrink-0 text-navy lg:hidden" />
            </Card>
          </Link>
        </div>

        {/* PC 전용 — 모바일 프로토타입("홈")에는 없는 섹션 */}
        <section className="hidden pb-10 lg:block">
          <h2 className="mb-3 text-[17px] font-bold text-navy-deep">이런 것도 물어보세요</h2>
          <div className="flex flex-wrap gap-3">
            {ASK_CHIPS.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="rounded-full border border-line bg-white px-5 py-3 text-[14px] font-semibold text-navy-deep transition hover:border-navy"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </TabShell>
  );
}
