"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Card from "@/components/Card";
import Timeline from "@/components/Timeline";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { changedSchedule } from "@/lib/mockData";

function BeforeAfter({ summary, before, after }) {
  return (
    <>
      <div
        style={{
          background: "var(--orange-soft)",
          color: "#f97316",
          fontWeight: 700,
          fontSize: 14,
          padding: "18px 16px",
          borderRadius: 14,
          marginBottom: 18,
          textAlign: "center",
        }}
      >
        {summary}
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 8 }}>변경 전</div>
          <Card>
            <div className="body-sm">{before.title}</div>
            <div style={{ fontWeight: 800, fontSize: 15, marginTop: 2 }}>{before.value}</div>
            <div className="body-sm" style={{ marginTop: 14 }}>{before.metaLabel}</div>
            <div style={{ fontWeight: 800, fontSize: 15, marginTop: 2 }}>{before.metaValue}</div>
          </Card>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 8, color: "#f97316" }}>변경 후</div>
          <Card style={{ border: "1.5px solid var(--orange)" }}>
            <div className="body-sm" style={{ color: "#f97316" }}>{after.title}</div>
            <div style={{ fontWeight: 800, fontSize: 15, marginTop: 2, color: "var(--navy)" }}>{after.value}</div>
            <div className="body-sm" style={{ marginTop: 14, color: "#f97316" }}>{after.metaLabel}</div>
            <div style={{ fontWeight: 800, fontSize: 15, marginTop: 2, color: "var(--navy)" }}>{after.metaValue}</div>
          </Card>
        </div>
      </div>
    </>
  );
}

// PC 전용 "변경 전 / 변경 후" 비교 필드 — Tailwind 클래스만 사용해서
// components/Card.js 의 기본 padding(18px)을 그대로 활용합니다.
function CompareField({ label, value, after = false, spacer = false }) {
  return (
    <div className={spacer ? "mt-4" : undefined}>
      <div className={`text-[13px] ${after ? "text-[#f97316]" : "text-muted"}`}>{label}</div>
      <div className="mt-0.5 text-[16px] font-extrabold text-navy-deep">{value}</div>
    </div>
  );
}

export default function AiChangedPage() {
  const { summary, before, after, date, items } = changedSchedule;

  return (
    <>
      {/* ---------- 모바일 ---------- */}
      <div className="screen-scroll no-tab flex flex-col lg:hidden">
        <Header title="변경된 일정" backHref="/ai/chat" />
        <div className="container">
          <BeforeAfter summary={summary} before={before} after={after} />
          <Card>
            <div style={{ fontWeight: 800, marginBottom: 14 }}>{date}</div>
            <Timeline items={items} />
          </Card>
          <Link href="/ai/result">
            <Button variant="primary" style={{ marginTop: 20 }}>
              변경된 일정 확인하기
            </Button>
          </Link>
        </div>
      </div>

      {/* ---------- PC ----------
          Sidebar와 바깥 pz-shell은 app/ai/layout.js가 이미 감싸고 있으므로,
          여기서는 그 안에 들어갈 헤더 + 본문만 렌더링합니다
          (Sidebar를 여기서 또 그리면 사이드바가 두 번 나옵니다).
          ai/result, ai/chat과 같은 톤으로 실제 컴퓨터 화면처럼 사이드바
          옆 전체 폭을 사용하고, 모바일/태블릿 레이아웃(하단 탭바 등)으로는
          바뀌지 않습니다. */}
      <div className="hidden flex-1 flex-col lg:flex">
        <header className="flex shrink-0 items-center gap-3 border-b border-line px-10 py-6">
          <Link
            href="/ai/chat"
            aria-label="뒤로가기"
            className="flex h-9 w-9 items-center justify-center rounded-full text-navy-deep hover:bg-navy/5"
          >
            <Icon name="chevronLeft" size={22} />
          </Link>
          <h1 className="text-[22px] font-bold text-navy-deep">변경된 일정</h1>
        </header>

        <div className="flex flex-1 justify-center bg-[#eef2fb] px-10 py-8">
          <div className="w-full max-w-[640px]">
            <div className="mb-6 rounded-2xl bg-[var(--orange-soft)] px-5 py-[18px] text-center text-[15px] font-bold text-[#f97316]">
              {summary}
            </div>

            <div className="mb-7 flex gap-4">
              <div className="flex-1">
                <div className="mb-2.5 text-[14px] font-extrabold text-navy-deep">변경 전</div>
                <Card>
                  <CompareField label={before.title} value={before.value} />
                  <CompareField label={before.metaLabel} value={before.metaValue} spacer />
                </Card>
              </div>
              <div className="flex-1">
                <div className="mb-2.5 text-[14px] font-extrabold text-[#f97316]">변경 후</div>
                <Card className="!border-[1.5px] !border-[var(--orange)]">
                  <CompareField label={after.title} value={after.value} after />
                  <CompareField label={after.metaLabel} value={after.metaValue} spacer after />
                </Card>
              </div>
            </div>

            <Card>
              <div className="mb-4 text-[15px] font-extrabold text-navy-deep">{date}</div>
              <Timeline items={items} />
            </Card>

            <Link href="/ai/result">
              <button className="mt-6 flex h-14 w-full items-center justify-center rounded-2xl bg-navy text-[15px] font-bold text-white transition hover:opacity-90">
                변경된 일정 확인하기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
