"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import Card from "@/components/Card";
import Timeline from "@/components/Timeline";
import Button from "@/components/Button";
import MapArt from "@/components/MapArt";
import { changedSchedule } from "@/lib/mockData";

const markers = [
  { x: 90, y: 150, label: "신주쿠", color: "#2f6fed" },
  { x: 250, y: 100, label: "센소지", color: "#f4a268" },
  { x: 190, y: 230, label: "스카이트리", color: "#24a36a" },
];
const paths = [
  [
    { x: 90, y: 150 },
    { x: 190, y: 230 },
  ],
  [
    { x: 250, y: 100 },
    { x: 190, y: 230 },
  ],
];

function BeforeAfter({ summary, before, after, bannerFontSize = 14 }) {
  return (
    <>
      <div
        style={{
          background: "var(--orange-soft)",
          color: "#f97316",
          fontWeight: 700,
          fontSize: bannerFontSize,
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

export default function AiChangedPage() {
  const { summary, before, after, date, items } = changedSchedule;
  return (
    <>
      {/* ---------- 모바일: 기존 단일 컬럼 ---------- */}
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

      {/* ---------- PC: 좌측 변경 전/후 비교 + 타임라인, 우측 지도 미리보기.
          노트북/컴퓨터 화면을 가정해 1180px로 폭을 가두지 않고, 사이드바를
          제외한 나머지 폭을 그대로 다 씁니다(태블릿처럼 잘려 보이지 않도록). ---------- */}
      <div className="hidden min-w-0 flex-1 flex-col lg:flex">
        <header className="flex shrink-0 items-center gap-3 border-b border-line px-10 py-6">
          <Link href="/ai/chat" className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[#eef2fb]">
            <Icon name="chevronRight" size={18} className="rotate-180" />
          </Link>
          <h1 className="text-[23px] font-bold text-navy-deep">변경된 일정</h1>
        </header>
        <div className="flex flex-1 justify-start bg-[#eef2fb]">
          <div className="flex w-full flex-1">
            <div className="flex w-[480px] shrink-0 flex-col gap-5 px-10 py-8">
              <BeforeAfter summary={summary} before={before} after={after} bannerFontSize={17} />
              <div className="rounded-3xl border border-line bg-white p-6">
                <div style={{ fontWeight: 800, marginBottom: 14 }}>{date}</div>
                <Timeline items={items} />
              </div>
              <Link href="/ai/result">
                <Button variant="primary">변경된 일정 확인하기</Button>
              </Link>
            </div>
            <div className="flex flex-1 py-8 pl-14 pr-12">
              <div className="relative flex-1 overflow-hidden rounded-3xl">
                <MapArt markers={markers} paths={paths} fill />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
