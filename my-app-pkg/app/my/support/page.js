"use client";

import { useState } from "react";
import Link from "next/link";
import TabShell from "@/components/TabShell";
import Header from "@/components/Header";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import InquiryModal from "@/components/InquiryModal";

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
          버튼 배치·글자 크기를 확실히 크게 다시 잡은 별도 레이아웃입니다. */}
      <div className="hidden lg:block lg:w-[820px] lg:pb-10">
        <div className="text-[22px] font-bold text-navy-deep" style={{ marginBottom: 16 }}>
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
                  className="flex w-full items-center justify-between px-7 py-6 text-left text-[17px] font-semibold text-navy-deep transition-colors hover:bg-[#f6f8fd]"
                >
                  {f.q}
                  <Icon
                    name="chevronRight"
                    size={20}
                    className={`shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
                  />
                </button>
                {open && (
                  <div className="px-7 pb-6 text-[15px] leading-8 text-muted">{f.a}</div>
                )}
              </div>
            );
          })}
        </Card>

        <div className="mt-7 flex gap-4">
          <Link href="/my/support/tips" className="flex-1">
            <Button variant="secondary" className="text-[16px]" icon={<Icon name="sparkle" size={18} />}>
              일본 여행 팁
            </Button>
          </Link>
          <Button
            variant="primary"
            className="flex-1 text-[16px]"
            icon={<Icon name="headset" size={18} />}
            onClick={() => setShowContact(true)}
          >
            1:1 문의하기
          </Button>
        </div>

        <div className="mt-7 text-center text-[15px] leading-8 text-muted">
          이메일 support@path-travel.com
          <br />
          운영시간 평일 09:00 - 18:00 (점심시간 12:00-13:00)
          <br />
          주말·공휴일 휴무
        </div>
      </div>

      <InquiryModal open={showContact} onClose={() => setShowContact(false)} />
    </TabShell>
  );
}
