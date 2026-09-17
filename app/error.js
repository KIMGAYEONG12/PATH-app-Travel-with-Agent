"use client";

import { useEffect } from "react";
import Icon from "@/components/Icon";
import Button from "@/components/Button";

// 화면 렌더링 중 예상치 못한 에러가 나면 Next.js가 이 컴포넌트를 대신
// 보여줍니다. 이게 없으면 에러 발생 시 완전히 빈 흰 화면만 남게 됩니다.
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: 24,
        textAlign: "center",
        background: "var(--bg, #eef2fb)",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#dfe6fb",
          color: "#1e2761",
        }}
      >
        <Icon name="warn" size={30} />
      </div>
      <p style={{ fontSize: 17, fontWeight: 800, color: "#1e2761" }}>
        화면을 불러오는 중 문제가 생겼어요
      </p>
      <p style={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.6 }}>
        잠시 후 다시 시도해주세요.
      </p>
      <div style={{ width: 200, marginTop: 8 }}>
        <Button variant="primary" onClick={() => reset()}>
          다시 시도
        </Button>
      </div>
    </div>
  );
}
