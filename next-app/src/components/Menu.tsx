"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/", label: "home" },
  { href: "/message", label: "message" },
  { href: "/illust", label: "illust" },
  { href: "/thanks", label: "thanks" },
];

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
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
