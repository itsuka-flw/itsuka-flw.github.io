import './globals.css';

export const metadata = {
  title: '碧依さくら生誕祭 2026 - 非公式ファンサイト',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body id="pagetop">
        <div id="page">

          {/* header */}
          <div id="header">
            <img
              src="/images/title-logo.png"
              alt="碧依さくら 生誕祭2026"
              className="header-logo"
            />
          </div>

          {/* menu */}
          <div id="menu">
            <ul>
              <li className="menu"><a href="/">home</a></li>
              <li className="menu"><a href="/message">message</a></li>
              <li className="menu"><a href="/illust">illust</a></li>
              <li className="menu"><a href="/thanks">thanks</a></li>
            </ul>
          </div>

          {children}

          {/* footer */}
          <div id="footer">
            <p>
              ※このサイトはファンによる非公式のお誕生日お祝いサイトです。<br />
              碧依さくらさんご本人・公式とは一切関係ありません。
            </p>
          </div>

        </div>
      </body>
    </html>
  );
}