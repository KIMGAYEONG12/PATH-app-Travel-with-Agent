"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import Card from "@/components/Card";
import { StepChecklist, ToolBar } from "@/components/Steps";
import { reanalysisSteps } from "@/lib/mockData";

export default function AiReanalyzingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= reanalysisSteps.length) {
      const t = setTimeout(() => router.push("/ai/changed"), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 700);
    return () => clearTimeout(t);
  }, [step, router]);

  return (
    <div className="screen-scroll no-tab flex flex-col lg:flex-1">
      <Header title="AI 재분석 중" backHref="/ai/chat" className="lg:hidden" />
      {/* PC 헤더 — 다른 PC 화면들과 동일한 톤의 상단 바 */}
      <header className="hidden shrink-0 items-center gap-3 border-b border-line px-10 py-6 lg:flex">
        <Link href="/ai/chat" className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[#eef2fb]">
          <Icon name="chevronRight" size={18} className="rotate-180" />
        </Link>
        <h1 className="text-[23px] font-bold text-navy-deep">AI 재분석 중</h1>
      </header>
      <div className="container flex-1 lg:flex lg:items-center lg:justify-center lg:bg-[#eef2fb] lg:px-10">
        <div className="lg:mx-auto lg:w-full lg:max-w-[560px] lg:rounded-3xl lg:border lg:border-line lg:bg-white lg:px-14 lg:py-14">
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20, marginBottom: 14, color: "var(--navy)" }} className="lg:mt-0">
          <Icon name="sparkle" size={34} className="lg:h-10 lg:w-10" />
        </div>
        <div className="h2 lg:text-center lg:text-[24px]" style={{ textAlign: "center" }}>
          변경사항을 반영해서
          <br />
          다시 계산하고 있어요
        </div>
        <div className="body-sm lg:text-[15px]" style={{ textAlign: "center", marginTop: 4, marginBottom: 30 }}>
          잠시만 기다려주세요.
        </div>

        <StepChecklist steps={reanalysisSteps} activeIndex={step} />

        <Card style={{ marginTop: 26 }}>
          <ToolBar />
          <div className="body-sm" style={{ marginTop: 6 }}>
            필요한 정보를 조합해 일정에 반영하고 있어요.
          </div>
        </Card>
        </div>
      </div>
    </div>
  );
}
