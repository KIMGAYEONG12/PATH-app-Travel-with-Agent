"use client";

// 스플래시(메인) 화면 — PC 버전 UI 시안
// -------------------------------------------------------------------
// ※ 기존 모바일 스플래시(app/splash/page.js)는 손대지 않았습니다.
//    이 파일은 "PC 버전은 이런 모양" 을 확인하기 위한 UI 전용 화면이며
//    /splash-pc 경로로 따로 접속해서 볼 수 있습니다.
//    (앱 진입 시작점은 여전히 app/page.js → /splash 입니다.)
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function SplashPcPage() {
  return (
    <div className={`pz-fullbleed ${styles.wrap}`}>
      <Image
        src="/images/splash-scene-pc.jpg"
        alt="일본 여행 풍경"
        fill
        priority
        sizes="100vw"
        className={styles.bg}
      />
      <div className={styles.scrim} />

      <div className={styles.content}>
        <Image
          src="/images/logo-stacked.svg"
          alt="PATH"
          width={480}
          height={520}
          priority
          className={styles.logo}
        />
        <p className={styles.tagline}>AI Travel Planner for Japan</p>

        <h1 className={styles.headline}>
          AI와 함께,
          <br />
          일본 여행의 가장 확실한 길
        </h1>
        <p className={styles.sub}>당신의 여행이 더 쉽고, 더 특별해지도록</p>

        <Link href="/login" className={styles.cta} style={{ display: "inline-block" }}>
          시작하기
        </Link>
      </div>
    </div>
  );
}
