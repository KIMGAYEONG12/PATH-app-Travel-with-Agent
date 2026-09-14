"use client";

// 스플래시 화면
// - 화면 크기와 무관하게 항상 "모바일 버전" 그대로 보여줍니다(PC 전용 레이아웃 없음).
//   PC/넓은 브라우저에서는 다른 단순 화면(로그인/온보딩)과 같은 방식으로,
//   480px 폭의 모바일 프레임이 화면 중앙에 그대로 표시됩니다.
//   (app/globals.css의 .app-viewport / .app-screen 공통 규칙을 그대로 사용)
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import styles from "./page.module.css";

export default function SplashPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.scene}>
        <Image
          src="/images/splash-bg.jpg"
          alt="AI와 함께, 일본 여행의 가장 확실한 길"
          fill
          priority
          sizes="480px"
          style={{ objectFit: "cover" }}
        />
        <div className={styles.scrim} />

        <div className={styles.footer}>
          <Link href="/home">
            <Button variant="primary">시작하기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
