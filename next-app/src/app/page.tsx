import Link from "next/link";

export default function Home() {
  return (
    <>
      <h2>HAPPY BIRTHDAY!</h2>
      <div className="text">
        <p className="p-lined">
          text
          <br />
          text
        </p>
      </div>
      <p className="pagetop_link">
        <Link href="#pagetop" title="ページトップへ戻る">
          ▲ページトップに戻る
        </Link>
      </p>

      <h2>碧依さくらちゃんについて</h2>
      <div className="text">
        <p className="p-lined">
          碧依さくら / AOI SAKURA
          <br />
          2024年2月4日デビューのVtuber。桜の妖精と雪女のハーフでファンマークは❄🌸🎧
          <br />
          誕生日は3月27日。好きな食べ物はグラタン、ハンバーグ、寿司🍣など。
        </p>
      </div>
      <p className="pagetop_link">
        <Link href="#pagetop" title="ページトップへ戻る">
          ▲ページトップに戻る
        </Link>
      </p>
    </>
  );
}
