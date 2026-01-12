import Link from "next/link";
import Image from "next/image";

const illusts = [
  { src: "/images/illust/sample1.png", artist: "△△" },
  { src: "/images/illust/sample2.png", artist: "△△" },
  { src: "/images/illust/sample3.png", artist: "□□" },
  { src: "/images/illust/sample2.png", artist: "△△" },
  { src: "/images/illust/sample3.png", artist: "△△" },
  { src: "/images/illust/sample1.png", artist: "□□" },
];

export default function IllustPage() {
  return (
    <>
      <h2>お祝いイラスト！</h2>
      <div className="illust">
        <ul className="illust-list">
          {illusts.map((illust, index) => (
            <li key={index} className="illust-card">
              <Image
                src={illust.src}
                alt={`生誕祭イラスト（by ${illust.artist}）`}
                className="illust-thumb"
                width={200}
                height={180}
                loading="lazy"
              />
              <p className="illust-caption">by {illust.artist}</p>
            </li>
          ))}
        </ul>

        <p className="pagetop_link">
          <Link href="#pagetop" title="ページトップへ戻る">
            ▲ページトップに戻る
          </Link>
        </p>
      </div>
    </>
  );
}
