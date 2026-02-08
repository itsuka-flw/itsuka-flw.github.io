import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import MessageList from "@/components/MessageList";

export default function MessagePage() {
  return (
    <div id="pagetop">
      <Header />
      <Menu />

      <div id="all">
        <div id="main">
          <h2>花びらからメッセージ🌸</h2>

          <div className="message">
            <MessageList />

            <p className="pagetop_link">
              <a href="#pagetop" title="ページトップへ戻る">
                ▲ページトップに戻る
              </a>
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
