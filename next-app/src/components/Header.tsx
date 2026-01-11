import Image from "next/image";

export default function Header() {
  return (
    <div id="header">
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
