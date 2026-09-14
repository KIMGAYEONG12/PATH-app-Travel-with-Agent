"use client";

// 스플래시 화면
// - 모바일(<1024px): 기존 path-app 풀스크린 배경 이미지(splash-bg.jpg) + 버튼.
// - PC(>=1024px): 좌측 브랜드 패널(로고/카피/CTA) + 우측 풍경 사진의 2단 레이아웃.
//   height: 100dvh + overflow: hidden 을 명시해 "브라우저 화면 한 번에" 전부
//   보이도록 하고, 절대 스크롤이 생기지 않게 고정했습니다(page.module.css 참고).
//   모바일 <-> PC 전환은 Tailwind lg: 유틸리티가 아니라 CSS 모듈의 순수
//   @media (min-width: 1024px) 쿼리로 처리해 항상 동일하게 동작합니다.
// - "서비스 소개(온보딩 1/2/3)" 화면은 이 스플래시에 포함하지 않으며,
//   버튼은 항상 곧바로 /home 으로 이동합니다.
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import styles from "./page.module.css";

export default function SplashPage() {
  return (
    <div className="pz-fullbleed">
      {/* 모바일(<1024px) */}
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

      {/* PC(>=1024px): 스크롤 없이 화면 전체를 한 번에 채우는 2단 레이아웃 */}
      <div className={styles.pcWrap}>
        <div className={styles.pcBrand}>
          <div className={styles.pcGlow} />

          <Image
            src="/images/logo-stacked.svg"
            alt="PATH"
            width={227}
            height={258}
            priority
            className={styles.pcLogo}
          />

          <p className={styles.pcEyebrow}>AI TRAVEL PLANNER FOR JAPAN</p>

          <h1 className={styles.pcHeadline}>
            AI와 함께,
            <br />
            일본 여행의 가장 확실한 길
          </h1>

          <p className={styles.pcSub}>당신의 여행이 더 쉽고, 더 특별해지도록</p>

          <Link href="/home" className={styles.pcCta}>
            시작하기
          </Link>
        </div>

        <div className={styles.pcScene}>
          {/* splash-bg.jpg에서 문구가 없는 하단 풍경만 잘라낸 전용 이미지 --
              화면 비율이 달라져도 좌측 패널 문구와 겹치지 않습니다. */}
          <Image
            src="/images/splash-scene-pc.jpg"
            alt=""
            fill
            priority
            sizes="56vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div className={styles.pcSceneShade} />
        </div>
      </div>
    </div>
  );
}
