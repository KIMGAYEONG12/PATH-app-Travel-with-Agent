"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IconHomeFilled, IconMap, IconSparkleDual, IconHeart, IconUser } from "./Icons";

const TABS = [
  { href: "/home", label: "홈", icon: IconHomeFilled, fixed: true },
  { href: "/map", label: "지도", icon: IconMap },
  { href: "/ai", label: "AI 여행", icon: IconSparkleDual, fixed: true },
  { href: "/favorites", label: "찜", icon: IconHeart },
  { href: "/my", label: "MY", icon: IconUser },
];

// MY 탭 아래에서만 펼쳐지는 서브메뉴 — PC 프로토타입과 동일.
const MY_SUBMENU = [
  { href: "/my/trips", label: "내 여행 일정" },
  { href: "/my/profile", label: "프로필 수정" },
  { href: "/my/settings", label: "설정" },
  { href: "/my/support", label: "고객센터" },
  { href: "/onboarding", label: "앱 소개" },
  { href: "/login", label: "로그아웃" },
];

// AI 여행 탭 아래에서 펼쳐지는 서브메뉴. 기존에는 "AI 여행 만들기"로만 진입할 수 있고
// "AI와 대화하기"(app/ai/chat)로 갈 방법이 사이드바에 없었어서, MY와 같은 패턴으로 추가.
const AI_SUBMENU = [
  { href: "/ai", label: "여행 만들기" },
  { href: "/ai/chat", label: "AI와 대화하기" },
];

// 서브메뉴가 있는 탭들 — key는 TABS의 href와 일치해야 함.
const SUBMENUS = {
  "/my": MY_SUBMENU,
  "/ai": AI_SUBMENU,
};

// pathname과 가장 구체적으로(=href가 가장 긴 것으로) 일치하는 서브메뉴 항목을 찾는다.
// 예: "/ai/chat" 은 "/ai"와 "/ai/chat" 둘 다 prefix로 매치되지만, 더 긴 "/ai/chat"이 우선.
function findActiveSub(submenu, pathname) {
  const sorted = [...submenu].sort((a, b) => b.href.length - a.href.length);
  return sorted.find((sub) => pathname === sub.href || pathname.startsWith(sub.href + "/"));
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-line bg-white px-6 py-8">
      <Link href="/home" className="mb-10 block w-28">
        <Image src="/logo/logo-text.svg" alt="PATH" width={270} height={63} className="w-full h-auto" />
      </Link>
      <ul className="flex flex-col gap-1">
        {TABS.map(({ href, label, icon: Icon, fixed }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          const submenu = SUBMENUS[href];
          const inSection = Boolean(submenu) && active;
          // 서브메뉴 중 하나가 활성 상태면, 표시줄은 부모 탭 행이 아니라
          // 그 서브메뉴 행을 따라가야 한다.
          const activeSubHref = inSection ? findActiveSub(submenu, pathname)?.href : undefined;
          // 서브메뉴가 활성화된 상태라면 부모 탭 행 자체에는 표시줄을 그리지 않는다.
          const showIndicator = active && !(submenu && activeSubHref);
          return (
            <li key={href} className="relative">
              {showIndicator && (
                <span className="absolute -left-6 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-navy" />
              )}
              <Link
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold transition ${
                  fixed ? "text-navy" : active ? "text-navy" : "text-muted hover:text-navy"
                }`}
              >
                <Icon className="h-6 w-6" />
                {label}
              </Link>

              {submenu && inSection && (
                <ul className="mt-1 flex flex-col gap-0.5 pl-11">
                  {submenu.map((sub) => {
                    const subActive = sub.href === activeSubHref;
                    return (
                      <li key={sub.href} className="relative">
                        {subActive && (
                          <span className="absolute -left-[68px] top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-navy" />
                        )}
                        <Link
                          href={sub.href}
                          className={`block rounded-lg px-2 py-1.5 text-[16px] transition ${
                            subActive ? "font-bold text-navy-deep" : "text-muted hover:text-navy-deep"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
