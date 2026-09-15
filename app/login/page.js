"use client";

// 로그인 / 회원가입 화면
// -------------------------------------------------------------------
// 디자인 시안(로그인.png / 회원가입.png)의 "세로형 중앙 카드" 레이아웃 하나를
// 모바일과 PC가 함께 씁니다. 좌우 분할(2단) 레이아웃은 쓰지 않습니다.
//
// - 모바일(<1024px): 기존 480px 세로형 레이아웃 그대로. 변경 없음.
// - PC(≥1024px): 같은 구성을 PC 화면에 맞게 키운 버전.
//     · 배경은 앱의 다른 PC 화면들과 같은 톤(단색 #eef2fb)을 그대로 씁니다.
//       화면 전체를 채우는 그라디언트 블롭 + 좌상단 워드마크를 넣어봤더니
//       카드 하나만 있는 화면에 장식이 붙어 오히려 어색하고 산만해 보여서,
//       카드가 화면 중앙에 차분하게 떠 있는 단순한 구성으로 되돌렸습니다.
//     · 카드 폭 640px, 흰 배경 + 라운드 + 그림자로 한 덩어리처럼 보이게 처리
//       (태블릿처럼 어중간해 보이지 않도록 로고/제목/입력창/버튼을 PC
//       기준으로 한 단계씩 더 크게)
//
// 마크업은 한 벌만 두고 Tailwind의 `lg:` 반응형 클래스로만 커지기 때문에
// 탭 전환·입력·로그인 동작은 모바일과 PC가 완전히 동일합니다.
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setLoggedIn } from "@/components/AuthGuard";

// 입력창: 모바일 h-14/15px → PC h-[58px]/16px
const INPUT_CLS =
  "h-14 rounded-2xl border border-line bg-white px-5 text-[15px] outline-none transition focus:border-navy lg:h-[60px] lg:px-7 lg:text-[17px]";

function AuthPanel({ tab, setTab, onAuth }) {
  return (
    <>
      {/* 로그인 / 회원가입 탭 */}
      <div className="mt-8 grid grid-cols-2 gap-0 rounded-full bg-[#eef2fb] p-1 lg:mt-8 lg:bg-[#f1f4fc]">
        <button
          type="button"
          onClick={() => setTab("login")}
          className={`h-12 rounded-full text-[15px] font-bold transition lg:h-[54px] lg:text-[17px] ${
            tab === "login" ? "bg-navy text-white" : "bg-transparent text-navy-deep/60"
          }`}
        >
          로그인
        </button>
        <button
          type="button"
          onClick={() => setTab("signup")}
          className={`h-12 rounded-full text-[15px] font-bold transition lg:h-[54px] lg:text-[17px] ${
            tab === "signup" ? "bg-navy text-white" : "bg-transparent text-navy-deep/60"
          }`}
        >
          회원가입
        </button>
      </div>

      <form
        className="mt-6 flex flex-col gap-3 lg:mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          onAuth();
        }}
      >
        {tab === "signup" && (
          <input type="text" placeholder="이름" autoComplete="name" className={INPUT_CLS} />
        )}
        <input type="email" placeholder="이메일" autoComplete="email" className={INPUT_CLS} />
        <input
          type="password"
          placeholder="비밀번호"
          autoComplete={tab === "login" ? "current-password" : "new-password"}
          className={INPUT_CLS}
        />

        <label className="mt-1 flex cursor-pointer items-center gap-2 text-[13px] text-navy-deep/80 lg:text-[15px]">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy text-white lg:h-[23px] lg:w-[23px]">
            ✓
          </span>
          {tab === "login" ? "로그인 상태 유지" : "이용약관에 동의합니다"}
        </label>

        <button
          type="submit"
          className="mt-3 flex h-14 w-full items-center justify-center rounded-2xl bg-navy text-[16px] font-bold text-white transition hover:bg-navy-deep lg:mt-4 lg:h-[60px] lg:text-[18px]"
        >
          {tab === "login" ? "로그인" : "가입하기"}
        </button>
      </form>

      <div className="my-7 flex items-center gap-3 text-[13px] text-muted lg:my-7 lg:text-[15px]">
        <span className="h-px flex-1 bg-line" />
        또는
        <span className="h-px flex-1 bg-line" />
      </div>

      {/* 모바일에서만 하단 여백(pb-16). PC에서는 카드 안쪽 여백을 쓰므로 제거 */}
      <div className="pb-16 lg:pb-0">
        <div className="flex justify-center gap-4">
          <button
            type="button"
            aria-label="구글로 계속하기"
            className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-white text-[18px] font-bold text-[#4285F4] transition hover:shadow-md lg:h-[62px] lg:w-[62px] lg:text-[20px]"
          >
            G
          </button>
          <button
            type="button"
            aria-label="카카오로 계속하기"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE500] text-[18px] transition hover:shadow-md lg:h-[62px] lg:w-[62px] lg:text-[20px]"
          >
            💬
          </button>
        </div>

        {tab === "login" && (
          <p className="mt-6 text-center text-[13px] text-muted lg:mt-7 lg:text-[15px]">
            아이디 찾기 · 비밀번호 찾기
          </p>
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
      {/* 바깥 래퍼
          - 모바일: 기존 그대로 480px 세로형 (위에서부터 pt-16)
          - PC: 화면 전체(단색 배경)를 쓰면서 카드를 세로 정중앙에 배치 */}
      <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-[#f7f9fd] px-7 pt-16 lg:max-w-none lg:items-center lg:justify-center lg:bg-[#eef2fb] lg:px-6 lg:py-16">
        {/* 카드
            - 모바일: 카드 테두리 없이 화면에 그대로 (기존 모양 유지)
            - PC: 시안(로그인.png/회원가입.png)과 같은 배경 없는 흰 카드를,
              태블릿처럼 어중간하지 않도록 640px 폭 + 넉넉한 여백으로 키운 버전 */}
        <div className="flex w-full flex-col lg:max-w-[640px] lg:rounded-[32px] lg:border lg:border-line lg:bg-white lg:px-16 lg:py-14 lg:shadow-[0_24px_60px_rgba(30,39,97,0.12)]">
          <div className="flex flex-col items-center">
            <Image
              src="/logo/logo-mark.svg"
              alt="PATH"
              width={227}
              height={258}
              priority
              className="h-20 w-auto lg:h-28"
            />
            <h2 className="mt-5 text-[17px] font-extrabold text-navy-deep lg:mt-7 lg:text-[26px]">
              AI와 함께, 일본 여행의 가장 확실한 길
            </h2>
            <p className="mt-1 text-[13px] text-muted lg:mt-2 lg:text-[17px]">
              여행 계획부터 이동경로까지 한 번에
            </p>
          </div>

          <AuthPanel tab={tab} setTab={setTab} onAuth={handleAuth} />
        </div>
      </div>
    </div>
  );
}
