"use client";

// 변경된 일정 — PC 전용 화면 (지도를 뺀 버전)
// ------------------------------------------------------------------
// ※ 기존 모바일 화면(app/ai/changed/page.js)은 그대로 두고, 이 파일은
//    "PC 화면은 이런 모양" 을 보여주기 위한 전용 화면입니다.
//    /ai/changed-pc 경로로 접속해서 확인할 수 있습니다.
// ※ 반응형이 아닙니다 — 항상 사이드바 + 본문의 데스크톱 레이아웃으로만
//    렌더링되며, 모바일/태블릿 레이아웃(하단 탭바 등)으로는 바뀌지
//    않습니다.
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Timeline from "@/components/Timeline";
import Button from "@/components/Button";
import {
  IconHomeFilled,
  IconMap,
  IconSparkleDual,
  IconHeart,
  IconUser,
  IconChevronLeft,
} from "@/components/Icons";
import { changedSchedule } from "@/lib/mockData";
import styles from "./page.module.css";

const NAV_ITEMS = [
  { href: "/home", label: "홈", icon: IconHomeFilled, fixed: true },
  { href: "/map", label: "지도", icon: IconMap },
  { href: "/ai", label: "AI 여행", icon: IconSparkleDual, fixed: true, active: true },
  { href: "/favorites", label: "찜", icon: IconHeart },
  { href: "/my", label: "MY", icon: IconUser },
];

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Link href="/home" className={styles.logo}>
        <Image src="/logo/logo-text.svg" alt="PATH" width={270} height={63} style={{ width: "100%", height: "auto" }} />
      </Link>
      <nav className={styles.nav}>
        {NAV_ITEMS.map(({ href, label, icon: Icon, fixed, active }) => {
          const cls = [
            styles.navItem,
            fixed ? styles.navItemFixed : "",
            active ? styles.navItemActive : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <Link href={href} key={href} className={cls} style={{ position: "relative" }}>
              {active && <span className={styles.navIndicator} />}
              <Icon className={styles.navIcon} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

function CompareField({ label, value, spacer = false, after = false }) {
  return (
    <div className={spacer ? styles.fieldValueSpacer : undefined}>
      <div className={`${styles.fieldLabel} ${after ? styles.fieldLabelAfter : ""}`}>{label}</div>
      <div className={styles.fieldValue}>{value}</div>
    </div>
  );
}

export default function AiChangedPcPage() {
  const router = useRouter();
  const { summary, before, after, date, items } = changedSchedule;

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/ai/chat");
  };

  return (
    <div className={styles.page}>
      <Sidebar />

      <div className={styles.main}>
        <div className={styles.topbar}>
          <button onClick={handleBack} aria-label="뒤로가기" className={styles.backBtn}>
            <IconChevronLeft className={styles.backIcon} />
          </button>
          <h1 className={styles.title}>변경된 일정</h1>
        </div>

        <div className={styles.body}>
          <div className={styles.content}>
            <div className={styles.banner}>{summary}</div>

            <div className={styles.compareRow}>
              <div className={styles.compareCol}>
                <div className={styles.compareLabel}>변경 전</div>
                <Card className={styles.compareCard}>
                  <CompareField label={before.title} value={before.value} />
                  <CompareField label={before.metaLabel} value={before.metaValue} spacer />
                </Card>
              </div>
              <div className={styles.compareCol}>
                <div className={`${styles.compareLabel} ${styles.compareLabelAfter}`}>변경 후</div>
                <Card className={`${styles.compareCard} ${styles.compareCardAfter}`}>
                  <CompareField label={after.title} value={after.value} after />
                  <CompareField label={after.metaLabel} value={after.metaValue} spacer after />
                </Card>
              </div>
            </div>

            <Card className={styles.dateCard}>
              <div className={styles.dateLabel}>{date}</div>
              <Timeline items={items} />
            </Card>

            <Link href="/ai/result">
              <Button variant="primary" className={styles.confirmBtn}>
                변경된 일정 확인하기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
