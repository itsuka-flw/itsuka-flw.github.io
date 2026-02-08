"use client";

import Link from "next/link";

type Props = {
  label?: string;
};

export default function PageTopLink({
  label = "▲ PAGE TOP",
}: Props) {
  const showOshiEffect = (x: number, y: number) => {
    const marks = ["❄️", "🌸", "🎧"];

    marks.forEach((mark, index) => {
      setTimeout(() => {
        const span = document.createElement("span");
        span.className = "oshi-effect";
        span.textContent = mark;

        const offsetX = (index - 1) * 18;
        const offsetY = index * 12;

        span.style.left = `${x + offsetX}px`;
        span.style.top = `${y + offsetY}px`;

        document.body.appendChild(span);

        setTimeout(() => {
          span.remove();
        }, 900);
      }, index * 120);
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const rect = e.currentTarget.getBoundingClientRect();
    showOshiEffect(
      rect.left + rect.width / 2,
      rect.top
    );
  };

  return (
    <p className="pagetop_link">
      <a href="#pagetop" onClick={handleClick}>
        {label}
      </a>
    </p>
  );
}
