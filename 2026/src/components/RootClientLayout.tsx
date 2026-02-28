"use client";

import { ReactNode, useState, useCallback, useEffect } from "react";
import { useInitialLoad, markAsVisited } from "@/hooks/useInitialLoad";
// import LoadingAnimation from "./loading/LoadingAnimation";
import FallingImages from "./FallingImages";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";

// シンプルなローディング画面
function LoadingScreen({ show, onComplete, isDataReady }: { show: boolean; onComplete: () => void; isDataReady: boolean }) {
  useEffect(() => {
    if (isDataReady) {
      // データ準備完了後すぐに画面を閉じる
      const timer = setTimeout(() => onComplete(), 100);
      return () => clearTimeout(timer);
    }
  }, [isDataReady, onComplete]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "url('/images/background.png')",
        backgroundAttachment: "fixed",
        zIndex: 9999,
      }}
    />
  );
}

export interface RootClientLayoutProps {
  children: ReactNode;
}

/**
 * ルートレイアウトのクライアントサイド処理を担当
 * 初回アクセス時のローディングアニメーションを表示
 */
export default function RootClientLayout({ children }: RootClientLayoutProps) {
  const { showLoading, isReady } = useInitialLoad();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setAnimationComplete(true);
    markAsVisited();
  }, []);

  // クライアントサイドのみで初期化（Hydration対策）
  useEffect(() => {
    setIsClient(true);
  }, []);

  // SSR時は何も表示しない（Hydrationエラー防止）
  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* 初回アクセス時のみ表示されるローディング画面 */}
      {/* TODO: LoadingAnimationをコメントアウト解除して使用 */}
      {/* <LoadingAnimation
        show={showLoading && !animationComplete}
        isDataReady={isReady}
        onComplete={handleAnimationComplete}
      /> */}
      <LoadingScreen
        show={showLoading && !animationComplete}
        isDataReady={isReady}
        onComplete={handleAnimationComplete}
      />

      {/* メインコンテンツ - ローディング中は非表示 */}
      {(!showLoading || animationComplete) && (
        <>
          <FallingImages />
          <Header />
          <div id="main">
            <Menu />
            {children}
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
