export default function MessagePage() {
  return (
    <div id="main">
      <h2>花びらからさくちゃんへメッセージ🌸</h2>

      <div className="message">
        <ul className="message-list">
          <li className="font-uzura">
            <p className="message-text">
              さくちゃん、お誕生日おめでとう！🎂
              いつも笑顔でみんなを幸せにしてくれてありがとう♡
              素敵な1年になりますように！
            </p>
            <p className="message-sign">from 花びら</p>
          </li>

          {/* 他のliも同じ形でコピペ */}
        </ul>

        <p className="pagetop_link">
          <a href="#pagetop">▲ページトップに戻る</a>
        </p>
      </div>
    </div>
  );
}
