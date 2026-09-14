"use client";

import { useRef, useState } from "react";
import TabShell from "@/components/TabShell";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

const EMAIL = "user@path-travel.com";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  function handlePhotoPick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  }

  function handleSave() {
    // 백엔드 연동 전이라 로컬에 저장 상태만 반영하고, 저장됐다는 걸
    // 실제로 확인할 수 있도록 잠깐 "저장됨" 표시를 보여줍니다.
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const avatarStyle = photo
    ? { backgroundImage: `url(${photo})`, backgroundSize: "cover", backgroundPosition: "center" }
    : undefined;

  return (
    <TabShell crumb="MY" title="프로필 수정">
      <Header title="프로필 수정" backHref="/my" className="lg:hidden" />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoPick}
        className="hidden"
      />
      <div className="screen-scroll">
        {/* ---------- 모바일: 가운데 정렬 ---------- */}
        <div className="container lg:hidden" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button
            onClick={() => fileInputRef.current?.click()}
            aria-label="프로필 사진 변경"
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              background: "var(--bg-flat)",
              marginTop: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-muted)",
              ...avatarStyle,
            }}
          >
            {!photo && <Icon name="camera" size={26} />}
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              fontSize: 13,
              marginTop: 10,
            }}
          >
            사진 변경하기
          </button>

          <div style={{ width: "100%", marginTop: 30 }}>
            <label className="body-sm" style={{ display: "block", marginBottom: 6 }}>
              이름
            </label>
            <input
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 14,
                border: "1.5px solid var(--border-strong)",
                marginBottom: 18,
                fontSize: 14.5,
              }}
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="body-sm" style={{ display: "block", marginBottom: 6 }}>
              이메일
            </label>
            <input
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 14,
                border: "1.5px solid var(--border-strong)",
                marginBottom: 24,
                fontSize: 14.5,
                background: "var(--bg-flat)",
                color: "var(--text-muted)",
              }}
              defaultValue={EMAIL}
              disabled
            />

            <Button variant="primary" onClick={handleSave}>
              {saved ? "저장됨 ✓" : "저장하기"}
            </Button>
            <div className="body-sm" style={{ textAlign: "center", marginTop: 14 }}>
              가입일 2026.01.15 · 마지막 로그인 오늘
            </div>
          </div>
        </div>

        {/* ---------- PC (프로토타입 "PC 프로필 수정": 좌측 정렬 폼) ---------- */}
        <div className="hidden lg:flex lg:flex-col lg:gap-8 lg:pb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              aria-label="프로필 사진 변경"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#dfe6fb] text-navy"
              style={avatarStyle}
            >
              {!photo && <Icon name="camera" size={20} />}
            </button>
            <div>
              <p className="text-[17px] font-extrabold text-navy-deep">{name || "이름"}</p>
              <p className="mt-0.5 text-[13px] text-muted">{EMAIL}</p>
            </div>
          </div>

          <div className="flex w-[411px] flex-col gap-6">
            <div>
              <label className="mb-2 block text-[14px] font-bold text-navy-deep">이름</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
                className="w-full rounded-2xl border border-line bg-white px-5 py-3.5 text-[14.5px] text-navy-deep outline-none placeholder:text-muted focus:border-navy"
              />
            </div>

            <div>
              <label className="mb-2 block text-[14px] font-bold text-navy-deep">이메일</label>
              <input
                defaultValue={EMAIL}
                disabled
                className="w-full rounded-2xl border border-line bg-[#eef2fb] px-5 py-3.5 text-[14.5px] text-muted"
              />
            </div>

            <button
              onClick={handleSave}
              className="flex h-14 w-full items-center justify-center rounded-2xl bg-navy text-[15px] font-bold text-white transition"
            >
              {saved ? "저장됨 ✓" : "저장하기"}
            </button>

            <p className="text-[13px] text-muted">가입일 2026.01.15 · 마지막 로그인 오늘</p>
          </div>
        </div>
      </div>
    </TabShell>
  );
}
