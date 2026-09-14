"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { chatMessages, changedSchedule } from "@/lib/mockData";
import styles from "./page.module.css";

// PC 프로토타입("PC AI와 대화하기")에서 좌측에 보여주는 대화 — 모바일의
// chatMessages(한 문장으로 합쳐진 요청)를 프로토타입처럼 두 줄로 나눠 보여줍니다.
const PC_USER_LINES = ["환승은 스시로 바꾸고", "환승도 최대 1번으로 해줘"];

export default function AiChatPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [pcText, setPcText] = useState("");

  function submit() {
    router.push("/ai/reanalyzing");
  }

  return (
    <>
      {/* ---------- 모바일 ---------- */}
      <div className="screen-scroll no-tab flex flex-col lg:hidden">
        <Header title="AI와 대화하기" backHref="/ai/result" />
        <div className="container">
          <div className="h1">AI에게 원하는 내용을 말해주세요.</div>
          <div className="body-sm" style={{ marginTop: 6, marginBottom: 22 }}>
            현재 일정은 자동으로 유지하면서 수정합니다.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {chatMessages.map((m, i) =>
              m.role === "user" ? (
                <div className={styles.msgUser} key={i}>
                  {m.text}
                </div>
              ) : (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div className={styles.msgAiRow}>
                    <div className={styles.botIcon}>AI</div>
                    <div className={styles.msgAi}>{m.text}</div>
                  </div>

                  {(m.checklist || m.result) && (
                    <Card className={styles.summaryCard}>
                      {m.checklist?.map((c) => (
                        <div className={styles.checkItem} key={c}>
                          <Icon name="check" size={16} strokeWidth={3} /> {c}
                        </div>
                      ))}
                      {m.result && (
                        <div className={styles.resultBox}>
                          <div className={styles.resultLabel}>{m.result.title}</div>
                          <div className={styles.resultDesc}>{m.result.desc}</div>
                          <div className={styles.resultMeta}>{m.result.meta}</div>
                        </div>
                      )}
                    </Card>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        <div className={styles.inputBar}>
          <input
            placeholder="추가로 요청해보세요..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className={styles.sendBtn} onClick={submit} aria-label="전송">
            <Icon name="send" size={16} />
          </button>
        </div>

        <div className="container" style={{ marginTop: 20, paddingBottom: 24 }}>
          <Button variant="primary" onClick={submit}>
            변경사항을 일정에 적용
          </Button>
        </div>
      </div>

      {/* ---------- PC (프로토타입 "PC AI와 대화하기": 좌 대화 / 우 실시간 반영) ----------
          Sidebar와 바깥 pz-shell은 app/ai/layout.js가 이미 감싸고 있으므로,
          여기서는 그 안에 들어갈 헤더 + 2단 콘텐츠만 렌더링합니다
          (Sidebar를 여기서 또 그리면 사이드바가 두 번 나옵니다). */}
      <div className="hidden flex-1 flex-col lg:flex">
        <header className="flex shrink-0 items-center border-b border-line px-10 py-6">
          <h1 className="text-[20px] font-bold text-navy-deep">AI와 대화하기</h1>
        </header>

        <div className="flex flex-1 gap-8 bg-[#eef2fb] px-10 py-8">
          {/* 좌: 대화 */}
          <div className="flex w-[500px] shrink-0 flex-col">
            <h2 className="text-[14px] font-bold text-navy-deep">대화</h2>

            <div className="mt-4 flex flex-1 flex-col gap-3">
              {PC_USER_LINES.map((line) => (
                <div
                  key={line}
                  className="self-end rounded-2xl bg-[#dfe6fb] px-5 py-3.5 text-[14px] font-semibold text-navy-deep"
                >
                  {line}
                </div>
              ))}
              <div className="max-w-[86%] self-start rounded-2xl bg-white px-5 py-4 text-[14px] font-semibold leading-6 text-navy-deep shadow-[0_2px_10px_rgba(30,39,97,0.06)]">
                네! 요청하신 내용으로
                <br />
                일정을 수정하고 있어요
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4">
              <input
                value={pcText}
                onChange={(e) => setPcText(e.target.value)}
                placeholder="메시지를 입력하세요"
                className="w-full bg-transparent text-[14px] text-navy-deep outline-none placeholder:text-muted"
                onKeyDown={(e) => e.key === "Enter" && submit()}
              />
              <button onClick={submit} aria-label="전송" className="shrink-0 text-navy">
                <Icon name="send" size={18} />
              </button>
            </div>
          </div>

          {/* 우: 실시간 반영되는 일정 · 지도 */}
          <div className="flex flex-1 flex-col">
            <h2 className="text-[14px] font-bold text-navy-deep">실시간 반영되는 일정 · 지도</h2>

            <div className="mt-4 flex h-[260px] shrink-0 flex-col items-center justify-center rounded-2xl bg-[#e4e9f4] text-center">
              <p className="text-[15px] font-bold text-navy-deep">지도 화면 · 경로</p>
              <p className="mt-1 text-[13px] text-muted">대화 내용이 즉시 반영됨</p>
            </div>

            <div className="mt-6 flex flex-1 flex-col items-center justify-center rounded-2xl border border-line bg-white text-center">
              <p className="text-[16px] font-extrabold text-navy-deep">변경된 일정 요약</p>
              <p className="mt-2 text-[13px] text-muted">
                {changedSchedule.before.title}: {changedSchedule.before.value} → {changedSchedule.after.value}
                {" / "}
                {changedSchedule.before.metaLabel} {changedSchedule.before.metaValue} → {changedSchedule.after.metaValue}
              </p>
            </div>

            <button
              onClick={submit}
              className="mt-6 flex h-14 w-full shrink-0 items-center justify-center rounded-2xl bg-navy text-[15px] font-bold text-white"
            >
              변경된 일정 확인하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
