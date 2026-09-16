"use client";

import { useState } from "react";
import Link from "next/link";
import TabShell from "@/components/TabShell";
import Header from "@/components/Header";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

// 자주 묻는 질문 + 답변. 클릭하면 아코디언으로 펼쳐집니다.
const FAQS = [
  {
    q: "AI 일정은 어떻게 수정하나요?",
    a: "AI 여행 탭에서 진행 중인 대화를 열고 원하는 내용을 문장으로 말하면 돼요. 예를 들어 \"둘째 날 점심을 스시로 바꿔줘\"처럼 말하면 AI가 그 부분만 반영해서 일정을 다시 짜드려요. 완성된 일정은 내 여행 일정 화면에서 바로 확인할 수 있어요.",
  },
  {
    q: "교통 정보는 실시간인가요?",
    a: "노선·환승 정보는 공공 교통 데이터를 기반으로 주기적으로 갱신돼요. 다만 지연이나 운행 중단 같은 돌발 상황은 반영까지 시간이 걸릴 수 있어서, 급한 이동 전에는 역 안내판이나 운영사 공지도 함께 확인하시는 걸 추천해요.",
  },
  {
    q: "지원 지역이 궁금해요",
    a: "현재는 도쿄 도심(신주쿠·시부야·아사쿠사·우에노 등)을 중심으로 지원하고 있어요. 다른 지역은 순차적으로 넓혀갈 예정이라, 앱 소개나 공지사항에서 업데이트 소식을 안내해드릴게요.",
  },
];

export default function SupportPage() {
  const [openIdx, setOpenIdx] = useState(null);
  const [showContact, setShowContact] = useState(false);

  return (
    <TabShell crumb="MY" title="고객센터" compactHeader>
      <Header title="고객센터" backHref="/my" className="lg:hidden" />

      {/* ---------- 모바일 ---------- */}
      <div className="screen-scroll lg:hidden">
        <div className="container">
          <div
            className="text-[18px] font-bold text-[var(--text)]"
            style={{ marginBottom: 10 }}
          >
            자주 묻는 질문
          </div>
          <Card padded={false}>
            {FAQS.map((f, i) => {
              const open = openIdx === i;
              return (
                <div
                  key={f.q}
                  style={{
                    borderBottom: i < FAQS.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="text-[14px] font-semibold"
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px 16px",
                      textAlign: "left",
                    }}
                  >
                    {f.q}
                    <Icon
                      name="chevronRight"
                      size={16}
                      className={`transition-transform ${open ? "rotate-90" : ""}`}
                    />
                  </button>
                  {open && (
                    <div
                      className="text-[13px]"
                      style={{ padding: "0 16px 16px", color: "var(--text-muted)", lineHeight: 1.6 }}
                    >
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </Card>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 26 }}>
            <Link href="/my/support/tips">
              <Button variant="secondary" icon={<Icon name="sparkle" size={17} />}>
                일본 여행 팁
              </Button>
            </Link>
            <Button
              variant="primary"
              icon={<Icon name="headset" size={17} />}
              onClick={() => setShowContact(true)}
            >
              1:1 문의하기
            </Button>
          </div>

          <div
            className="text-[13px] text-muted text-center"
            style={{ marginTop: 20, lineHeight: 1.7 }}
          >
            이메일 support@path-travel.com
            <br />
            운영시간 평일 09:00 - 18:00 (점심시간 12:00-13:00)
            <br />
            주말·공휴일 휴무
          </div>
        </div>
      </div>

      {/* ---------- PC (프로토타입 "PC 고객센터") ----------
          모바일 카드를 그대로 늘린 게 아니라, 데스크톱 화면에 맞춰 카드 폭·
          버튼 배치·글자 크기를 다시 잡은 별도 레이아웃입니다. */}
      <div className="hidden lg:block lg:w-[640px] lg:pb-10">
        <div className="text-[19px] font-bold text-navy-deep" style={{ marginBottom: 14 }}>
          자주 묻는 질문
        </div>
        <Card padded={false}>
          {FAQS.map((f, i) => {
            const open = openIdx === i;
            return (
              <div
                key={f.q}
                style={{
                  borderBottom: i < FAQS.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <button
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left text-[15px] font-semibold text-navy-deep transition-colors hover:bg-[#f6f8fd]"
                >
                  {f.q}
                  <Icon
                    name="chevronRight"
                    size={18}
                    className={`transition-transform ${open ? "rotate-90" : ""}`}
                  />
                </button>
                {open && (
                  <div className="px-6 pb-5 text-[14px] leading-7 text-muted">{f.a}</div>
                )}
              </div>
            );
          })}
        </Card>

        <div className="mt-6 flex gap-3">
          <Link href="/my/support/tips" className="flex-1">
            <Button variant="secondary" icon={<Icon name="sparkle" size={17} />}>
              일본 여행 팁
            </Button>
          </Link>
          <Button
            variant="primary"
            className="flex-1"
            icon={<Icon name="headset" size={17} />}
            onClick={() => setShowContact(true)}
          >
            1:1 문의하기
          </Button>
        </div>

        <div className="mt-6 text-center text-[14px] leading-7 text-muted">
          이메일 support@path-travel.com
          <br />
          운영시간 평일 09:00 - 18:00 (점심시간 12:00-13:00)
          <br />
          주말·공휴일 휴무
        </div>
      </div>

      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </TabShell>
  );
}

function ContactModal({ onClose }) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;
    // 백엔드 연동 전이라 실제 접수 대신, 입력한 문의가 정상적으로
    // 제출됐다는 걸 확인할 수 있도록 완료 화면을 보여줍니다.
    setSent(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {sent ? (
          <div className="flex flex-col items-center py-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#dfe6fb] text-navy">
              <Icon name="check" size={26} />
            </div>
            <p className="mt-4 text-[16px] font-bold text-navy-deep">문의가 접수됐어요</p>
            <p className="mt-2 text-[13px] leading-6 text-muted">
              영업일 기준 24시간 이내에
              <br />
              support@path-travel.com으로 답변드릴게요.
            </p>
            <Button variant="primary" className="mt-6" onClick={onClose}>
              확인
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
              <p className="text-[16px] font-bold text-navy-deep">1:1 문의하기</p>
              <button
                type="button"
                onClick={onClose}
                aria-label="닫기"
                className="text-[20px] leading-none text-muted"
              >
                ×
              </button>
            </div>
            <p className="mt-2 text-[13px] text-muted">
              궁금한 점을 남겨주시면 이메일로 답변드려요.
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="문의 내용을 입력해주세요"
              rows={5}
              required
              className="mt-4 w-full resize-none rounded-2xl border border-line bg-white p-4 text-[14px] text-navy-deep outline-none focus:border-navy"
            />
            <Button variant="primary" className="mt-4" type="submit">
              보내기
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
