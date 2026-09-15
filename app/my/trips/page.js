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
            // 데스크톱에서도 사진 그리드가 아니라 모바일과 같은 세로 리스트를
            // 그대로 보여줍니다(사이드바만 PC, 본문은 모바일 버전). 대신 화면이
            // 넓은 만큼 글씨는 모바일보다 한 단계씩 더 크게 표시합니다.
            <div className="mx-auto w-full lg:max-w-[640px]">
              <div className="flex flex-col gap-5 mt-4">
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
                        <div className="body-sm" style={{ fontSize: 14 }}>{t.range}</div>
                        <div style={{ fontWeight: 800, fontSize: 18, marginTop: 6 }}>{t.title}</div>
                        <span
                          style={{
                            display: "inline-block",
                            marginTop: 16,
                            fontSize: 15,
                            fontWeight: 700,
                            color: "var(--navy)",
                            border: "1.5px solid var(--navy)",
                            borderRadius: 999,
                            padding: "7px 18px",
                          }}
                        >
                          {t.status}
                        </span>
                      </div>
                      <Icon name="chevronRight" size={22} />
                    </Card>
                  </Link>
                ))}
              </div>

              <Link href="/ai">
                <Button variant="primary" style={{ marginTop: 28, fontSize: 17 }} icon={<Icon name="plus" size={18} />}>
                  새 여행 만들기
                </Button>
              </Link>

              <div className="h2" style={{ marginTop: 32, marginBottom: 20, fontSize: 19 }}>
                최근 저장한 장소
              </div>
              <div className="flex flex-col gap-2.5 pb-10">
                {favorites.slice(0, 3).map((f) => (
                  <Link href={`/ai/place/${f.id}`} key={f.id}>
                    <Card style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 700, fontSize: 17 }}>{f.name}</span>
                      <Icon name="chevronRight" size={18} />
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </TabShell>
  );
}
