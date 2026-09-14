"use client";

import { useState } from "react";
import Link from "next/link";
import TabShell from "@/components/TabShell";
import Header from "@/components/Header";
import Card from "@/components/Card";
import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import Icon from "@/components/Icon";
import { ChipRow, Chip } from "@/components/Chip";
import { trips, favorites } from "@/lib/mockData";

const FILTERS = ["전체", "예정", "진행중", "완료"];

// 프로토타입("PC 내 여행일정")에서 카드 제목·기간이 목업용 예시 문구로
// 표시되어 있어, 데스크톱 카드에서만 이 문구를 그대로 보여줍니다.
// (모바일 리스트는 lib/mockData의 실제 제목·기간을 계속 사용합니다.)
const PC_TRIP_LABELS = [
  { title: "센소지", range: "2026.04.12 - 04.14" },
  { title: "우에노 공원", range: "2026.05.10 - 05.12" },
  { title: "스카이트리", range: "2026.06.01 - 06.03" },
];

export default function MyTripsPage() {
  const [filter, setFilter] = useState("전체");
  const list = filter === "전체" ? trips : trips.filter((t) => t.status === filter);

  return (
    <TabShell crumb="MY" title="내 여행 일정" compactHeader>
      <Header title="내 여행 일정" backHref="/my" className="lg:hidden" />
      <div className="screen-scroll">
        <div className="container">
          <ChipRow>
            {FILTERS.map((f) => (
              <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
                {f}
              </Chip>
            ))}
          </ChipRow>

          {list.length === 0 ? (
            <EmptyState
              variant="dots"
              title="아직 계획한 여행이 없어요"
              desc="AI에게 말하면 첫 여행 일정을 만들어드려요"
              action={
                <Link href="/ai">
                  <Button
                    variant="primary"
                    style={{ width: "auto", paddingLeft: 30, paddingRight: 30, borderRadius: 999 }}
                  >
                    AI에게 물어보기 →
                  </Button>
                </Link>
              }
            />
          ) : (
            <>
              {/* 모바일: 세로 리스트 */}
              <div className="flex flex-col gap-5 mt-4 lg:hidden">
                {list.map((t) => (
                  <Link href="/ai/result" key={t.id}>
                    <Card
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "26px 22px",
                      }}
                    >
                      <div>
                        <div className="body-sm">{t.range}</div>
                        <div style={{ fontWeight: 800, fontSize: 16, marginTop: 6 }}>{t.title}</div>
                        <span
                          style={{
                            display: "inline-block",
                            marginTop: 16,
                            fontSize: 14,
                            fontWeight: 700,
                            color: "var(--navy)",
                            border: "1.5px solid var(--navy)",
                            borderRadius: 999,
                            padding: "6px 16px",
                          }}
                        >
                          {t.status}
                        </span>
                      </div>
                      <Icon name="chevronRight" size={20} />
                    </Card>
                  </Link>
                ))}
              </div>

              <Link href="/ai" className="lg:hidden">
                <Button variant="primary" style={{ marginTop: 28 }} icon={<Icon name="plus" size={18} />}>
                  새 여행 만들기
                </Button>
              </Link>

              <div className="h2 lg:hidden" style={{ marginTop: 32, marginBottom: 20 }}>
                최근 저장한 장소
              </div>
              <div className="flex flex-col gap-2.5 lg:hidden">
                {favorites.slice(0, 3).map((f) => (
                  <Link href={`/ai/place/${f.id}`} key={f.id}>
                    <Card style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 700 }}>{f.name}</span>
                      <Icon name="chevronRight" size={18} />
                    </Card>
                  </Link>
                ))}
              </div>

              {/* 데스크톱: 표지 사진 + "새 일정 만들기" 카드가 함께 있는 그리드
                  (프로토타입 "PC 내 여행일정") — 4열로 카드를 조금 더 크게 보여줍니다. */}
              <div className="hidden grid-cols-4 gap-6 pb-10 lg:mt-4 lg:grid">
                {list.map((t, i) => (
                  <Link href="/ai/result" key={t.id} className="block">
                    <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t.cover} alt={t.title} className="absolute inset-0 h-full w-full object-cover" />
                    </div>
                    <p className="mt-3 text-[16px] font-extrabold text-navy-deep">
                      {PC_TRIP_LABELS[i]?.title ?? t.title}
                    </p>
                    <p className="mt-0.5 text-[12px] text-muted">
                      {PC_TRIP_LABELS[i]?.range ?? t.range.replace(/\//g, ".")}
                    </p>
                  </Link>
                ))}
                <Link
                  href="/ai"
                  className="flex aspect-[5/4] w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line bg-white text-[13px] font-bold text-muted transition hover:border-navy hover:text-navy"
                >
                  <Icon name="plus" size={20} />새 일정 만들기
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </TabShell>
  );
}
