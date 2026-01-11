import Link from "next/link";

export default function ThanksPage() {
  return (
    <>
      <h2>member list</h2>
      <div className="text">
        <p className="p-lined">
          主催：ロムエッグ（
          <a href="https://x.com/yudetamago_rom">@yudetamago_rom</a>）
          <br />
        </p>
      </div>

      <p className="pagetop_link">
        <Link href="#pagetop" title="ページトップへ戻る">
          ▲ページトップに戻る
        </Link>
      </p>

      <h2>thanks</h2>
      <div className="text">
        <p className="p-lined">
          <a href="http://www.asterism-m.com/">Asterism</a> :
          よもぎフォントをお借りしました！
          <br />
          <a href="http://azukifont.com/">あずきフォント</a> :
          うずらフォントをお借りしました！
          <br />
          <a href="https://kironono.hatenablog.jp/entry/fonts-kiloji">
            Ola Kae Tode Tai
          </a>
          ：きろ字フォントをお借りしました！
          <br />
          <a href="https://www.irasutoya.com/">いらすとや</a> :
          メッセージカード用の素材をお借りしました！
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
