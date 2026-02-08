type MessageItem = {
  fontClass: "font-uzura" | "font-yomogi" | "font-kiloji";
  text: string;
  sign: string;
};

const messages: MessageItem[] = [
  {
    fontClass: "font-uzura",
    text: `さくちゃん、お誕生日おめでとう！🎂
いつも笑顔でみんなを幸せにしてくれてありがとう♡
素敵な1年になりますように！`,
    sign: "from 花びら",
  },
  {
    fontClass: "font-yomogi",
    text: `さくちゃん、お誕生日おめでとうございます。
今年もさくちゃんにとって、楽しくて笑顔いっぱいの一年になりますように。
素敵な時間を過ごしてね。`,
    sign: "from 花びら",
  },
  {
    fontClass: "font-kiloji",
    text: `さくちゃん、おめでとう～！🎉
いつも元気をありがとう！
これからもいっぱいハッピーなことがありますように☆`,
    sign: "from 花びら",
  },
  {
    fontClass: "font-yomogi",
    text: `さくちゃん、お誕生日おめでとう！
さくちゃんがいるだけで周りが明るくなります。
これからも元気で楽しい毎日を過ごしてね。`,
    sign: "from 花びら",
  },
  {
    fontClass: "font-kiloji",
    text: `さくちゃん、お誕生日おめでとう！
ケーキいっぱい食べて、いっぱい笑って、最高の一年にしてね🍰
楽しいことがいっぱい待ってますように♪`,
    sign: "from 花びら",
  },
  {
    fontClass: "font-uzura",
    text: `さくちゃん、お誕生日おめでとう。
今日がさくちゃんにとって、幸せいっぱいの一日になりますように。
素敵な一年を過ごしてね。`,
    sign: "from 花びら",
  },
];

export default function MessageList() {
  return (
    <ul className="message-list">
      {messages.map((m, i) => (
        <li key={i} className={m.fontClass}>
          <p className="message-text" style={{ whiteSpace: "pre-line" }}>
            {m.text}
          </p>
          <p className="message-sign">{m.sign}</p>
        </li>
      ))}
    </ul>
  );
}
