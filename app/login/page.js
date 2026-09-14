"use client";

// 로그인 화면. 디자인 시안(로그인.png)과 동일하게 모바일/PC 모두
// 480px 세로형 카드 레이아웃 하나만 사용합니다. (splash, onboarding과 동일한 방식)
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setLoggedIn } from "@/components/AuthGuard";

function LoginForm({ tab, setTab, onAuth, size = "base" }) {
  const big = size === "lg";
  return (
    <>
      <div className={`grid grid-cols-2 gap-0 rounded-full bg-[#eef2fb] p-1 ${big ? "mt-10" : "mt-8"}`}>
        <button
          onClick={() => setTab("login")}
          className={`h-12 rounded-full text-[15px] font-bold transition ${
            tab === "login" ? "bg-navy text-white" : "bg-transparent text-navy-deep/60"
          }`}
        >
          로그인
        </button>
        <button
          onClick={() => setTab("signup")}
          className={`h-12 rounded-full text-[15px] font-bold transition ${
            tab === "signup" ? "bg-navy text-white" : "bg-transparent text-navy-deep/60"
          }`}
        >
          회원가입
        </button>
      </div>

      <form
        className="mt-6 flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          onAuth();
        }}
      >
        {tab === "signup" && (
          <input
            type="text"
            placeholder="이름"
            className="h-14 rounded-2xl border border-line bg-white px-5 text-[15px] outline-none focus:border-navy"
          />
        )}
        <input
          type="email"
          placeholder="이메일"
          className="h-14 rounded-2xl border border-line bg-white px-5 text-[15px] outline-none focus:border-navy"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="h-14 rounded-2xl border border-line bg-white px-5 text-[15px] outline-none focus:border-navy"
        />

        <label className="mt-1 flex items-center gap-2 text-[13px] text-navy-deep/80">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy text-white">
            ✓
          </span>
          {tab === "login" ? "로그인 상태 유지" : "이용약관에 동의합니다"}
        </label>

        <button
          type="submit"
          className="mt-3 flex h-14 w-full items-center justify-center rounded-2xl bg-navy text-[16px] font-bold text-white"
        >
          {tab === "login" ? "로그인" : "가입하기"}
        </button>
      </form>

      <div className="my-7 flex items-center gap-3 text-[13px] text-muted">
        <span className="h-px flex-1 bg-line" />
        또는
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className={`${big ? "" : "pb-16"}`}>
        <div className="flex justify-center gap-4">
          <button className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-white text-[18px] font-bold text-[#4285F4]">
            G
          </button>
          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE500] text-[18px]">
            💬
          </button>
        </div>

        {tab === "login" && (
          <p className="mt-6 text-center text-[13px] text-muted">아이디 찾기 · 비밀번호 찾기</p>
        )}
      </div>
    </>
  );
}

export default function LoginPage() {
  const [tab, setTab] = useState("login"); // login | signup
  const router = useRouter();

  function handleAuth() {
    setLoggedIn(true);
    let next = "/home";
    try {
      const q = new URLSearchParams(window.location.search).get("next");
      if (q && q.startsWith("/")) next = q;
    } catch {}
    router.replace(next);
  }

  return (
    <div className="pz-fullbleed">
      {/* 모바일/PC 공통: 세로형 카드 레이아웃 (디자인 시안과 동일) */}
      <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-[#f7f9fd] px-7 pt-16">
        <div className="flex flex-col items-center">
          <Image src="/logo/logo-mark.svg" alt="PATH" width={227} height={258} className="h-20 w-auto" />
          <h2 className="mt-5 text-[17px] font-extrabold text-navy-deep">
            AI와 함께, 일본 여행의 가장 확실한 길
          </h2>
          <p className="mt-1 text-[13px] text-muted">여행 계획부터 이동경로까지 한 번에</p>
        </div>
        <LoginForm tab={tab} setTab={setTab} onAuth={handleAuth} />
      </div>
    </div>
  );
}
