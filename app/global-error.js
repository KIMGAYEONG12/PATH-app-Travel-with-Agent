"use client";

import { useEffect } from "react";

// app/error.js는 layout.js보다 안쪽 에러만 잡습니다. layout.js 자체에서
// 에러가 나는 아주 드문 경우를 위한 최후의 안전망입니다.
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
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
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <p style={{ fontSize: 18, fontWeight: 800, color: "#1e2761" }}>
            문제가 발생했어요
          </p>
          <p style={{ fontSize: 14, color: "#6b7280" }}>잠시 후 다시 시도해주세요.</p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: 8,
              padding: "12px 24px",
              borderRadius: 12,
              border: "none",
              background: "#1e2761",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
