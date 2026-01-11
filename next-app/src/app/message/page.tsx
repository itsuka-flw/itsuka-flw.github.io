import Link from "next/link";
import MessageList from "@/components/MessageList";

export default function MessagePage() {
  return (
    <>
      <h2>花びらからさくちゃんへメッセージ🌸</h2>
      <div className="message">
        <MessageList />

        <p className="pagetop_link">
          <Link href="#pagetop" title="ページトップへ戻る">
            ▲ページトップに戻る
          </Link>
        </p>
      </div>
    </>
  );
}
