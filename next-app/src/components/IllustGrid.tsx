import Image from "next/image";

type IllustItem = {
  src: string;      // "/images/illust/sample1.png" みたいに先頭 /
  alt: string;
  caption: string;
};

const illusts: IllustItem[] = [
  {
    src: "/images/illust/sample1.png",
    alt: "生誕祭イラスト（by □□）",
    caption: "Illustration by △△",
  },
  {
    src: "/images/illust/sample2.png",
    alt: "生誕祭イラスト（by □□）",
    caption: "Illustration by △△",
  },
  {
    src: "/images/illust/sample3.png",
    alt: "生誕祭イラスト（by □□）",
    caption: "Illustration by □□",
  },
  {
    src: "/images/illust/sample2.png",
    alt: "生誕祭イラスト（by □□）",
    caption: "Illustration by △△",
  },
  {
    src: "/images/illust/sample3.png",
    alt: "生誕祭イラスト（by □□）",
    caption: "Illustration by △△",
  },
  {
    src: "/images/illust/sample1.png",
    alt: "生誕祭イラスト（by □□）",
    caption: "Illustration by □□",
  },
];

export default function IllustGrid() {
  return (
    <ul className="illust-list">
      {illusts.map((it, i) => (
        <li key={i} className="illust-card">
          <Image
            src={it.src}
            alt={it.alt}
            className="illust-thumb"
            width={900}
            height={900}
            loading="lazy"
          />
          <p className="illust-caption">{it.caption}</p>
        </li>
      ))}
    </ul>
  );
}
