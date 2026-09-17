"use client";

import { useState } from "react";
import TabShell from "@/components/TabShell";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import InquiryModal from "@/components/InquiryModal";
import styles from "./page.module.css";

function Switch({ on, onToggle }) {
  return (
    <button
      className={`${styles.switch} ${on ? styles.switchOn : ""}`}
      onClick={onToggle}
      role="switch"
      aria-checked={on}
    >
      <span className={`${styles.knob} ${on ? styles.knobOn : ""}`} />
    </button>
  );
}

function Section({ title, children }) {
  return (
    <div className={styles.group}>
      <div className={styles.groupTitle}>{title}</div>
      <div className={styles.card}>{children}</div>
    </div>
  );
}

// ---------- PC 전용 컴포넌트 ----------
// 모바일 카드를 그대로 늘려 쓰면 넓은 화면에서 여백만 커 보이고 "태블릿"처럼
// 어중간해 보이므로, 데스크톱은 프로필 수정(PC) 화면과 같은 톤(좌측 정렬,
// 한 단계 큰 폰트/여백)의 별도 레이아웃을 씁니다.
function PCSwitch({ on, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      className={`relative h-9 w-[58px] shrink-0 rounded-full transition ${
        on ? "bg-navy" : "bg-[#d9e0f2]"
      }`}
    >
      <span
        className={`absolute top-1 left-1 h-7 w-7 rounded-full bg-white shadow transition ${
          on ? "translate-x-[24px]" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function PCSection({ title, children }) {
  return (
    <div>
      <div className="mb-3.5 text-[17px] font-bold text-muted">{title}</div>
      <div className="rounded-[20px] border border-line bg-white px-9 shadow-[var(--shadow-card)]">
        {children}
      </div>
    </div>
  );
}

function PCRow({ label, labelClassName = "", right, last = false }) {
  return (
    <div
      className={`flex items-center justify-between py-6 text-[18px] font-semibold ${
        last ? "" : "border-b border-line"
      } ${labelClassName}`}
    >
      {label}
      {right}
    </div>
  );
}

export default function SettingsPage() {
  const [push, setPush] = useState(true);
  const [tripAlert, setTripAlert] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <TabShell crumb="MY" title="설정" compactHeader>
      <Header title="설정" backHref="/my" className="lg:hidden" />
      <div className="screen-scroll">
        {/* ---------- 모바일 (<1024px): 기존 목업과 동일한 카드 리스트 ---------- */}
        <div className="container lg:hidden">
          <Section title="알림">
            <div className={styles.row}>
              푸시 알림
              <Switch on={push} onToggle={() => setPush((v) => !v)} />
            </div>
            <div className={styles.row}>
              여행 일정 알림
              <Switch on={tripAlert} onToggle={() => setTripAlert((v) => !v)} />
            </div>
          </Section>

          <Section title="계정">
            <div className={styles.row}>
              언어 설정
              <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>한국어</span>
            </div>
            <div className={styles.row}>
              비밀번호 변경
              <Icon name="chevronRight" size={16} />
            </div>
          </Section>

          <Section title="기타">
            <button
              type="button"
              onClick={() => setInquiryOpen(true)}
              className={styles.row}
              style={{
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                color: "inherit",
                fontFamily: "inherit",
                cursor: "pointer",
              }}
            >
              문의하기
              <Icon name="chevronRight" size={16} />
            </button>
            <div className={styles.row} style={{ color: "var(--red)" }}>
              회원 탈퇴
            </div>
          </Section>
        </div>

        {/* ---------- PC (≥1024px): 좌측 정렬, 한 단계 큰 전용 레이아웃 ----------
            프로토타입에는 "PC 설정" 시안이 따로 없어서, 같은 MY 하위 화면인
            "PC 프로필 수정" 시안의 톤(좌측 정렬 폼, 넉넉한 여백/폰트)에 맞춰
            데스크톱 전용으로 구성했습니다. */}
        <div className="hidden lg:flex lg:w-full lg:max-w-[760px] lg:flex-col lg:gap-10 lg:pb-10">
          <PCSection title="알림">
            <PCRow
              label="푸시 알림"
              right={<PCSwitch on={push} onToggle={() => setPush((v) => !v)} />}
            />
            <PCRow
              label="여행 일정 알림"
              right={<PCSwitch on={tripAlert} onToggle={() => setTripAlert((v) => !v)} />}
              last
            />
          </PCSection>

          <PCSection title="계정">
            <PCRow
              label="언어 설정"
              right={<span className="text-[16px] font-medium text-muted">한국어</span>}
            />
            <PCRow
              label="비밀번호 변경"
              right={<Icon name="chevronRight" size={20} className="text-muted" />}
              last
            />
          </PCSection>

          <PCSection title="기타">
            <button type="button" onClick={() => setInquiryOpen(true)} className="w-full">
              <PCRow
                label="문의하기"
                right={<Icon name="chevronRight" size={20} className="text-muted" />}
              />
            </button>
            <PCRow label="회원 탈퇴" labelClassName="text-red" last />
          </PCSection>
        </div>
      </div>

      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </TabShell>
  );
}
