"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import LogoHeader from "@/components/LogoHeader";
import PlacePhoto from "@/components/PlacePhoto";
import Icon from "@/components/Icon";

const FILTERS = ["전체", "관광지", "맛집", "숙소"];

const PINS = [
  {
    name: "스카이트리",
    tag: "관광지",
    top: "32%",
    left: "34%",
    color: "#2f6fb0",
  },
  { name: "센소지", tag: "관광지", top: "40%", left: "20%", color: "#f4a268" },
  { name: "신주쿠", tag: "관광지", top: "56%", left: "22%", color: "#24a36a" },
];

const PLACE_LIST = [
  { name: "센소지", tag: "관광지", walk: "도보 6분" },
  { name: "이치란 라멘", tag: "맛집", walk: "도보 3분" },
  { name: "우에노 공원", tag: "관광지", walk: "도보 12분" },
];

function Pins({ big }) {
  return PINS.map((p) => (
    <Link
      key={p.name}
      href="/map/route"
      className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
      style={{ top: p.top, left: p.left }}
    >
      <span
        className="shrink-0 rounded-full border-2 border-white shadow"
        style={{
          backgroundColor: p.color,
          width: big ? 16 : 14,
          height: big ? 16 : 14,
        }}
      />
      <span className="whitespace-nowrap rounded-full bg-white/90 px-2.5 py-1 text-[13px] font-bold text-navy-deep shadow">
        {p.name}
      </span>
    </Link>
  ));
}

export default function MapPage() {
  return (
    <Suspense fallback={null}>
      <MapPageInner />
    </Suspense>
  );
}

function MapPageInner() {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("전체");
  const [query, setQuery] = useState("");

  // 홈의 "주변 맛집 추천"(/map?filter=맛집)처럼 다른 화면에서 필터를 지정해
  // 들어올 수 있어, 처음 마운트될 때 그 값을 그대로 반영합니다.
  useEffect(() => {
    const f = searchParams.get("filter");
    if (f && FILTERS.includes(f)) setFilter(f);
  }, [searchParams]);

  const filteredList = useMemo(
    () =>
      PLACE_LIST.filter((p) => {
        const q = query.trim().toLowerCase();
        const okQ = q ? p.name.toLowerCase().includes(q) : true;
        const okF = filter === "전체" ? true : p.tag === filter;
        return okQ && okF;
      }),
    [query, filter],
  );

  return (
    <div className="pz-shell flex min-h-dvh w-full flex-col bg-transparent lg:flex-row lg:bg-white">
      <Sidebar />

      {/* ---------- 모바일: 지도만 크게 (하단 메뉴 없음) ---------- */}
      <div
        className="relative w-full lg:hidden"
        style={{ height: "calc(100dvh - 92px)" }}
      >
        {/* 지도를 상단바 바로 아래부터 전체 영역에 꽉 채움 */}
        <div className="map-grid absolute inset-0">
          <Pins />
        </div>

        {/* 상단바(로고)만 배경이 있고, 검색창은 지도 위에 떠 있는 형태 */}
        <div className="absolute inset-x-0 top-0 z-10">
          <div className="bg-(--bg)">
            <LogoHeader />
          </div>
          <div className="px-5 pb-4 pt-3">
            <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-[0_6px_20px_rgba(30,39,97,0.08)]">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="어디로 여행할까요?"
                className="w-full border-none bg-transparent text-[15px] text-navy-deep outline-none placeholder:text-muted focus:outline-none focus:ring-0"
                style={{
                  WebkitTapHighlightColor: "transparent",
                  boxShadow: "none",
                }}
              />
              <Icon name="search" size={20} className="shrink-0 text-navy" />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- PC: 좌측 리스트 + 우측 지도 (프로토타입 "PC 지도") ----------
          다른 데스크톱 화면들(TabShell 기반: 홈/찜/MY 등)과 동일하게 본문을
          max-w-[1180px]로 제한합니다. 이 제한이 빠져 있으면 넓은 모니터에서
          지도 영역이 브라우저 오른쪽 끝까지 늘어나 버려(예전 스크린샷) 디자인
          시안과 다르게 보였습니다. */}
      <div className="hidden min-w-0 flex-1 flex-col lg:flex">
        <header className="flex shrink-0 items-center border-b border-line px-10 py-6">
          <h1 className="text-[23px] font-bold text-navy-deep">지도</h1>
        </header>
        <div className="flex flex-1 bg-[#eef2fb]">
          {/* justify-center와 mx-auto를 쓰면 넓은 모니터에서 이 박스가
              남는 공간의 가운데로 밀려나 좌우에 똑같이 큰 여백이 생겨
              버립니다(디자인 시안과 다르게 보였던 지점). 시안처럼 사이드바에
              바로 붙어 시작하고, 오른쪽에만 여백이 남도록 정렬을 왼쪽
              기본값(justify-start)으로 둡니다. */}
          <div className="flex w-full max-w-[1180px] flex-1 gap-8 px-10 py-8">
            <div className="flex w-105 shrink-0 flex-col gap-5">
              <div className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-3.5 text-muted">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="검색"
                  className="w-full bg-transparent text-[15px] text-navy-deep outline-none placeholder:text-muted"
                />
                <Icon name="search" size={18} />
              </div>
              <div className="flex gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-full border px-4 py-2 text-[15px] font-bold transition ${
                      filter === f
                        ? "border-navy bg-navy text-white"
                        : "border-navy/40 bg-white text-navy"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {filteredList.length === 0 ? (
                  <p className="py-10 text-center text-[13px] text-muted">
                    &ldquo;{query}&rdquo; 검색 결과가 없어요.
                  </p>
                ) : (
                  filteredList.map((p) => (
                    <Link
                      key={p.name}
                      href="/map/route"
                      className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4"
                    >
                      <PlacePhoto
                        name={p.name}
                        className="h-24 w-24 shrink-0 rounded-2xl"
                        labelClassName="hidden"
                      />
                      <div>
                        <span className="inline-block rounded-full bg-[#eef2fb] px-2.5 py-0.5 text-[11px] font-bold text-muted">
                          {p.tag}
                        </span>
                        <p className="mt-1 text-[16px] font-extrabold text-navy-deep">
                          {p.name}
                        </p>
                        <p className="mt-0.5 text-[10px] text-muted">{p.walk}</p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
            {/* PC 지도 미리보기 — 프로토타입 "PC 지도"와 동일하게 실제 지도 연동 전
                단순 플레이스홀더로 표시. 남은 영역을 flex-1로 채우되, 위의
                max-w-[1180px] 제한 덕분에 디자인 시안처럼 오른쪽에 여백이
                남고 정사각형에 가까운 비율로 보입니다. */}
            <div className="flex flex-1 items-center justify-center self-stretch rounded-3xl bg-[#e4e9f4] text-[26px] font-bold text-muted">
              지도 화면
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 하단 탭 */}
      <div className="lg:hidden fixed bottom-0 left-1/2 z-30 w-full max-w-120 -translate-x-1/2">
        <BottomNav />
      </div>
    </div>
  );
}
