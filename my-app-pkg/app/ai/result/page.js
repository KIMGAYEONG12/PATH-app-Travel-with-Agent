"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Timeline from "@/components/Timeline";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { itineraryDays } from "@/lib/mockData";
import styles from "./page.module.css";

export default function AiResultPage() {
  const [dayIdx, setDayIdx] = useState(0);
  const day = itineraryDays[dayIdx];

  return (
    <>
      {/* ---------- 모바일 ---------- */}
      <div className="screen-scroll no-tab lg:hidden">
        <Header title="추천 여행 일정" backHref="/ai" />
        <div className="container">
          <div className={styles.dayTabs}>
            {itineraryDays.map((d, i) => (
              <button
                key={d.id}
                className={`${styles.dayTab} ${i === dayIdx ? styles.dayTabActive : ""}`}
                onClick={() => setDayIdx(i)}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className={styles.dateRow}>{day.date}</div>
          <div className="body-sm" style={{ marginTop: 4, marginBottom: 28 }}>
            {day.condition}
          </div>

          <Timeline items={day.items} />

          <Link href="/ai/route">
            <Button variant="secondary" style={{ marginTop: 24 }} icon={<Icon name="sparkle" size={17} />}>
              지도에서 전체 경로 보기
            </Button>
          </Link>
        </div>

        <div className={styles.footer}>
          <Link href="/ai/chat" style={{ flex: 1 }}>
            <Button variant="primary">AI와 대화하기</Button>
          </Link>
          <Link href="/ai/added" style={{ flex: 1 }}>
            <Button variant="primary">일정 추가</Button>
          </Link>
        </div>
      </div>

      {/* ---------- PC (좌: 일차별 일정 타임라인 / 우: 전체 경로 미리보기) ----------
          Sidebar와 바깥 pz-shell은 app/ai/layout.js가 이미 감싸고 있으므로,
          여기서는 그 안에 들어갈 헤더 + 2단 콘텐츠만 렌더링합니다. */}
      <div className="hidden flex-1 flex-col lg:flex">
        <header className="flex shrink-0 items-center gap-3 border-b border-line px-10 py-6">
          <Link
            href="/ai"
            aria-label="뒤로가기"
            className="flex h-9 w-9 items-center justify-center rounded-full text-navy-deep hover:bg-navy/5"
          >
            <Icon name="chevronLeft" size={22} />
          </Link>
          <h1 className="text-[23px] font-bold text-navy-deep">추천 여행 일정</h1>
        </header>

        <div className="flex flex-1 gap-8 bg-[#eef2fb] px-10 py-8">
          {/* 좌: 일차 탭 + 타임라인 */}
          <div className="flex w-[560px] shrink-0 flex-col">
            <div className="flex gap-2">
              {itineraryDays.map((d, i) => (
                <button
                  key={d.id}
                  onClick={() => setDayIdx(i)}
                  className={`flex-1 rounded-full border px-4 py-3 text-[14.5px] font-bold transition ${
                    i === dayIdx
                      ? "border-navy bg-navy text-white"
                      : "border-line bg-white text-navy-deep/70"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <h2 className="mt-6 text-[22px] font-extrabold text-navy-deep">{day.date}</h2>
            <p className="mt-1 text-[14px] text-muted">{day.condition}</p>

            <div className="mt-5 flex-1 overflow-y-auto rounded-2xl border border-line bg-white p-6">
              <Timeline items={day.items} />
            </div>

            <div className="mt-6 flex gap-3">
              <Link href="/ai/chat" className="flex-1">
                <button className="flex h-14 w-full items-center justify-center rounded-2xl bg-navy text-[15px] font-bold text-white">
                  AI와 대화하기
                </button>
              </Link>
              <Link href="/ai/added" className="flex-1">
                <button className="flex h-14 w-full items-center justify-center rounded-2xl bg-navy text-[15px] font-bold text-white">
                  일정 추가
                </button>
              </Link>
            </div>
          </div>

          {/* 우: 전체 경로 미리보기 */}
          <div className="flex flex-1 flex-col">
            <h2 className="text-[19px] font-bold text-navy-deep">지도에서 전체 경로 보기</h2>
            <Link
              href="/ai/route"
              className="mt-3 flex flex-1 flex-col items-center justify-center gap-2 rounded-3xl bg-[#e4e9f4] text-center transition hover:bg-[#dbe2f4]"
            >
              <Icon name="sparkle" size={28} className="text-navy-deep/60" />
              <p className="text-[18px] font-bold text-muted">지도 · 전체 경로 미리보기</p>
              <p className="text-[13px] text-muted">{day.label} 이동 경로를 지도에서 확인해보세요</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
