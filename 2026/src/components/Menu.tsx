"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/", label: "Top" },
  { href: "/message", label: "Message" },
  { href: "/illust", label: "Illust" },
  { href: "/photo", label: "Photo" },
  { href: "/thanks", label: "Thanks" },
];

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
  }, index * 180);
});
};

export default function Menu() {
  const pathname = usePathname();

  return (
    <div id="menu">
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.href}
            className={pathname === item.href ? "menu now" : "menu"}
          >
            <Link href={item.href} onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              showOshiEffect(rect.left + rect.width / 2,
              rect.top
              );
             }}>{item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
