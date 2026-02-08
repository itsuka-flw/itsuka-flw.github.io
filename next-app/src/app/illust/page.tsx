import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import IllustGrid from "@/components/IllustGrid";

export default function IllustPage() {
  return (
    <div id="pagetop">
      <Header />
      <Menu />

      <div id="all">
        <div id="main">
          <h2>お祝いイラスト🌸</h2>

          <div className="illust">
            <IllustGrid />

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
