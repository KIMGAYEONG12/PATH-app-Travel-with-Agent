"use client";

// 고객센터 "1:1 문의하기" 모달.
// 실제 백엔드가 없는 프로토타입이므로, 문의 내용을 브라우저(localStorage)에
// 저장하고 접수번호를 발급하는 방식으로 "제출 → 접수 확인"이 실제로 동작하게
// 구현했습니다. 백엔드가 준비되면 handleSubmit 안의 fake-submit 부분만
// 실제 API 호출(fetch)로 바꾸면 됩니다.

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import Button from "@/components/Button";

const CATEGORIES = ["AI 일정", "교통 정보", "결제·계정", "오류 신고", "기타"];
const STORAGE_KEY = "path_inquiries";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function makeTicketId() {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
    d.getDate()
  ).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `PATH-${ymd}-${rand}`;
}

function saveInquiry(entry) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    list.unshift(entry);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 50)));
  } catch {
    // localStorage를 쓸 수 없는 환경(비공개 모드 등)이어도 접수 자체는 계속 진행합니다.
  }
}

const inputCls =
  "h-12 w-full rounded-xl border border-line bg-white px-4 text-[14px] outline-none transition focus:border-navy";

export default function InquiryModal({ open, onClose }) {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("form"); // form | submitting | success
  const [ticketId, setTicketId] = useState("");
  const dialogRef = useRef(null);

  // 모달이 열릴 때마다 이전 입력/결과를 초기화합니다.
  useEffect(() => {
    if (open) {
      setCategory(CATEGORIES[0]);
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
      setStatus("form");
      setTicketId("");
    }
  }, [open]);

  // ESC로 닫기
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function validate() {
    const next = {};
    if (!name.trim()) next.name = "이름을 입력해주세요.";
    if (!email.trim()) next.email = "이메일을 입력해주세요.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "이메일 형식을 확인해주세요.";
    if (!message.trim()) next.message = "문의 내용을 입력해주세요.";
    else if (message.trim().length < 5) next.message = "문의 내용을 5자 이상 입력해주세요.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    const id = makeTicketId();

    // 실제 서버 요청을 흉내내는 짧은 지연(이 프로젝트의 다른 화면들과 동일한 패턴).
    setTimeout(() => {
      saveInquiry({
        id,
        category,
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        createdAt: new Date().toISOString(),
      });
      setTicketId(id);
      setStatus("success");
    }, 700);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#12173f]/45 px-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[88vh] w-full max-w-[440px] flex-col overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-pop)]"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-line px-6 py-5">
          <h2 id="inquiry-modal-title" className="text-[17px] font-extrabold text-navy-deep">
            1:1 문의하기
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:bg-[#eef2fb] hover:text-navy-deep"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6">
          {status === "success" ? (
            <div className="flex flex-col items-center py-4 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e2f6ec] text-green">
                <Icon name="check" size={26} />
              </span>
              <p className="mt-4 text-[16px] font-extrabold text-navy-deep">문의가 접수됐어요</p>
              <p className="mt-2 text-[13px] leading-6 text-muted">
                영업일 기준 1~2일 이내에
                <br />
                <span className="font-semibold text-navy-deep">{email}</span>로 답변드릴게요.
              </p>
              <div className="mt-4 w-full rounded-2xl bg-[#eef2fb] px-4 py-3 text-[13px]">
                <span className="text-muted">접수번호</span>{" "}
                <span className="font-mono font-bold text-navy-deep">{ticketId}</span>
              </div>
              <Button variant="primary" className="mt-6" onClick={onClose}>
                확인
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-[13px] font-bold text-navy-deep">문의 유형</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`rounded-full border px-3.5 py-2 text-[12.5px] font-bold transition ${
                        category === c
                          ? "border-navy bg-navy text-white"
                          : "border-line bg-white text-muted"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-bold text-navy-deep" htmlFor="inq-name">
                  이름
                </label>
                <input
                  id="inq-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름을 입력해주세요"
                  className={inputCls}
                />
                {errors.name && <p className="mt-1 text-[12px] text-red">{errors.name}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-bold text-navy-deep" htmlFor="inq-email">
                  이메일
                </label>
                <input
                  id="inq-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="답변받을 이메일 주소"
                  className={inputCls}
                />
                {errors.email && <p className="mt-1 text-[12px] text-red">{errors.email}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-bold text-navy-deep" htmlFor="inq-message">
                  문의 내용
                </label>
                <textarea
                  id="inq-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="문의하실 내용을 자세히 적어주세요"
                  rows={5}
                  className="w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-[14px] outline-none transition focus:border-navy"
                />
                {errors.message && <p className="mt-1 text-[12px] text-red">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={status === "submitting"}
                className="mt-1"
                icon={<Icon name="send" size={16} />}
              >
                {status === "submitting" ? "전송 중..." : "문의 보내기"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
