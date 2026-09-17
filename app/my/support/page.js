"use client";

import { useState } from "react";
import Link from "next/link";
import TabShell from "@/components/TabShell";
import Header from "@/components/Header";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import InquiryModal from "@/components/InquiryModal";

// 자주 묻는 질문 — 질문을 누르면 실제로 펼쳐지며 답변을 보여줍니다.
const FAQS = [
  {
    id: "ai-schedule",
    q: "AI 일정은 어떻게 수정하나요?",
    a: "AI 여행 탭에서 만든 일정은 'AI 대화하기' 화면에서 원하는 부분을 말하듯이 입력하면 다시 짜서 보여드려요. 예를 들어 '2일차 오후를 좀 더 여유롭게 바꿔줘'처럼 요청하면 변경된 일정을 먼저 보여주고, 확인을 누르면 내 여행 일정에 바로 반영돼요.",
  },
  {
    id: "realtime-traffic",
    q: "교통 정보는 실시간인가요?",
    a: "지하철 노선·환승 정보는 도쿄 공공교통 데이터(ODPT)를 바탕으로 제공되고, 도보 이동 시간처럼 일부 정보는 평균 운행 데이터를 참고한 추정치예요. 출발 전에는 역 안내판이나 교통 앱으로 한 번 더 확인하는 걸 추천해요.",
  },
  {
    id: "coverage",
    q: "지원 지역이 궁금해요",
    a: "현재는 도쿄(신주쿠·시부야·아사쿠사·긴자 등 도쿄 23구 위주) 여행을 기준으로 AI 일정 추천과 교통 정보를 제공하고 있어요. 오사카·교토 등 다른 지역은 순차적으로 지원 지역을 넓혀갈 예정이에요.",
  },
];

export default function SupportPage() {
  const [openId, setOpenId] = useState(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <TabShell crumb="MY" title="고객센터" compactHeader>
      <Header title="고객센터" backHref="/my" className="lg:hidden" />
      <div className="screen-scroll">
        {/* ---------- 모바일 (<1024px): 기존 목업과 동일한 카드 리스트 ---------- */}
        <div className="container lg:hidden">
          <div
            className="text-[18px] font-bold text-[var(--text)]"
            style={{ marginBottom: 10 }}
          >
            자주 묻는 질문
          </div>
          <Card padded={false}>
            {FAQS.map((f, i) => {
              const open = openId === f.id;
              return (
                <div
                  key={f.id}
                  style={{
                    borderBottom: i < FAQS.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : f.id)}
                    className="text-[14px] font-semibold"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      padding: "16px 16px",
                      textAlign: "left",
                    }}
                  >
                    {f.q}
                    <Icon
                      name="chevronRight"
                      size={16}
                      className={`shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
                    />
                  </button>
                  {open && (
                    <div
                      className="text-[13px] text-muted"
                      style={{ padding: "0 16px 16px", lineHeight: 1.7 }}
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
              onClick={() => setInquiryOpen(true)}
            >
              1:1 문의하기
            </Button>
          </div>

          <div
            className="text-[13px] lg:text-[13px] text-muted text-center"
            style={{ marginTop: 20, lineHeight: 1.7 }}
          >
            이메일 support@path-travel.com
            <br />
            운영시간 평일 09:00 - 18:00 (점심시간 12:00-13:00)
            <br />
            주말·공휴일 휴무
          </div>
        </div>

        {/* ---------- PC (≥1024px): 좌측 정렬, 넉넉한 폰트/여백의 전용 레이아웃 ----------
            모바일 카드를 그대로 늘려 쓰면 여백만 커 보이므로, 프로필 수정(PC)/설정(PC)
            화면과 같은 톤으로 별도 구성합니다. 자주 묻는 질문은 실제로 클릭하면
            펼쳐지며 답변이 나오고, 1:1 문의하기는 InquiryModal을 실제로 엽니다. */}
        <div className="hidden lg:flex lg:w-full lg:max-w-[820px] lg:flex-col lg:gap-9 lg:pb-10">
          <div>
            <div className="mb-4 text-[20px] font-extrabold text-navy-deep">자주 묻는 질문</div>
            <div className="overflow-hidden rounded-[20px] border border-line bg-white shadow-[var(--shadow-card)]">
              {FAQS.map((f, i) => {
                const open = openId === f.id;
                return (
                  <div key={f.id} className={i < FAQS.length - 1 ? "border-b border-line" : ""}>
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : f.id)}
                      className="flex w-full items-center justify-between gap-4 px-7 py-6 text-left text-[17px] font-bold text-navy-deep transition hover:bg-[#f7f9fd]"
                    >
                      {f.q}
                      <Icon
                        name="chevronRight"
                        size={20}
                        className={`shrink-0 text-muted transition-transform ${
                          open ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    {open && (
                      <div className="px-7 pb-7 text-[15px] leading-7 text-muted">{f.a}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4">
            <Link href="/my/support/tips" className="flex-1">
              <button
                type="button"
                className="flex h-16 w-full items-center justify-center gap-2.5 rounded-2xl border border-line bg-white text-[16px] font-bold text-navy-deep transition hover:bg-[#f5f7fc]"
              >
                <Icon name="sparkle" size={19} />
                일본 여행 팁
              </button>
            </Link>
            <button
              type="button"
              onClick={() => setInquiryOpen(true)}
              className="flex h-16 flex-1 items-center justify-center gap-2.5 rounded-2xl bg-navy text-[16px] font-bold text-white transition hover:opacity-90"
            >
              <Icon name="headset" size={19} />
              1:1 문의하기
            </button>
          </div>

          <div className="rounded-2xl bg-[#eef2fb] px-7 py-6 text-center text-[15px] leading-8 text-muted">
            이메일 <span className="font-bold text-navy-deep">support@path-travel.com</span>
            <br />
            운영시간 평일 09:00 - 18:00 (점심시간 12:00-13:00)
            <br />
            주말·공휴일 휴무
          </div>
        </div>
      </div>

      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </TabShell>
  );
}
