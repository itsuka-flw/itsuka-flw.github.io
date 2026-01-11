export default function IllustPage() {
  return (
    <div id="main">
      <h2>お祝いイラスト！</h2>

      <ul className="illust-list">
        <li className="illust-card">
          <img
            src="/images/illust/sample1.png"
            alt="生誕祭イラスト"
            className="illust-thumb"
          />
          <p className="illust-caption">Illustration by △△</p>
        </li>

        {/* 以下同様 */}
      </ul>

      <p className="pagetop_link">
        <a href="#pagetop">▲ページトップに戻る</a>
      </p>
    </div>
  );
}
