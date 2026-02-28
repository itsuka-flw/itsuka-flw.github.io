import Image from "next/image";

export default function Header() {
  return (
    <div id="header">
      <Image
        src="/images/header.png"
        alt="碧依さくら生誕祭2026 メインビジュアル"
        fill
        className="header-bg"
        priority
        sizes="(max-width: 800px) 100vw, 800px"
      />
      <Image
        src="/images/title-logo.png"
        alt="碧依さくら 生誕祭2026"
        className="header-logo"
        width={400}
        height={200}
        priority
      />
    </div>
  );
}
